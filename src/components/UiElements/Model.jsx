import React from 'react'

function Model({style,children,handleClick}) {
  return (
    <div className='z-20 w-full h-screen fixed top-0 grid place-items-center '>

        <div onClick={handleClick} className={`w-full h-screen bg-black bg-opacity-50`}>
            
        </div>
        <div className={`${style} absolute `}>
            {children}
        </div>
    </div>
  )
}

export default Model