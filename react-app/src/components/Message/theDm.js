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

let socket;

export default function DmPage() {
  const dispatch = useDispatch();
  const { chatId } = useParams();
  const dms = useSelector((state) => state.dmReducer.chatDetails);
  const [content, setContent] = useState("");
  const [senderId, setSenderId] = useState();
  const [dmId, setDmId] = useState();
  const [delId, setDelId] = useState();
  const user = useSelector((state) => state.session.user);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(loadTheDmsThunk(chatId));
  }, [dispatch, chatId]);

  useEffect(() => {
    socket = io();
    socket.on("chat", (chat) => {
      setMessages((messages) => delete messages[chat.id]);
      dispatch(loadTheDmsThunk(chatId));
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

  useEffect(() => {
    const func = async () => {
      setMessages([]);

      await dispatch(loadTheDmsThunk(chatId));
    };
  });

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

  const deleteDm = (e) => {
    socket.emit("delete", {msg_id: delId, chat_id: chatId})
  } 
  console.log(dms)

  return (
    <div className="dm-container">
      <DmBar />
      <div className="chat-container">
        <div className="chat-part">
          {Object.values(dms).map((dm) => {
            return (
              <div className="sent-message" key={dm.id}>
                {/* <img src={}></img> */}
                <div>{dm.content}</div>
                <div className="edit/del">
                  <button
                    className="edit"
                    onClick={function () {
                      setDmId(dm.id);
                      setSenderId(dm.sender_id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="del"
                    onClick={function() {deleteDm(); setDelId(dm.id)}}
                  >
                    Delete
                  </button>
                </div>
                <form className="edit-box">
                  {dm.id === dmId ? (
                    <input
                      className="text-here"
                      onSubmit={sendChat}
                      value={chatInput}
                      onChange={updateChatInput}
                      placeholder={dm.content}
                    />
                  ) : null}
                </form>
              </div>
            );
          })}
        </div>
        {/* <form onSubmit={onSub}>
                        <input className='text-box'
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        />
                    </form> */}
        <form onSubmit={sendChat}>
          <input value={chatInput} onChange={updateChatInput} />
          <button type="submit">Send</button>
        </form>
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
    // <div>
    //     <div>
    //         {messages.map((message, ind) => (
    //             <div key={ind}>{`${message.user}: ${message.content}`}</div>
    //         ))}
    //     </div>
    // </div>
  );
}
