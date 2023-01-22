import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchChannels } from "../../store/channel";
import { getOneServerThunk } from "../../store/server";
import { loadMsg, loadMsgThunk } from "../../store/channelMsg";
import './index.css';


function MessageIndex({messag, userObj, deleteMsg}){

    return (
        <div className="message-content">
            <img className="message-profile-pic" src={userObj.profileImg}>
            </img>
            <div className="message-content-container">
                <div className="message-profile-name">
                    <h3 className="message-content-name">
                        {userObj.username}
                    </h3>
                    <div className="message-content-date">
                        {messag.createdAt}
                    </div>
                </div>
                <div className="message-data">
                    {messag.message}
                </div>
            </div>
            <button onClick={() => deleteMsg(messag.id)}>
                DELETE
            </button>
        </div>
    )
}

export default MessageIndex
