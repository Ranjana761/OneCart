import React from 'react'
import back1 from "../assets/back1.jpg"

import back6 from "../assets/back6.webp"
import back4 from "../assets/back4.webp"
import back5 from "../assets/back5.png"

const Background = ({heroCount}) => {
  
    if(heroCount===0){
        return <img src={back1} alt='' className='w-[100%] 
        h-[100%] float-left overflow-auto object-cover  '/>
    }else if(heroCount===1){
        return <img src={back5} alt='' className='w-[100%] 
        h-[100%] float-left overflow-auto object-cover  '/>
    }else if(heroCount===2){
        return <img src={back6} alt='' className='w-[100%] 
        h-[100%] float-left overflow-auto object-cover  '/>
    }else if(heroCount===3){
        return <img src={back4} alt='' className='w-[100%] 
        h-[100%] float-left overflow-auto object-cover  '/>
    }
  
}

export default Background
