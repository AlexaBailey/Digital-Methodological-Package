import React, { createRef } from 'react'
import Navbar from '../../components/Navbar'
import { useState,useEffect } from 'react';
import { useRef } from 'react';
import { ChangeEvent } from 'react';
import setAuthToken from '../../utils/jwt';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Footer from '../../components/Footer'
export default function CheckHomework() {
  const [hasMounted, setHasMounted] = useState(false);
  const [comments, setComments] = useState('');
  const [mark, setMark] = useState('');
  const [proved, setProved] = useState('');

  const [selectedImage, setSelectedImage] = useState<File>();
  const router = useRouter()
  const {hid} = router.query
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
    formData.append('comments',comments)
    formData.append('mark',mark)
    formData.append('proved',proved)




    axios.post(`http://localhost:8800/homework/evaluation/${hid}`, formData)
      .then((response) => {
        console.log(response.data);
        
        toast.success('Спасибо за оценку!', {
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
  
useEffect(() => {
  setHasMounted(true);
  
  
 /*
  const fetchAllData = async () => {
   

    try {
     
      
      const res = await axios.get(`http://localhost:8800`);
      setAllProducts(res.data);

       console.log("Data",res.data)
    } catch (err) {
      console.log(err);
    }
  };
  fetchAllData();*/
}, []);
if (hasMounted){
    if (localStorage.token) {
      const jwt = localStorage.getItem("token");
      setAuthToken(jwt);
      logUser = jwtDecode(jwt);
      console.log(logUser)
  }
  return (
    <>
    <div>
    <Navbar/>  
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
    <h2 style={{textAlign:'center'}}>Оценка отчета/домашнего задания</h2>


<div style={{display:'flex', justifyContent:'center'}}>

    <div style={{display:'flex',flexDirection:'column', justifyContent:'space-around', alignItems:'center'}}>
 
  {!selectedImage &&  <div ><p>Загрузить файл с исправлениями:</p></div>}
   

{/* 👇 Our custom button to select and upload a file */}
<button id="b" style={{display:selectedImage&&"none",height:120,background:'transparent', border:'none'}}  onClick={handleUploadClick}>
  {!selectedImage &&  <img style={{height:120}}src="../../cloud.png"/>}
</button>
{/* 👇 Notice the `display: hidden` on the input */}
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

  
      <div>
      <h3>Данные оценивания</h3>
      <form onSubmit={handleSubmit} >
      <p>Комментарии</p>
      <textarea name="comments"   onChange={(e)=>setComments(e.target.value)} placeholder=''/>
      <p>Оценка (опционально)</p>
      <input name="mark"   onChange={(e)=>setMark(e.target.value)} placeholder='1,2,...'/>
   
      <p>Зачтено</p>
      <input name="proved"   onChange={(e)=>setProved(e.target.value)} placeholder='+,-'/>
   
 

      
       </form>
       

        <button className='signup-button' style={{width:120, marginTop:18}} onClick={handleSubmit}>Сохранить</button>



      </div>
   
     
      
    </div>
    
    
    </div>
    
    
 
   
      </div>
      
         </>
      


   
    
  )


}
else{
  return null
}
}


  