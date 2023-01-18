import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchChannels } from "../../store/channel";
import { getOneServerThunk } from "../../store/server";
import './index.css';



function MessageIndex({message}){

    const { user } = message

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
