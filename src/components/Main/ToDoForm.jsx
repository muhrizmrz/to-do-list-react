import React, { useState, useRef, useEffect } from 'react'
import { nanoid } from 'nanoid'
import {BsCircle, BsCheckCircleFill} from 'react-icons/bs'


function ToDoForm(props) {
    const toBeEdit = props.toBeEdit ? props.toBeEdit[0] : ''
    const [toDoTitle, setToDoTitle] = useState(toBeEdit.task ?? '')
    const [toDoDesc, setToDoDesc] = useState(toBeEdit.description ?? '')
    const [toDoTime, setDoTime] = useState(toBeEdit ? toBeEdit.date + 'T' + toBeEdit.time : new Date().toISOString().slice(0, 16))

    const inputRef = useRef(null);
    let isCompleted = toBeEdit.isCompleted 
    ? <BsCheckCircleFill className='text-blue-500 text-xl' onClick={() => props.checkCompleted(toBeEdit)} /> 
    : <BsCircle className='text-blue-500 text-xl' onClick={() => props.checkCompleted(toBeEdit)} /> 

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    function handleSubmit(e) {
        e.preventDefault()
        let split = toDoTime.split('T')
        props.handleSubmit({
            id: props.toBeEdit ? toBeEdit.id : nanoid(),
            task: toDoTitle,
            description: toDoDesc,
            date: split[0],
            time: split[1],
            isCompleted: props.toBeEdit ? toBeEdit.isCompleted : false
        })
        props.handleCloseForm()
        setToDoTitle('')
        setToDoDesc('')
    }

    return (
        <div className='bg-white w-full p-4 pt-8 pb-14 rounded-xl'>
            <h6 className='text-xl mb-8 font-semibold text-center'>Add a task</h6>
            <form action="" className='my-4 mx-16 space-y-4' onSubmit={handleSubmit}>
                <div className='flex items-center'>
                    {toBeEdit && isCompleted}
                    <input type="text" ref={inputRef} value={toDoTitle} onChange={(e) => setToDoTitle(e.target.value)} placeholder='Add a task' id="" className='font-semibold p-2 px-3 w-full text-gray-700 rounded-md border-0 focus:outline-0' />
                </div>
                <input type="text" value={toDoDesc} onChange={(e) => setToDoDesc(e.target.value)} placeholder='Add descripption' id="" className='bg-slate-300 p-2 px-3 w-full text-gray-700 rounded-md border-0 focus:outline-0' />
                <div className='flex items-center bg-slate-300 py-2 pr-2 rounded-lg w-fit'>
                    <span className='text-xl'>⏰</span>
                    <input type="datetime-local" value={toDoTime} onChange={(e) => setDoTime(e.target.value)} className='bg-slate-300 focus:border text-gray-500 focus:outline-none ' id="" />
                </div>
                <input type="submit" value="Save" className='px-6 py-1 rounded-md float-right bg-blue-500 text-white cursor-pointer' />
                <input type="button" onClick={props.onCancel} value="Cancel" className='px-6 py-1 rounded-md float-right text-gray-600 cursor-pointer' />

            </form>
        </div>
    )
}

export default ToDoForm