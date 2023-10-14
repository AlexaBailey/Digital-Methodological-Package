import React, { useReducer, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
export default function HomeItem({homework, logUser,setHomework,homeworks}) {
    const router=useRouter()
    const [sign,setSign]=useState(0)
 
    const [show,setShow] = useState(false)
    function toggleShow(){
        setShow(curr=>!curr)
    }
    
  
    const deleteData = async () => {
      try {
       
        const res = await axios.delete(`http://localhost:8800/homework/${homework.hid}`,{params:{homework:homework.hid}});
        setHomework(homeworks.filter(obj=>obj.hid!=homework.hid))

        toast.success('🗑️ Домашнее задание удалено!', {
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
    <div style={{display:'flex',flexDirection:'column'}}>
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
    <div style={{display:'flex',padding:12, paddingLeft:40,width:600}}>
        <div  className = "homecard"style={{backgroundColor:'#D9D9D9', borderRadius:0,height:200, width:150,display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center'}}>       <p style={{fontWeight:'bold'}}>{homework.hname}</p><Link href={`${homework.homework}`}><img style={{height:80}} src="../../h-icon.png"/></Link> <div style={{display:'flex',alignItems:'center'}}>
        <span>Просмотрено</span>
        {homework.checked ? <img src="https://img.icons8.com/doodle/20/null/checkmark.png"/>:<img src="https://img.icons8.com/office/20/null/delete-sign.png"/>}
          
        </div>
        </div>
        <div style={{ marginLeft:50}}>
        {logUser.job !=1 ? <p>Автор: {homework.fio}</p>: <p>Студент: {homework.usname}</p>}
        <p>Дисциплина: {homework.discipline}</p>
        <p>Преподаватель: {homework.teacher}</p>
   <div style={{display:'flex',alignItems:'center',gap:4}}>
   {homework.checked ? <button className="remove-button" onClick={toggleShow}>{!show ? "Показать" : "Скрыть"} оценку</button>:null}
       {logUser.job != 0 ?  <button className="remove-button" onClick={()=>router.push(`/homework/evaluation/${homework.hid}`)}>{!homework.checked ? "Добавить" : "Изменить"} оценку</button>:  null } 
       <button  onClick={(e)=>deleteData(e.target)} style={{background:'transparent', border:'none'}}><img src="https://img.icons8.com/color/48/null/delete-forever.png"/></button>
      
   </div>
      
   

        </div>
        <div style={{paddingLeft:50}}>
        {show ? <>
            {homework.checked ? <>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
              {homework.mark &&<><p>Оценка:</p>
             <span>{homework.mark}</span> </>
             }
             </div>
             <div style={{display:'flex',alignItems:'center',gap:12}}>

             {homework.credit &&<><p>Зачтено:</p>
             <span>{homework.credit}</span></>}
                </div>
             
              {homework.comments && <>
              <span>Комментарии:</span><br/>
                <div className = 'homecard' style={{backgroundColor:'white',padding:5, borderColor:'black',border:1}}><p style={{marginTop:4,fontStyle:'italic'}}>{homework.comments}</p></div></>} </>:null}
                {homework.corrections && <div>
              
             <span>Исправления</span>
             <br/>
             <Link href={`${homework.corrections}`}><img src="../../pdf.png"/></Link></div>}</>
      
   :null      
        }
    

        </div>
     
       </div>
    
    

    </div>)}