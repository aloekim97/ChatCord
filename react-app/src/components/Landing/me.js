import DmBar from '../Message/allDms'
import './me.css'
import ComingSoon from '../ComingSoonComponent'
import { useDispatch, useSelector } from 'react-redux'
import noFriends from "../../assets/message-requests-img.png"

import MessageRequest from '../MessageRequestPage'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getChats, newChat } from '../../store/chats'

function MainPage() {
    const dispatch = useDispatch()
    const [users, setUsers] = useState([]);
    const [roomId, setRoomId] = useState(0)
    const rooms = useSelector(state => state.chats)
    const history = useHistory()
    const me = useSelector(state => state.session.user.id)
    const chats = useSelector(state => state.chats)
    const newMade = Object.values(chats).sort().reverse()[0]?.id + 1
    

    useEffect(() => {
      async function fetchData() {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        const uList = responseData.users.filter(name => name.id !== me)
        setUsers(uList);
      }
      fetchData();
    }, []);

  
    const getId = async (userId, e)=> {
        e.preventDefault()
        
        const userRooms= Object.values(rooms).filter(room => room.receiver_id === userId || room.sender_id === userId)[0]
        if (userRooms) {
            history.push(`/@me/${userRooms.id}`) 
        } else {
            const info = {
                sender_id: me,
                receiver_id: userId
            }
            await dispatch(newChat(info))
            await dispatch(getChats())
            history.push(`/@me/${newMade}`)
        }
    }

    
   

    const userComponents = users.map((user) => {
      return (
        <div key={user.id}>
            <div className='friend-msg'>
                <div>{user.username}</div>
                <button className='send-msg-link' onClick={async (e) => getId(user.id, e)}><i class="fa-regular fa-envelope"></i></button>
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
