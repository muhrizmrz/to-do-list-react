import React, { useState } from 'react'
import Tasks from './Main/Tasks'

function Main(props) {

  return (
    <div className='py-4 mx-10 px-4 grid md:grid-cols-3 grid-cols-1 gap-10'>

      <Tasks toDoList={props.toDoList} viewDelete={props.viewDelete} delete={props.delete} isCompleted={false} viewTask={props.viewTask} checkCompleted={props.checkCompleted} />
      <Tasks toDoList={props.toDoList} viewDelete={props.viewDelete} delete={props.delete} isCompleted={true} viewTask={props.viewTask} checkCompleted={props.checkCompleted} />

    </div>
  )
}

export default Main