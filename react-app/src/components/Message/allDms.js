import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChats } from "../../store/chats";
import { NavLink } from "react-router-dom";
import OpenModalMenuItem from "../OpenModalButton";
import EditProfileModal from "../ProfileIndexItem/EditProfileComponent";
import ProfileCard from "../ProfileIndexItem/indexj";
import "./allDms.css";

function DmBar() {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats);
  const [isOpen, setIsOpen] = useState(false)
  const userObj = useSelector(state => state.session.user)

  const ulRef = useRef();

  const toggleProfileOpen = () => {
    setIsOpen(!isOpen)
}


  useEffect(() => {
    dispatch(getChats());
  }, [dispatch]);

  return (
    <div className="bar-next-to-servers">
      <div className="butt-container">
        <NavLink className="user-links" to={"/@me"}>
          <div className="extra-links-container">
            <i class="fa-solid fa-users extra-icons"></i>
            <button className="butt">Friends</button>
          </div>
        </NavLink>
        <NavLink className="user-links" to={"/coming-soon"}>
          <div className="extra-links-container">
          <i class="fa-solid fa-list-check extra-icons"></i>
            <button className="butt">Coming Soon</button>
          </div>
        </NavLink>
        <NavLink className="user-links" to={"/message-requests"}>
          <div className="extra-links-container">
            <i class="fa-solid fa-comment extra-icons"></i>
            <button className="butt">Message Requests</button>
          </div>
        </NavLink>
      </div>

      <div className="dm-space-container">
      <div className="dm">
        {" "}
        Direct Messages
        {Object.values(chats).map((chat) => {
          return (
            <NavLink
              className="single-chat"
              to={`/@me/${chat.id}`}
              key={chat.id}
            >
              <img className="dm-img" onError={e => { e.currentTarget.src = "https://i.imgur.com/Nf1arcX.png"}} src={chat.receiveUser.profileImg} />
              <div className="chat-username">{chat.receiveUser.username}</div>
            </NavLink>
          );
        })}
      </div>

      <div className="channels-profile-container">
                    <div className='profile-container me-profile-bottom' onClick={toggleProfileOpen} ref={ulRef}>
                        <img className="profile-pic dm-profile-pic" onError={e => { e.currentTarget.src = "https://i.imgur.com/Nf1arcX.png"}}src="https://pnggrid.com/wp-content/uploads/2021/05/Discord-Logo-Circle-1024x1024.png" alt="img"></img>
                        <div className="profile-data-container">
                            <div className="prof-username">
                                {userObj.username}
                            </div>
                            <div className='member-status'>
                                #00{userObj.id}
                            </div>
                        </div>
                    </div>
                    {/* <button className='channel-edit-button2'>
                    <OpenModalMenuItem
                                itemText={<i class="fa-solid fa-gear edit-gear-icon"></i>}
                                modalComponent={<EditProfileModal />}
                    />
                </button> */}
                {isOpen ? <ProfileCard user={userObj} /> : <></> }
        </div>
        </div>
    </div>
  );
}

export default DmBar;
