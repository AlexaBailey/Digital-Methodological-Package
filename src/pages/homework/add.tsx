import React, { createRef } from 'react'
import Navbar from '../components/Navbar'
import { useState,useEffect } from 'react';
import { useRef } from 'react';
import { ChangeEvent } from 'react';
import setAuthToken from '../utils/jwt';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function AddHomework() {
  const [hasMounted, setHasMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File>();
  const [group,setGroup]= useState("")
  const [flow, setFlow]= useState("")
  const [teacher,setTeacher]= useState("")
  const [disc,setDisc]= useState("")
  const [name,setName]= useState("")
  var logUser;
  const [author,setAuthor]= useState("")
      const inputRef = useRef<HTMLInputElement | null>(null);
      const handleUploadClick = () => {
        // 👇 We redirect the click event onto the hidden input element
        inputRef.current?.click();
       
      };
       

   
   
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
  const router=useRouter()

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
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile)
    formData.append('group', logUser.grouppa)
    formData.append('disc',disc)
    formData.append('name',name)
    formData.append('fio', logUser.fio)
    formData.append('author', logUser.id)

    


    axios.post('http://localhost:8800/homework/add', formData)
      .then((response) => {
        console.log(response.data);
        router.push(`/homework/${logUser.id}`)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
useEffect(() => {
  setHasMounted(true);
  
}, []);
if (hasMounted){
    if (localStorage.token) {
      const jwt = localStorage.getItem("token");
      setAuthToken(jwt);
      logUser = jwtDecode(jwt);
      console.log(logUser)
  }
  return (
    <div>
    <Navbar/>      


    <h2 style={{textAlign:'center'}}>Загрузить домашнее задание</h2>
    <div style={{display:'flex', justifyContent:'center'}}>

<div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:100}}>




<button id="b" style={{display:selectedImage&&"none",height:120,background:'transparent', border:'none'}}  onClick={handleUploadClick}>
{!selectedImage &&  <><img style={{height:180}} src="../../cloud.png"/></>}
</button>
<input
type="file"
ref={inputRef}
onChange={imageChange}
style={{ display: 'none' }}
/>
    {selectedImage && (
      <div style={{textAlign:'left', display:'flex', flexDirection:'column', width:300}}>
        <h2>Детали файла</h2>
      <p>Название файла: {selectedImage.name}</p>
      <p>Тип файла: {selectedImage.type}</p>
      <p>Размер в байтах: {selectedImage.size}</p>
      
        <button className='remove-button' onClick={removeSelectedImage}>
          Удалить файл
        </button>
      </div>
  
    )}
     
      <div>
      <h2>Данные</h2>
      <form onSubmit={handleSubmit} >
      <p>Название файла</p>
      <input name="name"   onChange={(e)=>setName(e.target.value)} placeholder=''/>

   
     
      
      
        <p>Дисциплина</p>
        <input className='desc-input'name="disc" onChange={(e)=>setDisc(e.target.value)}  placeholder='КПО, АИСД, ... '/>
        <button className='signup-button' style={{ marginTop:18,alignSelf:'center'}} onClick={handleSubmit}>Сохранить</button>

       </form>
       




      </div>

     
      
    </div>
    
   
      </div>
      </div>


   
    
  )


}
else{
  return null
}
}


  