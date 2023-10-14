import React, { createRef } from 'react'
import { useState,useEffect } from 'react';
import { useRef } from 'react';
import { ChangeEvent } from 'react';
import axios from 'axios';
import setAuthToken from '../utils/jwt';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import Card from '../components/Card';
export default function Materials() {
 
    const [materials, setMaterials] = useState('');  
    const [name, setName] = useState(''); 
    const [disc, setDisc] = useState(null)

const router = useRouter()
    const [hasMounted,sethasMounted]=useState(false)

    let logUser;
    const handleCat3 = (disc) => {
      console.log(disc)
      setDisc(disc);
    }
    useEffect((logUser) => {
        sethasMounted(true)
        if (localStorage.token) {
          const jwt = localStorage.getItem("token");
          setAuthToken(jwt);
          logUser = jwtDecode(jwt);
          console.log(logUser)
          console.log(logUser.id)
        
      }
        const fetchAllData = async () => {
          
   

          try {
            console.log("id",logUser.id)

        
            
            const res = await axios.get(`http://localhost:8800/repository/${logUser.grouppa}`,{params:{myrepository:logUser.grouppa}});
       
            setMaterials(res.data);
     

            console.log(materials)
           
      
             console.log("Data",res.data)
          } catch (err) {
            console.log(err);
          }
        };
        fetchAllData();
    

      }, []); 
      const filterData = async () => {
        try {
          const res = await axios.post(`http://localhost:8800/repository/${logUser.grouppa}`,{params:{myrepository:logUser.grouppa}, disc:disc});
          setMaterials(res.data);
           console.log("Data",res.data)
        } catch (err) {
          console.log(err);
        }
      };
      if (materials)
   
      var ha = [...new Set(materials.map(c=>{return (c.discipline)}))]


    

      axios.defaults.withCredentials = true;
     
      if (hasMounted){
        if (localStorage.token) {
          const jwt = localStorage.getItem("token");
          setAuthToken(jwt);
          logUser = jwtDecode(jwt);
          console.log(logUser)
      }
    return(
        <>
        
       
<Navbar/>
<img src='../../nav.png'/>

        <div className='overall'>

        
       

        <div className='hero' style={{display:'flex',justifyContent:'space-around', alignItems:'center',marginTop:-200}}>
        <img className='hero-image' src="../../library.png"/>

          <div className='text-section'>
          <span className='font big' style={{paddingTop:10}}>Централизованная библиотека - это легко!</span> 
          <button onClick={()=>router.push('#section')} className='detail-line' style={{alignSelf:'flex-start'}}>
          <span className='detail'>Перейти к материалам</span>
          <img className='arrow' src='../../arrow.png'/>
          </button>    
          </div>
        </div>
        
        <div id="section" style={{display:'flex', alignItems:'center',gap:12}}>
  
        <button onClick={filterData} style={{background:'transparent',border:'none'}}><img style={{height:60}} src="../filter.png"/></button>
          <span>Дисциплина</span>
          <div  className="selectdiv">

      
          <label>
        <select  name='disc'  value={disc} onChange={event => handleCat3(event.target.value)}>
        <option id="0"  onClick={()=>setDisc('')} >Не выбрано</option>

        {ha ? ha.map(c=>{return(<option onClick={()=>setDisc(c)} >{c}</option>)}) 
          :null}
           
          </select>
          </label>
          </div>
       
        </div>
        {materials? 
        <div className='homework-container'>
        {materials.map((material)=>{return(
            <Card 
            material={material}
          />
        )})}  </div>:<div style={{display:'flex', flexDirection:'column',alignItems:'center'}}><p >Пока материалы отстуствуют</p><br/><img src='../../none.png'/></div>
      }
        </div>
        <Footer/>
        </>
    )}}