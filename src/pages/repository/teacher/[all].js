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
import Footer from '../../components/Footer';
import Link from 'next/link';
export default function TeacherMaterials() {
  const router = useRouter()
    const [materials, setMaterials] = useState('');  
    const [name, setName] = useState(''); 
 
    const [course, setCourse] = useState("")

    const [group, setGroup] = useState("")
    const [discipline, setDisc] = useState("")
    const [type, setType] = useState("")
    const [hasMounted,sethasMounted]=useState(false)
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
    const handleCat4 = (type) => {
      console.log(type)
      setType(type);
    }
    let logUser;
   

    useEffect((logUser) => {
      if (!router.isReady) return
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

        
            
            const res = await axios.get(`http://localhost:8800/repository/teacher/${logUser.id}`,{params:{all:logUser.id}});
       
            setMaterials(res.data);
  
          

    

            console.log(materials)
           
      
             console.log("Data",res.data)
          } catch (err) {
            console.log(err);
          }
        };
        fetchAllData();
    

      }, [router.isReady]); 
      
const filterData = async () => {
  try {
    const res = await axios.post(`http://localhost:8800/repository/teacher/${logUser.id}`,{course:course,discipline:discipline,group:group,type:type});
    setMaterials(res.data);
     console.log("Data",res.data)
  } catch (err) {
    console.log(err);
  }
};
 var di;
 var gr;
 var co;
 var ty;

if (materials){
  di= [...new Set(materials.map(m=>{return (m.discipline)}))]
  gr= [...new Set(materials.map(m=>{return (m.gname)}))]
  co= [...new Set(materials.map(m=>{return (m.couid)}))]
  ty= [...new Set(materials.map(m=>{return (m.type)}))]

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
        <img className='hero-image' src="../../library.png"/>

          <div className='text-section'>
          <span className='font big' style={{paddingTop:10}}>Централизованная библиотека - это легко!</span> 
          <button onClick={()=>router.push('#section')} className='detail-line' style={{alignSelf:'flex-start'}}>
          <span className='detail'>Перейти к материалам</span>
          <img className='arrow' src='../../arrow.png'/>
          </button>    
          </div>
        </div>
        <div style={{padding:40}}>

<div id="section" style={{display:'flex', alignItems:'center',gap:12}} >
  <Link href="/repository/addmaterial" style={{display:'flex',alignItems:'center', color:'black', textDecoration:'none'}}>
  <span>Добавить материал</span>
<img style={{height:60}} src="../../plus.png"/>
  </Link>


</div>
<div style={{display:'flex', alignItems:'center',gap:12}}>
  
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
          </label></div>
          <span>Вид занятий</span>
          <div  className="selectdiv">

      
<label>
            
       
        <select  name='type'  value={type} onChange={event => handleCat4(event.target.value)}>
        <option id="0"  onClick={()=>setType('')} >Не выбрано</option>

        {ty? ty.map(c=>{return(<option onClick={()=>setType(c)} >{c}</option>)}) 
          :null}
           
          </select>
          </label></div>
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
        {materials? 
        <div className='homework-container'>
        {materials.map((material)=>{return(
            <Card 
            material={material}
            logUser={logUser}
            setMaterials={setMaterials}
           materials={materials}
          />
        )})}  </div>:<div style={{display:'flex', flexDirection:'column',alignItems:'center'}}><p >Пока материалы отстуствуют</p><br/><img src='../../none.png'/></div>
      }
        </div>
        </div>
        <Footer/>
        </>
    )}}