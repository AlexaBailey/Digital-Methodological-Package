import React, { createRef } from 'react'
import Navbar from '../components/Navbar'
import { useState,useEffect } from 'react';
import { useRef } from 'react';
import { ChangeEvent } from 'react';
import axios from 'axios';
import setAuthToken from '../utils/jwt';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Footer from '../components/Footer';

export default function Edit() {
 
    const [info, setInfo] = useState([]);  
const [error,setError] = useState(false)
const [flow,setFlow]=useState('')
const [group,setGroup]=useState('')
const [course,setCourse]=useState('')

    
  
 const send=()=>{
formik.handleSubmit()
 }
    const formik = useFormik({

        initialValues: {
    
          email: "",
         
            flow: flow,
          
         
          course: course,
          group:group,
          username:""
          
    
        },
    
        onSubmit: async (values)=> {
    
          try {
            await axios.post(`http://localhost:8800/account/${logUser.id}`, values);
            router.push(`/account/user/${logUser.id}`)
       
          } catch (err) {
      
            setError(true)
    
        }
      },
      validate:values=>{
        let errors = {};
        const regex1 = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const regex2 = /^[A-Za-z][A-Za-z0-9_]{3,29}$/i;

       if (values.email){
        if (!regex1.test(values.email)) {
          errors.email = "Invalid email format";
        }

       }
       if (values.username){
        if (values.username.length < 4) {
          errors.username = "Username must be more than 4 characters";
        }
        else if (!regex2.test(values.username)){
          errors.username = "Start with letters, exclude symbols"
        }

       }
      
    
        
        return errors;
      }
    
      
      })
  
    

    const [hasMounted,sethasMounted]=useState(false)
    var f;
    var c;
    var g;
    
      
    if (info!='' && info!=null){
      c = [...new Set(info.map(c=>{return (c.cnumber)}))]
      g = [...new Set(info.map(c=>{return (c.gname)}))]
      f = [...new Set(info.map(c=>{return (c.fname)}))]
    
    
    }
        
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
           
            
            const res = await axios.get(`http://localhost:8800/account/${logUser.id}`,{params:{userid:logUser.id}});
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
    
  
  
  

     <div style={{display:'flex',alignItems:'center',flexDirection:'column' , gap:20}}>
    
     <img style={{height:90,width:90, marginTop:24}} src="../../profile.png"/>   

    
         < form style={{display:'flex',flexDirection:'column' }} onSubmit={formik.handleSubmit}>
          {logUser.job==0 && <>
            <p>Специальность</p>
        <div  className="">


<label>
        <select name='flow'  value={flow} onChange={formik.handleChange}>
          
        <option id="0"  onClick={()=>setFlow('')} >Не выбрано</option>

        {f ? f.map(c=>{return(<option onClick={()=>setFlow(c)} >{c}</option>)}) 
          :null}
           
          </select>
          </label>
          </div>
          <p>Группа</p>
        <div  className="">


<label>
        <select name='group'  value={group} onChange={formik.handleChange}>
          
        <option id="0"  onClick={()=>setGroup('')} >Не выбрано</option>

        {g ? g.map(c=>{return(<option onClick={()=>setGroup(c)} >{c}</option>)}) 
          :null}
           
          </select>
          </label>
          </div>
          <p>Курс</p>
        <div  className="">


<label>
        <select name='course'  value={course} onChange={formik.handleChange}>
          
        <option id="0"  onClick={()=>setCourse('')} >Не выбрано</option>

        {c ? c.map(c=>{return(<option onClick={()=>setCourse(c)} >{c}</option>)}) 
          :null}
           
          </select>
          </label>
          </div></>
          
          
          
          }
           <p>Имя пользователя</p>
         <input type="username" name="username" className='input-form'
        onChange={formik.handleChange} onBlur={formik.handleBlur}
        value={formik.values.username}/>
{formik.errors.username ? <p className="error" >
                  {formik.errors.username }
                </p>:null}
                

      
       <p>E-mail</p>
         <input type="email" name="email" className='input-form'
        onChange={formik.handleChange} onBlur={formik.handleBlur}
        value={formik.values.email}/>
{formik.errors.email ? <p className="error" >
                  {formik.errors.email }
                </p>:null}
       
          

          
          
          </form>  
       
          <br/>
          <button type="submit" onClick={()=>send()}  style={{alignSelf:'center'}} className='signup-button'>Сохранить</button>



   
     
        

    
    

         
      

      

  
    
      

      </div>
      


      </>
     

    )
      }else{
        return null
      }
}
