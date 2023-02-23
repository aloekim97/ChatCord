import DmBar from '../Message/allDms'
import './me.css'
import ComingSoon from '../ComingSoonComponent'
import { useDispatch, useSelector } from 'react-redux'
import noFriends from "../../assets/message-requests-img.png"

import MessageRequest from '../MessageRequestPage'
import { useEffect, useState } from 'react'
import { NavLink, Redirect } from 'react-router-dom'

function MainPage() {
    const dispatch = useDispatch()
    const [users, setUsers] = useState([]);
    const [roomId, setRoomId] = useState(0)

    useEffect(() => {
      async function fetchData() {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
      }
      fetchData();
    }, []);
  
    const getId = async (userId, e)=> {
        e.preventDefault()
        const rooms = await fetch('/api/dm')
        const roomsData = await rooms.json()
        const chatArr = roomsData.chats
        console.log(chatArr)
        for (let i = 0; i < chatArr.length - 1; i++) {
            if(chatArr[i].receiveUser.id === userId || chatArr[i].sendUser.id === userId) {
                console.log(chatArr[i].id)
                {<Redirect to={`/@me/${chatArr[i].id}`} />}
            }                              
        }
    }
   

    const userComponents = users.map((user) => {
      return (
        <div key={user.id}>
            <div className='friend-msg'>
                <div>{user.username}</div>
                <button className='send-msg-link' onClick={async (e) => getId(user.id, e)}>Message</button>
            </div>

        </div>
      );
    });

    return(
        <div className="message-request-page">
            <DmBar />
            <div className="friend-request-container">
                <h1 className="message-request-title"><i class="fa-solid fa-user-group"></i> Friends</h1>
                <div className="nof-img-container">
                    <div>{userComponents}</div>
                    {/* <div className='activeU'>
                        <div className='ative'>Active Now</div>
                        <div className='loner'>You have no friends</div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default MainPage
