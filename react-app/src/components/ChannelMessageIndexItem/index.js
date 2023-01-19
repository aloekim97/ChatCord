import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchChannels } from "../../store/channel";
import { getOneServerThunk } from "../../store/server";
import { loadMsg } from "../../store/channelMsg";
import './index.css';
// import { io } from 'socket.io-client';

// let socket;

function MessageIndex({message}){

    const dispatch = useDispatch()
    const { user } = message
    const [messages, setMessages] = useState([])
    
    
    // useEffect(() => {
    //     socket = io();
    //     socket.on("chat", (chat) => {
    //         setMessages(messages => [...messages, chat])
    //     })
    //     return (() => {
    //         socket.disconnect()
    //     })
    // }, [])

    return (
        <div className="message-content">
            <img className="profile-pic" src={user.profileImg}>
            </img>
            <div className="message-content-container">
                <div className="message-profile-name">
                    <div>
                        {user.username}
                    </div>
                    <div>
                        {message.createdAt}
                    </div>
                </div>
                <div className="message-data">
                    {message.message}
                </div>
            </div>
        </div>
    )
}

export default MessageIndex
