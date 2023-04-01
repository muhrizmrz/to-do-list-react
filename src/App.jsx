import { useEffect, useState, useRef } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import ToDoForm from './components/Main/ToDoForm'
import Model from './components/UiElements/Model'
import PlusIcon from './components/UiElements/PlusIcon'
import { FcGoogle } from 'react-icons/fc'

import './styles/index.css'
import { addData, deleteData, getData, signInWithGoogle, updateData } from './firebase'

function App() {
  const [toDoList, setToDoList] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [viewTask, setViewTask] = useState(false)
  const [taskIndex, setTaskIndex] = useState('')
  const [deleteModel, setDeleteModel] = useState(false)
  const [user, setUser] = useState(localStorage.getItem('name') || '')
  const [viewLogin, setViewLogin] = useState(user == '' && true)

  const isUpdatingRef = useRef(false)

  let selected = toDoList.filter((value) => value.fid == taskIndex)

  useEffect(()=>{
    getData('to-do-list').then((result)=>{
      setToDoList(result)
    })
  },[])

  useEffect(()=>{
    isUpdatingRef.current = true
    
    getData('to-do-list').then((result)=>{
      if(!isUpdatingRef){
        setToDoList(result)
      }
    })

    isUpdatingRef.current = false
  },[toDoList])

  function signIn() {
    signInWithGoogle(() => {
      setUser(localStorage.getItem('name'))
      getData().then((result)=>{
        setToDoList(result)
      })
      setViewLogin(false)
      
    })
  }

  function handleOpenForm() {
    setShowForm(true)
  }

  function handleCloseForm() {
    setShowForm(false)
  }

  function addToDo(toDo) {
    setToDoList(prev => (
      [...prev, toDo]
    ))
    addData('to-do-list', {
      userId: localStorage.getItem('userId')
      , ...toDo
    })
  }

  function loadToEdit(value) {
    setViewTask(true)
    setTaskIndex(value)
  }

  function editToDo(toDo) {
    setToDoList(prev => {
      return prev.map(obj => (
        obj.fid === taskIndex ? {fid:obj.fid, ...toDo } : { ...obj }
      ))
    })
    updateData('to-do-list',taskIndex,toDo)
  }

  function checkCompleted(item) {
    setToDoList(prev => (
      prev.map(obj => (obj.fid == item.fid ? { ...obj, isCompleted: !obj.isCompleted } : { ...obj }))
    ))
    updateData('to-do-list',item.fid,{isCompleted:!item.isCompleted})
  }

  function deleteToDo() {
    setToDoList(toDoList.filter(obj => obj.fid !== taskIndex.fid))
    deleteData(taskIndex.fid)
    setDeleteModel(false)
  }

  function viewDeleteModel(id) {
    setDeleteModel(true)
    setTaskIndex(id)
  }

  return (
    <>
      <Header user={user} setUser={setUser} setViewLogin={setViewLogin} setToDoList={setToDoList} />

      <Main toDoList={toDoList} viewTask={loadToEdit} checkCompleted={checkCompleted} viewDelete={viewDeleteModel} delete={deleteToDo} />

      <PlusIcon
        iconStyle={{ size: '2em', className: 'text-blue-500 hover:text-blue-700' }}
        divStyle='flex items-center space-x-3 shadow-2xl cursor-pointer bg-white rounded-full p-3 px-6 absolute bottom-12 right-16'
        onClick={handleOpenForm}
      >
        <p>Add a task</p>
      </PlusIcon>

      {viewLogin && <Model style='md:w-full w-full bg-white h-screen grid place-items-center' handleClick={() => setViewLogin(false)}>
        <div className='bg-slate-800 rounded-lg p-4 px-6 space-y-4'>
          <h5 className='text-center text-lg font-bold'>To Do List</h5>
          <p className='text-md text-center'>Plan your day</p>
          <button className='bg-gray-200 p-2 px-4 space-x-3 rounded-md flex items-center' onClick={signIn}><FcGoogle /> <span>Sign In with google</span></button>
        </div>
      </Model>}

      {showForm && <Model style='top-[15%] md:w-2/5 w-5/5' handleClick={handleCloseForm}>
        <ToDoForm onCancel={handleCloseForm} handleSubmit={addToDo} handleCloseForm={handleCloseForm} checkCompleted={checkCompleted} />
      </Model>}

      {viewTask && <Model style='top-[15%] w-2/5' handleClick={() => setViewTask(false)} >
        <ToDoForm toBeEdit={selected} onCancel={() => setViewTask(false)} handleCloseForm={()=>setViewTask(false)} handleSubmit={editToDo} checkCompleted={checkCompleted} />
      </Model>}

      {deleteModel && <Model style='top-[4%] w-1/3' handleClick={() => setDeleteModel(false)}>
        <div className='bg-white rounded-lg p-4 px-6'>
          <p><span className='font-semibold'>'{taskIndex.task && taskIndex.task}'</span> will be permanently deleted</p>
          <div className='flex justify-end my-2'>
            <input type="button" onClick={() => setDeleteModel(false)} value="Cancel" className='px-6 py-1 rounded-md float-right text-gray-600 cursor-pointer' />
            <input type="button" onClick={deleteToDo} value="Delete" className='px-6 py-1 rounded-md float-right bg-red-500 text-white cursor-pointer' />
          </div>
        </div>
      </Model>}

    </>
  )
}

export default App
