import React, { createRef } from 'react'
import { useState,useEffect } from 'react';
import { useRef } from 'react';
import { ChangeEvent } from 'react';
import axios from 'axios';
import setAuthToken from '../../utils/jwt';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import Card from '../../components/Card';
import Navbar from '../../components/Navbar'
import Link from 'next/link';
import HomeItem from '../../components/HomeItem';
import Footer from '../../components/Footer';
export default function Teacher() {
 
    const [homeworks, setHomework] = useState('');  
    const router = useRouter()
 

    const [hasMounted,sethasMounted]=useState(false)
    const [course, setCourse] = useState("")

    const [group, setGroup] = useState("")
    const [discipline, setDisc] = useState("")
    const handleCat1 = (course) => {
      console.log(course)
      setCourse(course);
    }
    const handleCat2 = (group) => {
      console.log(group)
      setGroup(group);
    }
    const handleCat3 = (discipline) => {
      console.log(discipline)
      setDisc(discipline);
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
      
                const res = await axios.get(`http://localhost:8800/homework/teacher/${logUser.id}`,{params:{allteacher:logUser.id}});


            

        
            
       
            setHomework(res.data);
     

            console.log(homeworks)
           
      
             console.log("Data",res.data)
          } catch (err) {
            console.log(err);
          }
        };
        fetchAllData();
    

      }, []); 
      const filterData = async () => {
        try {
          const res = await axios.post(`http://localhost:8800/homework/teacher/${logUser.id}`,{params:{allteacher:logUser.id},course:course,discipline:discipline,group:group});
          setHomework(res.data);
           console.log("Data",res.data)
        } catch (err) {
          console.log(err);
        }
      };
      var di;
      var gr;
      var co;
      var ty;
     
     if (homeworks){
       di= [...new Set(homeworks.map(m=>{return (m.discipline)}))]
       gr= [...new Set(homeworks.map(m=>{return (m.gname)}))]
       co= [...new Set(homeworks.map(m=>{return (m.couid)}))]
      
     
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
                <span className='font big' style={{paddingTop:10}}>Онлайн проверка домашних заданий и отчетов</span> 
                <button onClick={()=>router.push('#section')} className='detail-line' style={{alignSelf:'flex-start'}}>
                <span className='detail'>Перейти к заданиям</span>
                <img className='arrow' src='../../arrow.png'/>
                </button>    
                </div>
              </div>
            
        <div id="section" style={{display:'flex', alignItems:'center',gap:12}}>
        <button onClick={filterData} style={{background:'transparent',border:'none'}}><img style={{height:60}} src="../../filter.png"/></button>
        <span>Курс</span>
        <div  className="selectdiv">

      
<label>
            
        <select  name='course'  value={course} onChange={event => handleCat1(event.target.value)}>
        <option id="0"  onClick={()=>setCourse('')} >Не выбрано</option>

        {co ? co.map(c=>{return(<option onClick={()=>setCourse(c)} >{c}</option>)}) 
          :null}
           
          </select>
          </label>
          </div>
            
          <span>Группа</span>
          <div  className="selectdiv">

      
<label>
            
        <select  name='group'  value={group} onChange={event => handleCat2(event.target.value)}>
        <option id="0"  onClick={()=>setGroup('')} >Не выбрано</option>

        {gr? gr.map(c=>{return(<option onClick={()=>setGroup(c)} >{c}</option>)}) 
          :null}
           
          </select>
          </label>
          </div>
          <span>Дисциплина</span>
          <div  className="selectdiv">

      
<label>
            
        <select  name='discipline'  value={discipline} onChange={event => handleCat3(event.target.value)}>
        <option id="0"  onClick={()=>setDisc('')} >Не выбрано</option>

        {di? di.map(c=>{return(<option onClick={()=>setDisc(c)} >{c}</option>)}):null}
           
          </select>
          </label>
          </div>
         
      
        </div>

       <div className='homework-container'>
       {homeworks? homeworks.map((homework)=>{return(
        <div className='homecard-outer'>

            <HomeItem 
            homeworks={homeworks}
            setHomework={setHomework}
            homework={homework}
            logUser = {logUser}
          />
          </div>


        )}):null}

       </div>
   
       </div>
       <Footer/>
       
        </>
    )}}