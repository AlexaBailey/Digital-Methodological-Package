import React, { createRef } from 'react'
import Navbar from './components/Navbar'
import { useState,useEffect } from 'react';
import { useRef } from 'react';
import { ChangeEvent } from 'react';
import axios from 'axios';
import setAuthToken from './utils/jwt';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';

export default function Admin() {
    const [flow,setFlow]=useState('')
const [group,setGroup]=useState('')
const [course,setCourse]=useState('')
    const formik = useFormik({

        initialValues: {
    
          flow: flow,
          course: course,
          group:group,
          ackey:"",
    
    
        },
    
        onSubmit: async (values)=> {
    
          try {
            await axios.post("http://localhost:8800/admin", values);
            
       
          } catch (err) {
      
            setError(true)
    
        }
      },
    })
    
    
    return (
    <div>
        <Navbar/>
       
    <section>
    <form>
        <div class="admin">
            <button type='submit'  onClick={formik.handleSubmit} class="admin-lock"><img width="60" height="60" src="https://img.icons8.com/carbon-copy/60/right-squared.png" alt="right-squared"/></button>

            <div class="admin-content">
                <h2 class="admin-content-header">Добавьте группу</h2>

                <div class="form">
                   

    
        <input  value={formik.values.flow}
        onChange={formik.handleChange} className='form-unput'  onBlur={formik.handleBlur} name="flow" placeholder='Специальность'/>

        
          <input  value={formik.values.group}
        onChange={formik.handleChange} className='form-unput' onBlur={formik.handleBlur} name="group" placeholder='Группа'/>

       
    
          <input  value={formik.values.course}
        onChange={formik.handleChange} className='form-unput'  onBlur={formik.handleBlur} name="course" placeholder='Курс'/>

          <input  value={formik.values.ackey}
        onChange={formik.handleChange} className='form-unput'  onBlur={formik.handleBlur} name="ackey" placeholder='Ключ'/>

        
          
                </div>
            </div>
        </div>
    </form>
</section>
</div>
  )
}
