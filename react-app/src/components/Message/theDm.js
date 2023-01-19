import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMessageThunk, loadTheDmsThunk, sendMessageThunk } from '../../store/directMsg'
import { getChats } from '../../store/chats'
import { useParams } from "react-router-dom"
import './allDms.css'
import DmBar from './allDms'

function DmPage({chat}){
    const dispatch = useDispatch()
    const {chatId} = useParams()
    const dms = useSelector(state => state.dmReducer.chatDetails)
    const [content, setContent] = useState('')

    const onSub = async (e) => {
        e.preventDefault()

        const input = {
            content
        }
        await dispatch(sendMessageThunk(chatId, input))
        .then(() => {
            setContent('')
        })
        await dispatch(loadTheDmsThunk(chatId))
    }

    const clickDelete = (e) => {
        e.preventDefault()
        dispatch(deleteMessageThunk)
    }

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
                                <button className='del/edit'>...</button>
                            </div>
                        )
                    })}  
                </div>
                <form onSubmit={onSub}>
                    <textarea className='text-box'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    />
                    <button className='submit' type='submit'>Submit</button>
                </form>
            </div>
            
        </div>
    )
}

export default DmPage