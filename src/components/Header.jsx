import React, { useState } from 'react'

import { getData, signInWithGoogle, signOutGoogle } from '../firebase'
import Model from './UiElements/Model'

function Header(props) {

    const [signOutView, setSignOutView] = useState(false)

    function signIn() {
        signInWithGoogle(() => {
            props.setUser(localStorage.getItem('name'))
            getData('to-do-list').then((result) => {
                props.setToDoList(result)
            })
        })
    }

    function signOut() {
        signOutGoogle()
        props.setToDoList([])
        props.setUser('')
        setSignOutView(false)
        props.setViewLogin(true)
    }

    return (
        <>
            {signOutView && <Model style='top-[15%] md:w-2/5 w-5/5' handleClick={()=>setSignOutView(false)}>
                <div className='bg-white rounded-lg p-4 px-6'>
                    <p>Are you sure</p>
                    <p>Do you really want to sign out from this account </p>
                    <div className='flex justify-end my-2'>
                        <input type="button" onClick={() => setSignOutView(false)} value="Cancel" className='px-6 py-1 rounded-md float-right text-gray-600 cursor-pointer' />
                        <input type="button" onClick={signOut} value="Sign out" className='px-6 py-1 rounded-md float-right bg-red-500 text-white cursor-pointer' />
                    </div>
                </div>
            </Model>}
            <header className="py-4 border-b px-10">

                <div className="container mx-auto flex justify-between items-center px-4">
                    <a href="#" className="text-xl font-semibold text-gray-800 tracking-tight">To Do</a>
                    <nav>
                        <ul className="flex space-x-4 items-center">
                            {
                                props.user != ''
                                    ? <div className='flex space-x-3'>
                                        <p className='text-gray-500'>{props.user}</p>
                                        <button className='text-red-500' onClick={()=>setSignOutView(true)}>Sign Out</button>
                                    </div>
                                    : <button className='bg-gray-500' onClick={signIn}>Sign In with google</button>
                            }
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header