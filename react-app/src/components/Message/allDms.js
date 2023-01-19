import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChats } from '../../store/chats'
import {NavLink} from "react-router-dom"
import './allDms.css'


function DmBar() {
    const dispatch = useDispatch()
    const chats = useSelector((state) => state.chats)
    
    useEffect(() => {
        dispatch(getChats())
    }, [dispatch])

    return (
        <div className='bar-next-to-servers'>
            <div className='butt-container'>
                <NavLink className='friends' to={'/@me'}>
                    <button className='butt'>Friends</button>
                </NavLink>
                <NavLink className='nitro' to={'/@me'}>
                    <button className='butt'>Nitro</button>
                </NavLink>
                <NavLink className='message_req' to={'/@me'}>
                    <button className='butt'>Message Requests</button>
                </NavLink>

            </div>

            <div className='dm'> Direct Messages
                {Object.values(chats).map((chat) => {
                    return (
                        <NavLink className='single-chat' to={`/@me/${chat.id}`} key={chat.id}>
                            <img className='dm-img' src={chat.receiveUser.profileImg} />
                            <div>{chat.receiveUser.username}</div>
                        </NavLink>
                    )
                })}      
            </div>
        </div>

    )

}

export default DmBar

