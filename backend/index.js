/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = process.env.PORT || 3001
const multer =require('multer');
const path =require('path');
require("dotenv").config();


app.use(express.urlencoded({extended: true}));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  charset: process.env.DB_CHARSET,
});

// multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,'./public/images');
  },
  filename: function(req, file, cb){
     cb(null,"IMAGE-" + Date.now() +path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
});


app.post("/upload/image1", 
upload.single("myImage1"),(req, res,err)=> {
  console.log("Request ---", req.body);
  console.log("Request file ---", req.file);
  res.json({message:req.file.filename});
  if(err){res.json({message:"noimage.jpg"})};
});

app.post("/upload/image2", 
  upload.single("myImage2"),(req, res,err)=> {
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file);
    res.json({message:req.file.filename});
    if(err){res.json({message:"noimage.jpg"})}
  });

app.post("/upload/image3", 
  upload.single("myImage3"),(req, res,err)=> {
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file);
    res.json({message:req.file.filename});
    if(err){res.json({message:"noimage.jpg"})}
  });


  // 〆multer



app.post("/api", (req, res) => {
  const sql = "SELECT * FROM list WHERE date = ? " ;
  connection.query(
    sql,
    [req.body.date],
    function(err, results, length) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      if(results.length === 0){
        console.log("カラ")
      }else{
        res.json({message: results});
      }
    }
  );
});

app.post("/api/year", (req, res) => {
  const sql = "SELECT * FROM list WHERE date LIKE ? " ;
  connection.query(
    sql,
    ["%" + req.body.date],
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      res.json({message: results});
      console.log(results)
    }
  );
});

app.post("/api/month", (req, res) => {
  const sql = "SELECT * FROM list WHERE date LIKE ? AND date LIKE ?" ;
  connection.query(
    sql,
    [req.body.dateY+"%","%" + req.body.dateD],
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      res.json({message: results});
      console.log(results)
    }
  );
});

app.post("/insert", (req, res) => {
  console.log(req.body.myimage1);
  const sql = "INSERT IGNORE INTO list(date,sentence,image1,image2,image3) VALUES (?, ?,?,?,?)";
  const imgsrc1 = req.body.myimage1 ;
  const imgsrc2 = req.body.myimage2 ;
  const imgsrc3 = req.body.myimage3 ;
  connection.query(
    sql,
    [req.body.date,req.body.sentence,imgsrc1,imgsrc2,imgsrc3],
    function(err) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      console.log("登録完了");
    }
  );
});

app.put("/update/image1",(req,res)=>{
  const sql = "UPDATE list SET image1= ? WHERE date = ?";
  const imgsrc1 = req.body.myimage1 ;
  console.log(req.body.image1);
  connection.query(
    sql,
    [imgsrc1,req.body.date],
    function(err) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      console.log("登録完了");
    }
  );
})
app.put("/update/image2",(req,res)=>{
  const sql = "UPDATE list SET  image2=?  WHERE date = ?";
  const imgsrc2 = req.body.myimage2 ;
  connection.query(
    sql,
    [imgsrc2,req.body.date],
    function(err) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      console.log("登録完了");
    }
  );
})
app.put("/update/image3",(req,res)=>{
  const sql = "UPDATE list SET image3=? WHERE date = ?";
  const imgsrc3 = req.body.myimage3 ;
  connection.query(
    sql,
    [imgsrc3,req.body.date],
    function(err) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      console.log("登録完了");
    }
  );
})
app.put("/update/sentence",(req,res)=>{
  const sql = "UPDATE list SET sentence = ? WHERE date = ?";
  connection.query(
    sql,
    [req.body.sentence,req.body.date],
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      console.log("登録完了sentence");
    }
  );
})


app.delete("/delete", (req, res) => {
  const sql = "DELETE FROM list WHERE date = ?";
  connection.query(
    sql,
    [req.body.date],
    function(err,req) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      console.log("削除完了");

    }
  );
});





app.listen(port, () => {
  console.log(`listening on *:${port}`);
})
