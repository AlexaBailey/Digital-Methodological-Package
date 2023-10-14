import React, { createRef } from 'react'
import Navbar from '../components/Navbar'
import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import setAuthToken from '../utils/jwt';
import jwtDecode from 'jwt-decode';
import { ChangeEvent } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Add() {
  const [hasMounted, setHasMounted] = useState(false);
  const [materials, setMaterials] = useState('');  
  const [selectedImage, setSelectedImage] = useState(null);
  const [group,setGroup]= useState("")
  const [flow, setFlow]= useState("")
  const [author,setAuthor]= useState("")
  const [disc,setDisc]= useState("")
  const [name,setName]= useState("")
  const [type,setType]= useState("")
  const [date,setDate]= useState("")
  const [linki,setLinki]= useState("")


  var logUser;
  useEffect((logUser) => {
    setHasMounted(true)
    if (localStorage.token) {
      const jwt = localStorage.getItem("token");
      setAuthToken(jwt);
      logUser = jwtDecode(jwt);
      console.log(logUser)
      console.log(logUser.id)
    
  }

  }, []); 



      const inputRef = useRef(null);
      const handleUploadClick = () => {
        // 👇 We redirect the click event onto the hidden input element
        inputRef.current?.click();
       
      };
      useEffect(() => {
        setHasMounted(true)
        

      }, []);        

   
   
     /* async function saveData(e){
        
        try {
          e.preventDefault()
         
          axios.post(`http://localhost:8800/enterprise/sell`,            
            {title:title,price:price, author:author, desc:desc, cat:cat, theme:theme, color:color, gender:gender, size:size ,image:source});
         
          
        } catch (err) {
          console.log(err);
        }
      };*/
  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
     
      setSelectedImage(e.target.files[0]);
      
    }
    setSelectedFile(e.target.files[0]);
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const router=useRouter()  
  const handleSubmit = (event,logUser) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile)
    formData.append('group',group)
    formData.append('flow',flow)
    formData.append('author',author)
    formData.append('disc',disc)
    formData.append('name',name)
    formData.append('type',type)
    formData.append('linki',linki)
    console.log(linki)
    formData.append('publish',new Date().toLocaleDateString())
    



    axios.post('http://localhost:8800/repository/addmaterial', formData)
      .then((response) => {
        console.log(response.data);
        toast.success('Материал успешно добавлен!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

 
 /*
useEffect(() => {
  setHasMounted(true);
  

  const requsetData = async () => {
   

    try {
     
      
      const res = await axios.get(`http://localhost:8800`);
      setAllProducts(res.data);

       console.log("Data",res.data)
    } catch (err) {
      console.log(err);
    }
  };
  requsetData();
}, []);*/
if (hasMounted){
  
  return (
    <>
      <Navbar/> 
     
      

    <div className='overall'>
   
    <h2 style={{textAlign:'center'}}>Загрузить новый материал</h2>

       
    <div style={{display:'flex',justifyContent:'center',gap:100}}>
      
    
    <div style={{display:'flex',justifyContent:'space-around', flexDirection:'column',gap:60}}>

  
<button id="b" style={{display:selectedImage&&"none", backgroundColor:'transparent', height:200, border:'none'}}  onClick={handleUploadClick}>
{!selectedImage &&  <img style={{height:200}}src='../cloud.png'/>}
</button>
<input
type="file"
ref={inputRef}
onChange={imageChange}
style={{ display: 'none' }}
/>
    {selectedImage && (
      <div className="preview">
        <h2>Детали файла</h2>
      <p>Название файла: {selectedImage.name}</p>
      <p>Тип файла: {selectedImage.type}</p>
      <p>Размер в байтах: {selectedImage.size}</p>
      
        <button className='remove-button' onClick={removeSelectedImage}>
          Удалить файл
        </button>
      </div>
  
    )}
      


<div style={{display:'flex', flexDirection:'column'}}>
  

  <img style={{height:180}} src="../chain.png"/>
  <input name="linki" onChange={(e)=>setLinki(e.target.value)}  className='desc-input'  style={{marginTop:-50, width:150,borderRadius:12,alignSelf:'center'}} />
</div>

      
      


      
    </div>
  
  <form onSubmit={handleSubmit}>
    
 
    <h3>Данные</h3>
  <p>Название материала</p>
  <input name="name"   onChange={(e)=>setName(e.target.value)} placeholder=''/>

          <p>Группа</p>
          <input name="group"   onChange={(e)=>setGroup(e.target.value)} placeholder=''/>

          <p>Вид занятий</p>
          <input name="type"   onChange={(e)=>setType(e.target.value)} placeholder=''/>

            
       
       
          <p>Дисциплина</p>
          <input name="disc"   onChange={(e)=>setDisc(e.target.value)} placeholder=''/>
          <button className='signup-button' style={{width:120, marginTop:18,}} onClick={handleSubmit}>Сохранить</button>
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
       

   </form>

   


    </div>



    
   
      </div>
      </>
      


   
    
  )


}
else{
  return null
}
}
{/*
<div style={{display:'flex', justifyContent:'space-around'}}>
<div className='container'>
{!selectedImage &&  <div>Загрузить новый файл:</div>}



<button id="b" style={{display:selectedImage&&"none"}}  onClick={handleUploadClick}>
{!selectedImage &&  <img src="https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/66/null/external-Upload-File-seo-smashingstocks-flat-smashing-stocks.png"/>}
</button>
<input
type="file"
ref={inputRef}
onChange={imageChange}
style={{ display: 'none' }}
/>
    {selectedImage && (
      <div className="preview">
        <h2>Детали файла</h2>
      <p>Название файла: {selectedImage.name}</p>
      <p>Тип файла: {selectedImage.type}</p>
      <p>Размер в байтах: {selectedImage.size}</p>
      
        <button className='remove-button' onClick={removeSelectedImage}>
          Удалить файл
        </button>
      </div>
  
    )}

  </div>
  <div>

  



  </div>
  
 
  
</div>*/}

  