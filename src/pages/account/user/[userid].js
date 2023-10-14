import React, { createRef } from 'react'
import Navbar from '../../components/Navbar'
import { useState,useEffect } from 'react';
import { useRef } from 'react';
import { ChangeEvent } from 'react';
import axios from 'axios';
import setAuthToken from '../../utils/jwt';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';

export default function Profile() {
 
    const [info, setInfo] = useState([]);  
  
    

    const [hasMounted,sethasMounted]=useState(false)
  
    let logUser;

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
           
            
            const res = await axios.get(`http://localhost:8800/account/user/${logUser.id}`,{params:{id:logUser.id}});
            setInfo(res.data);
           
      
             console.log("Data",res.data)
          } catch (err) {
            console.log(err);
          }
        };
        fetchAllData();
    

      }, []); 
      const router = useRouter();

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
    
  
  
  

         <div style={{display:'flex',justifyContent:'center',flexDirection:'column', alignItems:'center' }}>
         <img style={{height:90,width:90, marginTop:24}} src="../../../profile.png"/>       


        <form >
          
    
    
    
     
        

          {info && info.map(info=>{return( <><h3>ФИО</h3>
      
          <p>{!info.fio ? "-": info.fio} </p>
   
         <hr/>
       
         
         <h3>Должность:</h3>

         <p>{ info.job==0?"студент":"преподаватель"} </p>
         {info.course ? <>
         
          <h3>Курс</h3>

          <p>{ info.course} </p></>:null}
          {info.grouppa ? <>
         
         <h3>Группа</h3>

         <p>{ info.grouppa} </p></>:null}
         <h3>Имя пользователя</h3>
         <p>{info.username}</p> 
         <div style={{display:'flex', alignItems:'center', gap:10}}>
      
           
             <h3>Почтовый адрес</h3>
         <img src="https://img.icons8.com/color/20/null/gmail--v1.png"/>

         </div>

          <a href={`mailto:${info.email}`} target='_blank'>{info.email}</a>
          <br/>
          <button onClick={()=>router.push(`/account/${logUser.id}`)} style={{marginTop:20}} className='signup-button'>Редактировать профиль</button>
          <div style={{display:'flex',justifyContent:'space-between', width:150, marginTop:40}}>
          <img src="https://img.icons8.com/material-rounded/24/FFFFFF/facebook-circled--v1.png"/>
          <img src="https://img.icons8.com/ios/24/FFFFFF/whatsapp--v1.png"/>
          <img src="https://img.icons8.com/ios-filled/24/FFFFFF/instagram-new--v1.png"/>
          <img src="https://img.icons8.com/ios-filled/24/FFFFFF/twitter.png"/>
          </div></>  
          )})}
         
      

      

    </form>

    
      

      </div>


      </>
     

    )
      }else{
        return null
      }
}
