import React, { useContext } from 'react'
import { Context } from '../../context/Context'
const Suggestion = (props) => {
    const { onSent } = useContext(Context)
    return (
        <div className='w-52 h-48 bg-sec rounded-2xl relative p-4 pr-8 hover:bg-hov cursor-pointer' title='suggestion box' onClick={() => { onSent(props.text) }}>
            <p>{props.text}</p>
            <div className='p-2 bg-main w-fit rounded-full absolute bottom-4 right-4'>
                <img src={props.logo} alt="icon" className='w-6' />
            </div>
        </div>
    )
}

export default Suggestion