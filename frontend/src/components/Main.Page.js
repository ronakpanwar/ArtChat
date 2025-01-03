import React, { useEffect } from 'react'
import Navbar from './subComponent/Navbar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';


const MainPage = () => {
  const {user} = useSelector(store=>store.auth);
   const navigate = useNavigate();
 
  useEffect(()=>{
     if(!user){
        navigate("/");
        alert('User not Autherized...');
     }
  },[user]);

  return (
    <div className='mx-4 my-2'>
    <Navbar/>
      Home
    </div>
  )
}

export default MainPage
