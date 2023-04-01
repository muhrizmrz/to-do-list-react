import React from 'react'
import { nanoid } from 'nanoid'

import Card from '../UiElements/Card'

function Tasks(props) {

  let items = []
  props.toDoList && props.toDoList.map(obj => {
    return obj.isCompleted === props.isCompleted && items.push(obj)
  })

  return (
    <div>
      <div className='flex justify-between mb-5'>
        <h4 className='text-lg font-semibold text-gray-600'>
          {props.isCompleted ? 'Completed' : 'Upcoming'}
        </h4>
        <p className='bg-blue-500 p-1 px-3 text-white rounded-lg'>{items.length}</p>
      </div>

      {items.length !== 0
        ? items.map(obj => (<Card item={obj} key={obj.id} viewDelete={props.viewDelete} delete={props.delete} checkCompleted={props.checkCompleted} onClick={() => props.viewTask(obj.fid)} />))
        : <p className='text-gray-500'>
            {props.isCompleted ? 'No Completed Tasks' : 'No Upcoming Tasks'}
        </p>
      }
    </div>
  )

}

export default Tasks