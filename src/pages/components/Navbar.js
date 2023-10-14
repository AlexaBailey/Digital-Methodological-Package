import React from 'react'
import Link from 'next/link';
import axios from 'axios';
import setAuthToken from '../utils/jwt';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
export default function Navbar() {
  let logUser;
  if (typeof window!='undefined'){
    if (localStorage.token) {
      const jwt = localStorage.getItem("token");
      setAuthToken(jwt);
      logUser = jwtDecode(jwt);
      console.log(logUser)
        }
}
const router = useRouter();
const currentRoute = router.pathname;
console.log(currentRoute)
  return (
    <>
     <nav className="nav" style={{display:'flex',justifyContent:'space-between', height:60, alignItems:'center'}} >
        
        <Link  className='nav-left' href={`/`}><img className='nav-sign' src='../../al.png'/>
        <span style={{fontSize:20}}>AlgoMath</span>
        
        </Link>


     

   
        <div  className='nav-left' >
        <Link className={currentRoute === "/" 
       ? "active" 
       : "non-active"} href={`/`}><span>Главная</span></Link>
       
        <Link className="non-active" href={`/#section`}> <span>О нас</span></Link>
        {logUser ? <>
          {logUser.job==1 ? <Link className={currentRoute === "/admin" 
       ? "active" 
       : "non-active"} href={`/admin`}><span>Админ</span></Link>:null}
       
     
       
          {logUser.job   != 1 ? <Link  className={currentRoute === `/repository/[myrepository]` 
       ? "active" 
       : "non-active"} href={`/repository/${logUser.grouppa}`}><span>Мои материалы</span></Link>:<Link className={currentRoute === `/repository/teacher/[all]`
       ? "active" 
       : "non-active"} href={`/repository/teacher/${logUser.id}`}>Мои материалы</Link>}
       {logUser.job == 1 ? <Link className={currentRoute === `/homework/teacher/[allteacher]`
       ? "active" 
       : "non-active"}  href={`/homework/teacher/${logUser.id}`}><span>Мое ДЗ</span></Link>: <Link className={currentRoute === `/homework/[homework]` 
       ? "active" 
       : "non-active"}  href={`/homework/${logUser.id}`}><span>Мое ДЗ</span></Link>}
      <Link className="non-active" href={`/logout`}>Выйти</Link>
      

      <Link className={currentRoute ===`/account/user/[userid]`
       ? "active " 
       : "profile-button"}  href={`/account/user/${logUser.id}`}>Профиль</Link> 
        
        
        
        </>:
        <Link  href={`/login`} className='profile-button'>Войти</Link>
        }
      
         
        </div>

       
         
    

        
        </nav>
        

    </>
   
  )
}
