import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMessageThunk,
  editMessageThunk,
  loadTheDmsThunk,
  sendMessageThunk,
} from "../../store/directMsg";
import { getChats } from "../../store/chats";
import { useParams } from "react-router-dom";
import "./allDms.css";
import DmBar from "./allDms";
import dmReducer from "../../store/directMsg";
import { getDmSearch } from "../../store/search";
import { io } from "socket.io-client";
import DmBox from "./dmBox";
let socket;

export default function DmPage() {
  const dispatch = useDispatch();
  const { chatId } = useParams();
  const dms = useSelector((state) => state.dm.chatDetails);
  const [content, setContent] = useState("");
  const [senderId, setSenderId] = useState();
  const user = useSelector((state) => state.session.user);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [search, setSearch] = useState("");
  console.log(dms)

  useEffect(() => {
    dispatch(loadTheDmsThunk(chatId));
  }, [dispatch, chatId]);

  useEffect(() => {
    socket = io();
    socket.on("chat", (chat) => {
      dispatch(loadTheDmsThunk(parseInt(chat.chat_id)))
        setMessages((messages) => [...messages, chat])
    });
    socket.on("delete", (chat) => {
        setMessages((messages) => [...messages, chat])
        dispatch(loadTheDmsThunk(chatId))
    })
    return () => {
      socket.disconnect();
    };
  }, []);


  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    // setErrors([]);
    const body = await dispatch(getDmSearch(chatId, search));
    // setIsSearch(true)
    console.log("it submitted the message");
  };

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };
  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", {
      chat_id: chatId,
      sender_id: user.id,
      content: chatInput,
    });
    setChatInput("");
  };
  // console.log(chatId, user.id)

  // useEffect(() => {
  //   const func = async () => {
  //     setMessages([]);

  //     await dispatch(loadTheDmsThunk(chatId));
  //   };
  // });

//   const onSub = async (e) => {
//     e.preventDefault();

//     const input = {
//       content,
//     };
//     await dispatch(sendMessageThunk(chatId, input)).then(() => {
//       setContent("");
//     });
//     await dispatch(loadTheDmsThunk(chatId));
//   };

  const updateMessage = async (e) => {
    e.preventDefault();
  };

  //     const data = {
  //         newM
  //     }
  //     await dispatch(editMessageThunk(chatId, dmId, data, senderId))
  //     await dispatch(loadTheDmsThunk(chatId))
  // }
  // console.log(dmId)
  // console.log(senderId)

  const deleteDm = (dmId) => {
    socket.emit("delete", {msg_id: dmId })
  } 
//   const butt = document.getElementsByClassName("del")
//   const clickButt = deleteDm(setDelId(this.id))

  
  return (
    <div className="dm-container">
      <DmBar />
      <div className="chat-container">
        <div className="chat-text">
                  <div className="chat-part">
          {Object.values(dms).map((dm) => (
            <DmBox 
            key={dm.id}
            dm={dm}
            deleteDm={deleteDm}
            user={user}
            /> 
            ))}
          </div>
            <div>
              <form onSubmit={sendChat} className="lets-chat">
                <input value={chatInput} onChange={updateChatInput} />
              </form>
          </div>
        </div>
        <div className="search-portion">
          <form className="search-form" onSubmit={handleSearchSubmit}>
            <label className="search-label">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
                placeholder="Search"
              />
            </label>
          </form> 
        </div>
      </div>
    </div>
 ) 
}

      

