import React from 'react'
import Part1 from './components/Part1';
import Part2 from './components/Part2';
import Part3 from './components/Part3';
import { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Signup() {
  const router = useRouter()
  const [info,setInfo]=useState('')
  const [flow,setFlow]=useState('')
  
  const [group,setGroup]=useState('')
  const [course,setCourse]=useState('')



  axios.defaults.withCredentials = true;
const [error,setError] = useState(false)
const send = ()=>{
  formik.handleSubmit



  
}
useEffect(() => {

 
  const fetchAllData = async () => {
    


    try {

  
      
      const res = await axios.get(`http://localhost:8800/signup`);
 
      setInfo(res.data);
      

      console.log(info)
     

       console.log("Data",res.data)
    } catch (err) {
      console.log(err);
    }
  };
  fetchAllData();


}, []); 


  const formik = useFormik({

    initialValues: {

      email: "",
      password: "",
        fio: "",
        username: "",
      flow: flow,
      course: course,
      group:group,
      job:"",
      ackey:"",


    },

    onSubmit: async (values)=> {

      try {
        var res=await axios.post("http://localhost:8800/signup", values);
        console.log("res",res.data)
        if (res.data.length==0){
          alert("Введите верные данные")
       
  


        }
        else{
          router.push("/login")
        }
   
      } catch (err) {
  
        setError(true)

    }
  },
  validate:values=>{
    let errors = {};
    const regex1 = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regex2 = /^[A-Za-z][A-Za-z0-9_]{3,29}$/i;
    const regex3 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}:;<>,^.]).{8,32}$/i;
    if (!values.email) {
      errors.email = "Cannot be blank";
    } else if (!regex1.test(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.username) {
      errors.username = "Cannot be blank";
    } else if (values.username.length < 4) {
      errors.username = "Username must be more than 4 characters";
    }
    else if (!regex2.test(values.username)){
      errors.username = "Start with letters, exclude symbols"
    }
    if (!values.password) {
      errors.password = "Cannot be blank";
    } else if (values.password.length < 7) {
      errors.password = "Password must be more than 7 characters";
    }

    else if (!regex3.test(values.password)){
      errors.password = "Use uppercase, lowercase, symbols and numbers";

    }
    return errors;
  }

  
  }
)
var flows;
var courses;
var groups;

if (info!='' && info!=null){
  courses = [...new Set(info.map(c=>{return (c.cnumber)}))]
  groups = [...new Set(info.map(c=>{return (c.gname)}))]
  flows = [...new Set(info.map(c=>{return (c.fname)}))]
}
  const [page,setPage]=useState(0)
    
    console.log(page)

    const nextForm = (e) => {
      e.preventDefault();
      setPage((currentStep) => currentStep + 1);
    };
    const prevForm = (e) => {
            e.preventDefault();

        setPage((currentStep) => currentStep - 1);
      };
      
      
    
  const FormTitles = ["FIO", "Studies", "Info"];
    const PageDisplay = () => {
    
        if (page === 0) {
          return < Part1 formik={formik}   />;
        } else if (page === 1 && flows!=null && flows!=''&& groups!=null && groups!='' && courses!=null && courses!='') {
          return <Part2 formik={formik}   setFlow={setFlow} flow={flow}  flows={flows} setGroup={setGroup} group={group} groups={groups} courses={courses}  setCourse={setCourse} course={course}   />;
        } else {
          return <Part3 formik={formik}/>;
        }
      };
  
  return (
    <div className='logi' style={{display:'flex',justifyContent:'center', alignItems:'center',}}>
    <div className='log' style={{display:'flex', alignItems:'center'}}>

  





<div className='login-back' style={{backgroundColor:'#FEEFDC', paddingLeft:40, paddingRight:40,}}>

<h2 style={{paddingLeft:40}}>Создать аккаунт</h2><form className='login-form'  onSubmit={formik.handleSubmit} >
      
      {PageDisplay()}
      <div style={{display:'flex',justifyContent:'space-between'}}>
    

           {page!=0 &&    <button   className="signup-button"  
         
         onClick={prevForm}
       >
         Назад
       </button>}

       {page!=FormTitles.length-1 && <button   className="signup-button"   onClick={nextForm}>
          Далеe
        </button>}
        {page==FormTitles.length-1 && <button type='submit' className="signup-button" onClick={()=>send()}>
        Отправить
        </button>}
        </div> 
   </form>

</div>
<img className='login-back'  src='login.png'/>
</div>


    </div>
  )
}
