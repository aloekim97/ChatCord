import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChats } from '../../store/chats'
import {NavLink} from "react-router-dom"
import './allDms.css'


function DmBar() {
    const dispatch = useDispatch()
    const chats = useSelector((state) => state.chats)
    console.log(chats)
    
    useEffect(() => {
        dispatch(getChats())
    }, [dispatch])

    return (
        <div className='bar-next-to-servers'>
            <div classname='friends'>Friends</div>
            <div classname='nitro'>Nitro</div>
            <div classname='message_req'>Message Requests</div>

            <div className='dm'> Direct Messages
                {Object.values(chats).map((chat) => {
                    return (
                        <div className='single-chat' key={chat.id}>
                            <NavLink to={`/dm/${chat.id}`}>{chat.receiver_id}</NavLink>
                        </div>
                    )
                })}      
            </div>
        </div>

    )

}

export default DmBar

