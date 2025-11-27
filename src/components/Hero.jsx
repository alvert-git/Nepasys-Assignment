import React from 'react'
import { Link } from 'react-router-dom'
import hero_bg from '../assets/images/hero-background.png'

const Hero = () => {
  return (
    <section className="relative">
        <img 
        src={hero_bg}
        alt="tech background"
        className="w-full h-[300px] md:h-[400px] lg:h-[600px] object-cover object-bottom brightness-50"
        ></img>
        
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-6">
                
                <h1 className="text-5xl md:text-8xl lg:text-9xl font-extrabold tracking-tight uppercase mb-4 drop-shadow-lg">
                    Your<br />Gadgets 
                </h1>
                
             
                <p className="text-lg md:text-xl mb-8 drop-shadow-md">
                    Get ready for the Latest Gadgets
                </p>
                
                <Link 
                    to="/shop" 
                    className="bg-white text-black hover:bg-gray-100 transition duration-300 px-8 py-3 rounded-full text-lg font-semibold shadow-xl"
                > 
                    Shop Now
                </Link>
            </div>
        </div>
       </section>
  )
}

export default Hero