import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChats } from '../../store/chats'
import {NavLink} from "react-router-dom"

const DmBar = () => {
    const dispatch = useDispatch()
    const allChats = useSelector((state) => state.chats.chats)

    useEffect(() => {
        dispatchEvent(getChats())
    }, [dispatch])

    

    return(
        <div className='all-chats'>
            {Object.values(allChats).map((chat) => {
                return (
                    <div className='single-chat' key={chat.id}>
                        <NavLink to={`/dm/${chat.id}`}>{chat.id}</NavLink>
                    </div>
                )
            })}
        </div>
    )
}

export default DmBar