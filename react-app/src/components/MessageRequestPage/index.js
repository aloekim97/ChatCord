import DmBar from "../Message/allDms";
import noFriends from "../../assets/message-requests-img.png"

import "./index.css";


function MessageRequest() {
    return (
        <div className="message-request-page">
            <DmBar />
            <div className="message-request-container">
                <h1 className="message-request-title"><i class="fa-solid fa-envelope"></i> Message Requests</h1>
                <div className="nofriend-img-container">
                    <img className="nofriends-img" src={noFriends}></img>
                </div>
            </div>
        </div>
    )
}


export default MessageRequest;
