import React from 'react';



const styles ={
  image:{
    objectFit: "contain",
    width: "100%",
    height: "100%",
  }
}

export  const SomeComponent = ({image}) => (
    <img style={styles.image} src={require(`../../../backend/public/images/${image}`)} />
)