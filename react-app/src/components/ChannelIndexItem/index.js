import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchChannels, fetchOneChannel, offLoadChannels } from "../../store/channel";
// import { getOneServerThunk } from "../../store/server";
import './index.css';
import ChannelDisplay from "./channelIndex";
import MembersDisplay from "./MembersIndex";
import OpenModalMenuItem from "../OpenModalButton";
import CreateChannelModal from "../CreateChannelsForm";
import { getAllServersThunk } from "../../store/server";
import EditServerModal from "../EditServerModal";
import MessageIndex from "../ChannelMessageIndexItem";
import ProfileCard from "../ProfileIndexItem/indexj";
import ServerDropdown from "../ServerIndexItem/serverDropdown";
import ServerProfileCard from "../ProfileIndexItem/serverProfileCard";
import { getOneServerThunk } from "../../store/server";
import { createMsgThunk, loadMsgThunk } from "../../store/channelMsg";
import EditProfileModal from "../ProfileIndexItem/EditProfileComponent";
import SearchPage from "../SearchResultsComponent";
import { getMessagesSearch } from "../../store/search";
import { io } from "socket.io-client";


let socket;

function ChannelIndex(){

    const dispatch = useDispatch();
    const {serverId, channelId} = useParams()
    // const channelsObj = useSelector(state => state.channel.server)
    const serverObj = useSelector(state => state.server.allServers[serverId])
    const chats = useSelector(state => Object.values(state.chats))
    // const currServer = useSelector(state => state.server.singelServer)
    const currChannel = useSelector(state => state.channel.server[channelId])
    // console.log(currChannel)
    const msgs = useSelector(state => state.channelMsg.channelChat)
    // const currChannel2 = useSelector(state => state.server.allServers[serverId].channels[channelId])
    const userObj = useSelector(state => state.session.user)
    // const channels = useSelector(state => state.server)
    const [showMenu, setShowMenu] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [isSearch, setIsSearch] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    // const [members, setMembers] = useState([]);
    const [isEdit, setIsEdit] = useState(false)
    const [content, setContent] = useState('')
    const [message, setMessage] = useState([]);
    const [chatInput, setChatInput] = useState("");

    const ulRef = useRef();
    const profileRef = useRef();

    useEffect(() => {
        console.log('are u the problem?')
        dispatch(loadMsgThunk(channelId))
    },[dispatch,channelId])

    useEffect(() => {
        socket = io();
        socket.on("channelMsg", (chat) => {
            const id = parseInt(chat.channel_id)
            dispatch(loadMsgThunk(id))
                setMessage((message) => [...message, chat])
        });
        socket.on("del", (chat) => {
            setMessage((message) => [...message, chat])
            dispatch(loadMsgThunk(channelId))
        })
        return () => {
            // setMessage([])
          socket.disconnect();
        };
      },[]);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const openMenu = () => {
        if (isOpen) return;
        setIsOpen(true);
    }

    const openServerMenu = () => {
        if (dropdownOpen) return;
        setDropdownOpen(true);
    }

    useEffect(() => {
        if (!isOpen) return;

        const closeMenu = (e) => {
            if (!profileRef.current?.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [isOpen]);

    useEffect(() => {
        if (!dropdownOpen) return;

        const closeMenu = (e) => {
            if (!ulRef.current?.contains(e.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [dropdownOpen]);


    // useEffect(() => {
    //     // dispatch(getOneServerThunk(serverId))
    //     dispatch(getOneServerThunk(serverId))
    //     dispatch(fetchChannels(serverId));
    //     dispatch(fetchOneChannel(channelId))
    //     // dispatch(getAllServersThunk())
    //     // setMembers(serverObj.members)
    // }, [dispatch, serverId, channelId]);

    // useEffect(() => {
    //     (async () => {
    //         await dispatch(fetchChannels(serverId));
    //         await dispatch(fetchOneChannel(channelId))
    //         // dispatch(getAllServersThunk())
    //         await dispatch(getOneServerThunk(serverId))
    //         // setMembers(serverObj.members)
    //     })();
    // }, [dispatch, serverId, channelId]);

    // const closeMenu = () => setShowMenu(false);


    if (!serverObj ){
        return null
    }

    const toggleProfileOpen = () => {
        setIsOpen(!isOpen)
    }

    const toggleServerDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const toggleSearchResults = () => {
        setIsSearch(false)
    }
    // console.log('this is state', showMenu)
    // console.log('this is the server', serverObj)
    // console.log('hi, just checking on the channels obj', channelsObj)

    const channels = Object.values(serverObj.channels)

    // const channels = Object.values(channelsObj)
    console.log('this is server obj', serverObj)
    // const currChannel = channels[channelId-1]
    // const messages = currChannel.message

    // console.log('this is the currChannel', channels)
    // console.log('this is the curr server', currServer)
    console.log('testing the channels onk', channels)
    console.log('testing curr, channel', currChannel)
    // console.log('testing curr2, channel2', currChannel2)
    const members = serverObj.members

    // if (serverObj && serverObj.members.length > 0)
    // console.log('the channels in the component',channels)
    console.log('the members',members)
    console.log('heeeeeeeeeeeeeeeeeeeeeeeeeeee', chats)
    const ulClassName = (showMenu ? 'channel-droplist' : 'channel-droplist2');

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     // setErrors([]);
    //     const input = {
    //         content
    //     }
        // await dispatch(createMsgThunk(channelId, input))
        // .then(() => {
        //     setContent('')
        // })
        // await dispatch(fetchChannels(serverId));
        // await dispatch(fetchOneChannel(channelId))
        // // dispatch(getAllServersThunk())
        // await dispatch(getOneServerThunk(serverId))
        // // setMembers(serverObj.members)
        // await dispatch(loadMsgThunk(channelId))
        // closeModal()
    // }
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        // setErrors([]);
        const body = await dispatch(getMessagesSearch(channelId, search))
        setIsSearch(true)
        console.log('it submitted the message')

    }


    const updateChatInput = (e) => {
        setChatInput(e.target.value);
    };

    const sendChat = (e) => {
    e.preventDefault();
    socket.emit("channelMsg", {
        channel_id: channelId,
        message: chatInput,
        server: serverId
    });
        setChatInput("");
    };
    const deleteMsg = (messageId) => {
        socket.emit("del", {messageId: messageId })
      }


    return(
        <div className="page-container">
            <div className="server-name-container">
                <div className="server-name-section" onClick={toggleServerDropdown}>
                    <div className="server-name-icon">
                        {serverObj.name}
                        {dropdownOpen ? <i class="fa-solid fa-x dropdown-x"></i>: <i class="fa-solid fa-chevron-down"></i> }
                    </div>




                </div>
                <div className="server-navbar">
                    <div className="navbar-channel-name-icon">
                        <i class="fa-solid fa-hashtag server-tag"></i>
                        {currChannel?.name}
                    </div>
                    <div className="search-form-container">
                        <button className="search-form-cancel-button" onClick={toggleSearchResults}><i class="fa-solid fa-x"></i></button>
                        <form className="search-form" onSubmit={handleSearchSubmit}>
                            <label className="search-label" >
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
            <div className="channels-container">
                {dropdownOpen ? <ServerDropdown server={serverObj} channelId={channelId} channel={currChannel}  /> : <></> }

                <div>
                    <div className="channel-buttons">
                        <div className="channel-buttons2">
                            <button className="channel-button-container" onClick={toggleMenu}>
                                {showMenu ? <i class="fa-solid fa-chevron-down down-arrow"></i> : <i class="fa-solid fa-angle-right"></i> }
                                TEXT CHANNELS
                            </button>
                            <button className="create-channel-button">

                                <OpenModalMenuItem
                                    itemText={<i class="fa-solid fa-plus"></i>}
                                    modalComponent={<CreateChannelModal serverId={serverObj.id}/>}
                                    />
                            </button>
                        </div>
                        <div className={ulClassName}>
                            <>
                                {
                                    channels.map(channel => (
                                        <ChannelDisplay serverObj={serverObj} channelId={channelId} serverId={serverId} channel={channel} isEdit={isEdit}/>
                                    ))
                                }
                            </>
                        </div>
                    </div>

                </div>
                <div className="channels-profile-container">
                    <div className='profile-container' onClick={toggleProfileOpen} ref={profileRef}>
                        <img className="profile-pic" src={userObj.profileImg} alt="img" onError={e => { e.currentTarget.src = "https://i.imgur.com/Nf1arcX.png"}}></img>
                        <div className="profile-data-container">
                            <div className="prof-username">
                                {userObj.username}
                            </div>
                            <div className='member-status'>
                                #00{userObj.id}
                            </div>
                        </div>
                    </div>
                    <button className='channel-edit-button2'>
                    <OpenModalMenuItem
                                itemText={<i class="fa-solid fa-gear edit-gear-icon"></i>}
                                modalComponent={<EditProfileModal />}
                    />
                </button>
                {isOpen ? <ProfileCard user={userObj} /> : <></> }
                </div>
            </div>
            <div className="messages-members-border">
                <div className="messages-container">
                    {/* <div className="channel-messages-content-container">
                        {currChannel.message.map(message => (
                            <MessageIndex message={message} channelId={channelId} />
                        ))} */}
                        <div className="channel-messages-content-container">
                        {msgs && Object.values(msgs).map((messag) => (
                            <MessageIndex
                            key={messag.id}
                            messag={messag}
                            userObj={userObj}
                            deleteMsg={deleteMsg}
                            />
                            ))}
                            </div>
                    {/* </div> */}
                    {/* {chats.length > 0? chats.map(message => (
                        <MessageIndex message={message} />
                    )) : <div>Hello</div>} */}
                    <form className="create-messages-form" onSubmit={sendChat}>
                        <label>
                            <input
                                type="text"
                                required
                                value={chatInput}
                                onChange = {updateChatInput}
                                className="create-channel-input"
                                placeholder="Message"
                            />
                        </label>
                    </form>
                </div>
                {isSearch ? <SearchPage /> : <div className="members-container">
                    <div className="members-online-status">Members - {members.length}</div>
                    {
                        members && members.map(member => (
                            <MembersDisplay member={member} server={serverObj}/>
                        ))
                    }
                </div> }


            </div>
        </div>
    )
}


export default ChannelIndex
