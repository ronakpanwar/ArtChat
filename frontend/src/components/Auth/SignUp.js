import React, { useState } from 'react';
import {
  Card,
  Input,
  Button,
  Typography,
} from '@material-tailwind/react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from "@material-tailwind/react";
import { setLoading } from '../../Redux/authSlice';


const SignUp = () => {
   const dispatch = useDispatch();
   const {loading} = useSelector(store=>store.auth)
   const navigate = useNavigate();


    const [data, setData] = useState({
        name:"",
        email: '',
        password: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
          ...data,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          dispatch(setLoading(true));
          const res = await axios.post('http://localhost:4000/api/user/add-user',data , {
            headers:{
              'Content-Type':"application/json"
            },
            withCredentials:true
          })
          if(res.data.success){
            
            toast.success(res.data.message)
            navigate('/signin')
          }
        } catch (error) {
          toast.error(error.response.data.message)
        }finally{
          dispatch(setLoading(false))
        }
   
      };
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-600">
    <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <Typography
        variant="h3"
        className="text-center mb-4 text-gray-800 font-bold"
      >
        Create your ArtChat Account
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
      <Input
          size="lg"
          label="Name"
          name="name"
          type="text"
          value={data.name}
          onChange={handleChange}
          placeholder="Enter your Full name"
          className=""
          required
        />
        <Input
          size="lg"
          label="Email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className=""
          required
        />
        <Input
          size="lg"
          label="Password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className=""
          required
        />
     {
      loading ? <Button
          fullWidth
          className="flex gap-4 items-center justify-center  bg-gradient-to-r from-purple-400 to-pink-600 text-white font-bold"
          type="submit"
        >
         <Spinner/> please Wait ....
        </Button>:
        <Button
          fullWidth
          className="bg-gradient-to-r from-purple-400 to-pink-600 text-white font-bold"
          type="submit"
        >
          Sign Up
        </Button>
     }
        
        <Typography className="text-center text-gray-500 mt-4">
          Already have an account? <a href="/signin" className="text-pink-500">Sign In</a>
        </Typography>
      </form>
    </Card>
  </div>
  )
}

export default SignUp
