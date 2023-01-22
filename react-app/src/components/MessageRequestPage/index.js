import DmBar from "../Message/allDms";

import "./index.css";


function MessageRequest() {
    return (
        <div className="message-request-page">
            <DmBar />
            <div className="message-request-container">
                <h1 className="message-request-title">Message Requests</h1>
                <div>
                    <img></img>
                </div>
            </div>
        </div>
    )
}


export default MessageRequest;
