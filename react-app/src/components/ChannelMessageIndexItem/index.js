import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchChannels } from "../../store/channel";
import { getOneServerThunk } from "../../store/server";
import { loadMsg, loadMsgThunk } from "../../store/channelMsg";
import './index.css';


function MessageIndex({messag, userObj, deleteMsg}){
    const [isHover, setIsHover] = useState(false)
    const buttonTheme = isHover ? "delete-dm2" : "delete-dm"
    console.log(messag)
    return (
        <div className="message-content"
        onMouseEnter={() => setIsHover(!isHover)} 
        onMouseLeave={() => setIsHover(!isHover)}>
            <img className="message-profile-pic" src={userObj.profileImg}>
            </img>
            <div className="message-content-container">
                <div className="message-profile-name">
                    <h3 className="message-content-name">
                        {messag.user.username}
                    </h3>
                    <div className="message-content-date">
                        {messag.createdAt}
                    </div>
                </div>
                <div className="message-data">
                    {messag.message}
                </div>
            </div>
            {userObj.id === messag.user.id && (
                <div className="buttoon">
                     <button className={buttonTheme} onClick={() => deleteMsg(messag.id)}><i class="fa-solid fa-trash-can"></i>Delete Message
                </button>
                </div>
               
            )}
        </div>
    )
}

export default MessageIndex
