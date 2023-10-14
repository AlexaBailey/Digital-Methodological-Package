import React from 'react'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';


export default function Login() {
  
  
  const [error,setError] = useState(false)

  const router = useRouter()
  axios.defaults.withCredentials =true
  const formik = useFormik({

    initialValues: {

      logusername: '',

      logpassword: '',

    },

    onSubmit: async (values)=> {

      try {
        const {data} = await axios.post("http://localhost:8800/login", values)
        localStorage.setItem("token", data);
      
      
        router.push('/')
        
       
   
      } catch (err) {
  
        setError(true)

    }
  },
  validate:values=>{
    let errors = {};
    const regex2 = /^[A-Za-z][A-Za-z0-9_]{3,29}$/i;
    const regex3 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/i;
    if (!values.logusername) {
      errors.logusername = "Cannot be blank";
    } else if (values.logusername.length < 4) {
      errors.logusername = "Username must be more than 4 characters";
    }
    else if (!regex2.test(values.logusername)){
      errors.logusername = "Start with letters, exclude symbols"
    }
    if (!values.logpassword) {
      errors.logpassword = "Cannot be blank";
    } else if (values.logpassword.length < 7) {
      errors.logpassword = "Password must be more than 7 characters";
    }
    else if (!regex3.test(values.logpassword)){
      errors.logpassword = "Use uppercase, lowercase, symbols and numbers";

    }
    return errors;
  }
})


// Creating schema


  return (
    <div className='logi' style={{display:'flex',justifyContent:'center', alignItems:'center',}}>
       <div className='log' style={{display:'flex', alignItems:'center'}}>
   
     


 
   

   <div className='login-back' style={{backgroundColor:'#FEEFDC', paddingLeft:20, paddingRight:20,}}>
   <h2 style={{paddingLeft:40}}>Авторизация</h2>
  
       <form className='login-form'  onSubmit={formik.handleSubmit} >
      
           <span>Имя пользователя</span>
           <input placeholder='petrov92'  onChange={formik.handleChange}  onBlur={formik.handleBlur}
             value={formik.values.logusername} name="logusername"/>
     
  {formik.errors.logusername ? <p className="error" >
             {formik.errors.logusername}
           </p> :null}
           <span>Пароль</span>
           <input  onChange={formik.handleChange}  onBlur={formik.handleBlur}
             value={formik.values.logpassword} name="logpassword" placeholder="Petrov9$"/>
             {formik.errors.logpassword ? <p className="error">
             {formik.errors.logpassword}
           </p> :null} 
           <div style={{display:'flex', justifyContent:'space-between',alignItems:'center'}} >
           <Link style={{display:'flex',gap:3,textDecoration:'none'}} href="/signup"><small>Не имеете аккаунта?</small></Link>

           <button type='submit' className='signup-button' onClick={formik.handleSubmit}>Отправить</button>
    
         
           </div>
           
    
        
       </form>



   </div>
   <img className='login-back'  src='login.png'/>



   

</div>

    </div>
   
  )
}
