import React from 'react'
import { ReactTyped } from 'react-typed'
import { FooterWithLogo } from './subComponent/footer'
import { Button } from '@material-tailwind/react'
import { useSelector } from 'react-redux'

const Home = () => {


  return (
    <div className="min-h-screen flex flex-col justify-between">

      <nav className="flex justify-between items-center px-6 py-3 bg-white shadow-md">
        <div className="text-3xl font-semibold">
          <h1 className="text-gray-900">Art<span className="text-[#48CFCB]">Chat</span></h1>
        </div>
        <div className="flex items-center gap-4">
          <a href="/signin"><Button variant="gradient" color="teal" className="px-6 py-2 text-sm font-medium rounded-lg shadow-md transition-transform hover:scale-105">
            Sign In
          </Button></a>
          <a href="/signup"><Button variant="outlined" color="teal" className="px-6 py-2 text-sm font-medium rounded-lg border-2 border-[#48CFCB] text-[#48CFCB] transition-all hover:bg-[#48CFCB] hover:text-white">
            Sign Up
          </Button></a>
        </div>
      </nav>


      <main className="flex-grow flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-[#48CFCB]">ArtChat</span>
          </h1>
          <ReactTyped
            strings={[
              "A place to connect with fellow artists.",
              "Share your creativity with the world.",
              "Engage with art communities like never before."
            ]}
            typeSpeed={50}
            backSpeed={30}
            loop
            className="text-xl font-medium text-gray-700"
          />
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            ArtChat is a vibrant social platform where artists can express themselves,
            share their works, and connect with like-minded people. Whether you're a
            painter, sculptor, or digital artist, ArtChat offers a space to post,
            comment, and engage with art from around the globe.
          </p>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Built with cutting-edge technologies like React and Node.js, ArtChat ensures
            a seamless experience for its users, providing a modern and secure platform
            for all your artistic endeavors.
          </p>
        </div>
      </main>

 
      <FooterWithLogo />
    </div>

  )
}

export default Home
