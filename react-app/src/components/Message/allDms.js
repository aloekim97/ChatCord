import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChats } from "../../store/chats";
import { NavLink } from "react-router-dom";
import "./allDms.css";

function DmBar() {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats);
  

  useEffect(() => {
    dispatch(getChats());
  }, [dispatch]);

  return (
    <div className="bar-next-to-servers">
      <div className="butt-container">
        <NavLink className="user-links" to={"/@me"}>
          <div className="extra-links-container">
            <i class="fa-solid fa-users exta-icons"></i>
            <button className="butt">Friends</button>
          </div>
        </NavLink>
        <NavLink className="user-links" to={"/coming-soon"}>
          <div className="extra-links-container">
          <i class="fa-solid fa-list-check exta-icons"></i>
            <button className="butt">Coming Soon</button>
          </div>
        </NavLink>
        <NavLink className="user-links" to={"/@me"}>
          <div className="extra-links-container">
            <i class="fa-solid fa-comment exta-icons"></i>
            <button className="butt">Message Requests</button>
          </div>
        </NavLink>
      </div>

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
              <img className="dm-img" src={chat.receiveUser.profileImg} />
              <div className="chat-username">{chat.receiveUser.username}</div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default DmBar;
