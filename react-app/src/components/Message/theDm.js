import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadTheDmsThunk } from '../../store/directMsg'
import { getChats } from '../../store/chats'
import { useParams } from "react-router-dom"
import './allDms.css'
import DmBar from './allDms'

function DmPage({chat}){
    const dispatch = useDispatch()
    const {chatId} = useParams()
    const dms = useSelector(state => state.dmReducer.chatDetails)


  

    useEffect(() => {
        dispatch(loadTheDmsThunk(chatId))
        dispatch(getChats())
    },[dispatch, chatId])

    return (
        <div className='dm-container'>
            <DmBar />
            <div className='chat-container'>
                <div className='chat-part'>
                    {Object.values(dms).map(dm => {
                        return (
                            <div className='sent-message' key={dm.id}>
                                {/* <img src={}></img> */}
                                <div>{dm.content}</div>
                            </div>
                        )
                    })}  
                </div>
                <textarea className='new-message'></textarea>
            </div>
            
        </div>
    )
}

export default DmPage