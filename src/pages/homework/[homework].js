import React, { createRef } from 'react'
import { useState,useEffect } from 'react';
import { useRef } from 'react';
import { ChangeEvent } from 'react';
import axios from 'axios';
import setAuthToken from '../utils/jwt';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar'
import Link from 'next/link';
import Footer from '../components/Footer';
import HomeItem from '../components/HomeItem'
export default function Homework() {
 
    const [homeworks, setHomework] = useState('');  
    const [disc, setDisc] = useState(null)
    const router = useRouter()
    const [sign,setSign]=useState(0)


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
      
                const res = await axios.get(`http://localhost:8800/homework/${logUser.id}`,{params:{homework:logUser.id}});

              



            

        
            
       
            setHomework(res.data);
     

           
      
             console.log("Data",res.data)
          } catch (err) {
            console.log(err);
          }
        };
        fetchAllData();
    

      }, []); 
      const sortData = async () => {
        try {
          const res = await axios.post(`http://localhost:8800/homework/${logUser.id}`,{params:{homework:logUser.id}, disc:disc,sign:sign});
          setHomework(res.data);
           console.log("Data",res.data)
        } catch (err) {
          console.log(err);
        }
      };
      
      if (homeworks!='' && homeworks!=null){
        var ha = [...new Set(homeworks.map(c=>{return (c.discipline)}))]


      }


      
      

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
        <img className='hero-image' src="../../homework.png"/>

          <div className='text-section'>
          <span className='font big' style={{paddingTop:10}}>Совмести пользу с комфортом!</span> 
          <button onClick={()=>router.push('#section')} className='detail-line' style={{alignSelf:'flex-start'}}>
          <span className='detail'>Перейти к заданиям</span>
          <img className='arrow' src='../../arrow.png'/>
          </button>    
          </div>
        </div>
      <div id="section" style={{display:'flex',flexDirection:'column'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}>
      <div style={{display:'flex', alignItems:'center',gap:12}}>
  
      <button onClick={sortData} style={{background:'transparent',border:'none'}}><img style={{height:60}} src="../filter.png"/></button>

  <span>Дисциплина</span>


  <div  className="selectdiv">



<select  name='disc'  value={disc} onChange={event => handleCat3(event.target.value)}>
<option id="0"  onClick={()=>setDisc('')} >Не выбрано</option>

{ha? ha.map(c=>{return(<option onClick={()=>setDisc(c)} >{c}</option>)}) 
  :null}
   
  </select>

  </div>

  </div>


        
      

         <div style={{display:'flex', alignItems:'center'}}>
         <Link  style={{color:'black', display:'flex',  alignItems:'center'}} href='/homework/add'>
          <img style={{height:60}} src="../plus.png"/>
        
        <p></p>Добавить домашнее задание
        </Link>


        </div>
  
        

      </div>
       
      {homeworks? 
      <div className='homework-container'>
     {homeworks.map((homework)=>{return(
       
            <HomeItem
            key = {homework.hid}
            homework={homework}
            homeworks={homeworks}
            logUser = {logUser}
            setHomework={setHomework}
          />
           
        )})}      </div>:<div style={{display:'flex', flexDirection:'column',alignItems:'center'}}><p >Вы не отправили ни 1 домашки</p><br/><img src='../../none.png'/></div>
       }
      

 

      </div>
      
 
    
      

       </div>
       <Footer/>
       
        </>
    )}}