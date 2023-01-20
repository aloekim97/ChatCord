import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMessageThunk, editMessageThunk, loadTheDmsThunk, sendMessageThunk } from '../../store/directMsg'
import { getChats } from '../../store/chats'
import { useParams } from "react-router-dom"
import './allDms.css'
import DmBar from './allDms'
import dmReducer from '../../store/directMsg'
import {io} from 'socket.io-client'

let socket;

function DmPage(){
    const dispatch = useDispatch()
    const {chatId} = useParams()
    const dms = useSelector(state => state.dmReducer.chatDetails)
    const [content, setContent] = useState('')
    const [senderId, setSenderId] = useState()
    const [dmId, setDmId] = useState()
    const [newM, setNewM] = useState('')
    const user = useSelector(state => state.session.user)
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");

    useEffect(() => {
        dispatch(loadTheDmsThunk(chatId))
    }, [dispatch, chatId])

    useEffect(() => {
        socket = io();
        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
            dispatch(loadTheDmsThunk(chatId))
        })
        return (() => {
            socket.disconnect()
        })
    }, [])
    


    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };
    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", {
            chat_id: chatId, 
            sender_id: user.id, 
            content: chatInput });
        setChatInput("")
    }

    useEffect(() => {
        const func = async () => {
          setMessages([])

            await dispatch(loadTheDmsThunk(chatId))


          }
    })
    
    
    
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
    
    // const updateMessage = async (e) => {
    //     e.preventDefault()

    //     const data = {
    //         newM
    //     }
    //     await dispatch(editMessageThunk(chatId, dmId, data, senderId))
    //     await dispatch(loadTheDmsThunk(chatId))
    // }
    // console.log(dmId)
    // console.log(senderId)

    const deleteDm = (messageId)

    
    
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
                                <div className='edit/del'> 
                                <button className='edit' onClick={function() {setDmId(dm.id); setSenderId(dm.sender_id)}}>Edit </button>
                                    <button className='del' onClick={async (e) => {
                                        e.preventDefault()
                                        await dispatch(deleteMessageThunk(chatId, dm.id))
                                        await dispatch(loadTheDmsThunk(chatId))
                                    }}>Delete</button>                       
                                </div>
                                <form className='edit-box'>
                                    {dm.id === dmId ? (
                                        <input className='text-here' onSubmit={sendChat}
                                            value={chatInput}
                                            onChange={updateChatInput}
                                            placeholder={dm.content}
                                        />) : null}                                          
                                    </form>                                
                            </div>
                        )
                    })}  
                    </div>
                    {/* <form onSubmit={onSub}>
                        <input className='text-box'
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        />
                    </form> */}
                    <form onSubmit={sendChat}>
                         <input
                            value={chatInput}
                            onChange={updateChatInput}
                        />
                         <button type="submit">Send</button>
                     </form>
                </div>
                
        </div>
        // <div>
        //     <div> 
        //         {messages.map((message, ind) => (
        //             <div key={ind}>{`${message.user}: ${message.content}`}</div>
        //         ))}
        //     </div>
        // </div>
    )
}

export default DmPage

{/* <button className='del/edit' onClick={async (e) => {
                                    e.preventDefault()
                                    await dispatch(deleteMessageThunk(chatId, dm.id))
                                    await dispatch(loadTheDmsThunk(chatId))
                                }}>...</button> */}
 {/* <button className='edit' onClick={showText}>
                                        {text ? (<input 
                                            type='text'
                                            value={newMessage}
                                            onChange={e => setNewMessage(e.target.value)}
                                            placeholder={dm.content}
                                        />) : 'Edit'}
                                    </button>
                                    <button className='del' onClick={async (e) => {
                                        e.preventDefault()
                                        await dispatch(deleteMessageThunk(chatId, dm.id))
                                        await dispatch(loadTheDmsThunk(chatId))
                                    }}>Delete</button>              */}          