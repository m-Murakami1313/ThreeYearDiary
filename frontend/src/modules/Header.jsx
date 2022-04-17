import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from "react-router-dom";


export default function Header() {

    const styles = {
      button:{
        fontSize:"20px",
        color:"#fff",
      },
      toolbar:{
        backgroundColor:"#e33371"
      }
    };


    return (
      <>
      <Box sx={{ flexGrow: 1 }}  
      >
        <AppBar position="static"
        >
          <Toolbar
          style={styles.toolbar} 
          >
            <Button 
            style={styles.button}
            component={Link}
            to="/"
            >三つ子の写真百まで
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      </>
    );
  }