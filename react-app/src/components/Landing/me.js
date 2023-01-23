import DmBar from '../Message/allDms'
import './me.css'
import ComingSoon from '../ComingSoonComponent'
import { useSelector } from 'react-redux'
import noFriends from "../../assets/message-requests-img.png"

import MessageRequest from '../MessageRequestPage'

function MainPage() {
    
    return(
        <div className="message-request-page">
            <DmBar />
            <div className="friend-request-container">
                <h1 className="message-request-title"><i class="fa-solid fa-user-group"></i> Friends</h1>
                <div className="nof-img-container">
                    <img className="nofriends-img" src={noFriends}></img>
                    <div className='activeU'>
                        <div className='ative'>Active Now</div>
                        <div className='loner'>You have no friends</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage
