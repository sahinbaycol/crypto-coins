import React, { CSSProperties } from 'react'

const Navbar = () => {
    const styles={
        containerStyle:{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"center",
            padding:"24px",
            fontSize:"26px",
            fontWeight:"500",
            color:"#3B82F6",
            borderBottom:"1px solid #E3E4E5",
            borderTop:"1px solid #E3E4E5"
        } as CSSProperties
    }
  return (
    <div style={styles.containerStyle}>Crypto-Coins</div>
  )
}

export default Navbar