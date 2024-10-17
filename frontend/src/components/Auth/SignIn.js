import React, { useState } from 'react'
import {
  Card,
  Input,
  Button,
  Typography,
} from '@material-tailwind/react';
import {  toast } from 'sonner'

const SignIn = () => {

      const [data , setData] = useState({
        email:"",
        password:""
      });

      const handleChange =(e)=>{
        const{name,value} = e.target;
        setData({
            ...data,
            [name]:value
        })
      }
     
      const handleSubmit = async(e)=>{
        e.preventDefault(); 
       toast.success(data.email)
      }

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 to-cyan-600">
      <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <Typography
          variant="h3"
          className="text-center mb-4 text-gray-800 font-bold"
        >
          Welcome Back to ArtChat!
        </Typography>
        <Typography className="text-center text-gray-500 mb-6">
          Sign in to your account
        </Typography>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            size="lg"
            label="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className=""
          />
          <Input
            type="password"
            size="lg"
            label="Password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className=""
          />
          <Button
            fullWidth
            type='submit'
            className="bg-gradient-to-r from-teal-400 to-cyan-600 text-white font-bold"
          >
            Sign In
          </Button>
          <div className="flex justify-between items-center mt-4">
            <Typography className="text-sm">
              Don’t have an account? <a href="/signup" className="text-cyan-500">Sign Up</a>
            </Typography>
            <a href="/forgot-password" className="text-sm text-cyan-500">
              Forgot Password?
            </a>
          </div>
        </form>
      </Card>
    </div>

    </>
  )
}

export default SignIn
