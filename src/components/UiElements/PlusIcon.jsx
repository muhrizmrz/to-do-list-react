import React from 'react'
import { IconContext } from 'react-icons'
import { GoPlus } from 'react-icons/go'

function PlusIcon(props) {
    return (
        
            <div className={`${props.divStyle}`} onClick={props.onClick}>
                <IconContext.Provider value={props.iconStyle}>
                    <GoPlus />
                </IconContext.Provider>
                {props.children}
            </div>
    )
}

export default PlusIcon