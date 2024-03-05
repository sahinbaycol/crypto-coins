import axios from 'axios';
import './App.css'
import { CSSProperties, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import searchIcon from "./assets/search.png"

function App() {

  const [value,setValue]=useState<string>("")
  const [data,setData]=useState<any>([])
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const styles={
    containerStyle:{
      display:"flex",
      flexDirection:"column",
      width:"100%",
      height:"100vh"
    } as CSSProperties,
    contentContainerStyle:{
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      width:"90%",
      borderBottom:"1px solid #E3E4E5",
      padding:"10px 5% 10px 5%"
    } as CSSProperties,
    currencyImageStyle:{
      width:"48px",
      height:"48px"
    } as CSSProperties,
    currencyTextStyle:{
      fontWeight:"600",
      color:"#6b6b6b",
      fontSize:"15px",
      display:"flex",
      justifyContent:"center"
    } as CSSProperties,
    greenTextStyle:{
      fontWeight:"600",
      color:"#2AC764",
      fontSize:"15px",
      display:"flex",
      justifyContent:"center",
      width:"10%"
    } as CSSProperties,
    redTextStyle:{
      fontWeight:"600",
      color:"#EF4444",
      fontSize:"15px",
      display:"flex",
      justifyContent:"center",
      width:"10%"
    } as CSSProperties,
    currencyNameStyle:{
      fontWeight:"600",
      color:"#6b6b6b",
      fontSize:"16px",
      display:"flex",
    } as CSSProperties,
    headerContainerStyle:{
      display:"flex",
      flexDirection:"row",
      width:"90%",
      padding:"20px 5% 20px 5%",
      borderBottom:"1px solid #E3E4E5",
      
    } as CSSProperties,
    headerTextStyle:{
      fontWeight:"600",
      color:"#0F172A",
      fontSize:"16px",
      width:"10%",
      display:"flex",
      flexDirection:"row",
      justifyContent:"center"
    } as CSSProperties,
    searchbarContainerStyle:{
      display:"flex",
      width:"90%",
      padding:"20px 5% 20px 5%",
      // border:"1px solid #014aa9"
    } as CSSProperties,
    searchbarBoxStyle:{
      display:"flex",
      border:"1px solid #014aa9",
      borderRadius:"8px",
      alignItems:"center",
      width:"100%"
    } as CSSProperties,
    searchIconStyle:{
      width:"36px",
      height:"36px",
      marginLeft:"10px"
    } as CSSProperties,
    inputStyle:{
      border:"none",
      padding:"15px",
      marginRight:"10px",
      width:"100%",
      fontSize:"20px"
    } as CSSProperties
  }

  
useEffect(()=>{
  fetchData()
},[])
const fetchData= async () => {
  try {
    const response:any = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=75&page=1&sparkline=true&locale=tr');
    console.log(response.data)
    
      setData(response.data)
    
    
  } catch(error) {
   console.log(error)
  
  }
};

const handleFilter = (e:any) => {
  const value = e.target.value;
  
  setFilteredUsers(data.filter((user:any) => user.name.includes(value)));
  console.log(filteredUsers)
};


const content:any=(filteredUsers.length>0 ?filteredUsers : data).map((item:any)=>{
  return(
    <div key={item.id} style={styles.contentContainerStyle}>
      <div style={{width:"4%"}}><img style={styles.currencyImageStyle} src={item.image} /></div>
      <div style={{...styles.currencyNameStyle,width:"6%"}}>{item.name +" "+  "(" + item.symbol +")" }</div>
      <div style={{...styles.currencyTextStyle,width:"10%"}}>{"$"+item.current_price}</div>
      <div style={item.price_change_24h<0 ? styles.redTextStyle : styles.greenTextStyle}>{item.price_change_24h.toFixed(2)+"$"}</div>
      <div style={item.price_change_24h<0 ? styles.redTextStyle : styles.greenTextStyle}>{item.price_change_percentage_24h.toFixed(2)}</div>
      <div style={{...styles.currencyTextStyle,width:"10%"}}>{"$"+item.total_volume}</div>
      <div style={{...styles.currencyTextStyle,width:"10%"}}>{item.max_supply}</div>
      <div style={{...styles.currencyTextStyle,width:"10%"}}>{"$"+item.market_cap}</div>
      <div style={{...styles.currencyTextStyle,width:"10%"}}>{item.atl}</div>
      <div style={{...styles.currencyTextStyle,width:"10%"}}>{item.ath}</div>
      <div style={{...styles.currencyTextStyle,width:"10%"}}>
          <Sparklines data={item.sparkline_in_7d.price}>
            <SparklinesLine color="#3B82F5" />
          </Sparklines>
      </div>
          
    </div>
  )
})
  

  return (
    <div style={styles.containerStyle}>
      <Navbar />
      <div style={styles.searchbarContainerStyle}>
        <div style={styles.searchbarBoxStyle}>
          <div><img style={styles.searchIconStyle} src={searchIcon}/></div>
          <div><input onChange={handleFilter} className='input' style={styles.inputStyle}/></div>
        </div>
      </div>
      <div style={styles.headerContainerStyle}>
        <div style={styles.headerTextStyle}>Ad</div>
        <div style={styles.headerTextStyle}>Fiyat</div>
        <div style={styles.headerTextStyle}>Değişim (24sa)</div>
        <div style={styles.headerTextStyle}>24saat (%)</div>
        <div style={styles.headerTextStyle}>Hacim (24sa)</div>
        <div style={styles.headerTextStyle}>Toplam Arz</div>
        <div style={styles.headerTextStyle}>Toplam Market Hacmi</div>
        <div style={styles.headerTextStyle}>ATL</div>
        <div style={styles.headerTextStyle}>ATH</div>
        <div style={styles.headerTextStyle}>Değişim (7 gün)</div>
      </div>
      {content}
    </div>
  )
}

export default App
