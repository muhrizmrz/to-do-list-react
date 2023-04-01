import React from 'react'
import { FaRegCalendarAlt, FaClock } from 'react-icons/fa'
import {BsCircle, BsCheckCircleFill} from 'react-icons/bs'
import {AiFillDelete} from 'react-icons/ai'

function Card(props) {
  let item = props.item

  return (
    <div className='w-full flex my-4 bg-gray-100 cursor-pointer shadow-lg' >

        <div className='grid place-items-center w-1/5'>
          {item.isCompleted 
            ? <BsCheckCircleFill className='text-blue-500 text-xl' onClick={() => props.checkCompleted(item)} /> 
            : <BsCircle className='text-blue-500 text-xl' onClick={() => props.checkCompleted(item)} /> }
        </div>

        <div className='w-3/5 pr-3 py-3' onClick={props.onClick}>
            <h5 className={`font-semibold mb-1 capitalize ${item.isCompleted && 'line-through'}`}>{item.task}</h5>
            <div className='flex justify-between text-xs'>
                <p className='flex items-center'>
                  <FaRegCalendarAlt className='text-blue-600'/>
                  <span className='ml-2 text-sm'>{item.date}</span>
                </p>
                <p className='flex items-center'>
                  <FaClock className='text-blue-600'/>
                  <span className='ml-2 text-sm'>{item.time}</span>
                </p>
            </div>
        </div>

        <div className='w-1/5 grid place-items-center'>
            <AiFillDelete className='text-lg text-red-500' onClick={()=>props.viewDelete(item)} />
        </div>

    </div>
  )
}

export default Card