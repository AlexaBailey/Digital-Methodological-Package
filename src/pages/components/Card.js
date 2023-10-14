import React from "react";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
export default function Card({material,logUser,setMaterials,materials}) {
  
  const deleteData = async () => {
    try {
     
      const res = await axios.delete(`http://localhost:8800/material/${material.rid}`,{params:{material:material.rid}});
      setMaterials(materials.filter(obj=>obj.rid!=material.rid))

      toast.success('🗑️ Учебный материал удален!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
       console.log("Data",res.data)
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
  
  
     <div style={{display:'flex', width:400}}>
       <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
     <div  className = "homecard"style={{backgroundColor:'#D9D9D9', height:190, width:180,display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center'}}>       <p style={{fontWeight:'bold'}}>{material.name}</p>{material.respository? <Link href={`${material.respository}`}><img style={{height:80}} src="../../t-icon.png"/></Link>:null}{material.link &&  <Link href={`${material.link}`} target="_blank"><img style={{height:80}} src="../../link.png"/></Link>}<span style={{fontSize:'small', textAlign:'center'}}>{material.publish}</span>
     </div>
     <div style={{ marginLeft:50}}>
     {logUser && logUser.job !=1? <p>Преподаватель: {material.author}</p>: <p>Автор: {material.author}</p>}
     <p>Дисциплина: {material.discipline}</p>
      <span>Группа {material.gname}</span>
   
      <p>Тип:{material.type}</p>
       <button  onClick={()=>deleteData()} style={{background:'transparent', border:'none',height:30}}><img src="https://img.icons8.com/color/48/null/delete-forever.png"/></button>
      

     </div>
    

 
  
    
 
 

 </div>)}