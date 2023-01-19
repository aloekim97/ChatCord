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


function ChannelIndex(){

    const dispatch = useDispatch();
    const {serverId, channelId} = useParams()
    // const channelsObj = useSelector(state => state.channel.server)
    const serverObj = useSelector(state => state.server.allServers[serverId])
    // const currServer = useSelector(state => state.server.singelServer)
    const currChannel = useSelector(state => state.channel.server[channelId])
    // const currChannel2 = useSelector(state => state.server.allServers[serverId].channels[channelId])
    const userObj = useSelector(state => state.session.user)
    // const channels = useSelector(state => state.server)
    const [showMenu, setShowMenu] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [dropdownOpen, setDropdownOpen] = useState(false)
    // const [members, setMembers] = useState([]);
    const [isEdit, setIsEdit] = useState(false)
    const [content, setContent] = useState('')

    const ulRef = useRef();

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
            if (!ulRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [isOpen]);

    useEffect(() => {
        if (!dropdownOpen) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [dropdownOpen]);


    useEffect(() => {
        // dispatch(getOneServerThunk(serverId))
        dispatch(getOneServerThunk(serverId))
        dispatch(fetchChannels(serverId));
        dispatch(fetchOneChannel(channelId))
        // dispatch(getAllServersThunk())
        // setMembers(serverObj.members)
    }, [dispatch, serverId, channelId]);

    // useEffect(() => {
    //     (async () => {
    //         await dispatch(fetchChannels(serverId));
    //         await dispatch(fetchOneChannel(channelId))
    //         // dispatch(getAllServersThunk())
    //         await dispatch(getOneServerThunk(serverId))
    //         // setMembers(serverObj.members)
    //     })();
    // }, [dispatch, serverId, channelId]);

    const closeMenu = () => setShowMenu(false);


    if (!serverObj ){
        return null
    }

    const toggleProfileOpen = () => {
        setIsOpen(!isOpen)
    }

    const toggleServerDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    // console.log('this is state', showMenu)
    // console.log('this is the server', serverObj)
    // console.log('hi, just checking on the channels obj', channelsObj)

    const channels = Object.values(serverObj.channels)

    // const channels = Object.values(channelsObj)
    console.log('this is server obj', serverObj)
    // const currChannel = channels[channelId-1]
    const messages = currChannel.message
    // console.log('this is the currChannel', channels)
    // console.log('this is the curr server', currServer)
    console.log('testing the channels onk', channels)
    console.log('testing curr, channel', currChannel)
    // console.log('testing curr2, channel2', currChannel2)
    const members = serverObj.members

    // if (serverObj && serverObj.members.length > 0)
    // console.log('the channels in the component',channels)
    console.log('the members',members)
    const ulClassName = (showMenu ? 'channel-droplist' : 'channel-droplist2');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors([]);
        const input = {
            content
        }
        await dispatch(createMsgThunk(channelId, input))
        .then(() => {
            setContent('')
        })
        await dispatch(fetchChannels(serverId));
        await dispatch(fetchOneChannel(channelId))
        // dispatch(getAllServersThunk())
        await dispatch(getOneServerThunk(serverId))
        // setMembers(serverObj.members)
        await dispatch(loadMsgThunk(channelId))
        // closeModal()
    }
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        // setErrors([]);
        console.log('it submitted the message')

    }


    return(
        <div className="page-container">
            <div className="server-name-container">
                <div className="server-name-section" onClick={toggleServerDropdown}>
                    <div className="server-name-icon">
                        {serverObj.name}
                        {dropdownOpen ? <i class="fa-solid fa-x"></i>: <i class="fa-solid fa-chevron-down"></i> }
                    </div>




                </div>
                <div className="server-navbar">
                    <div className="navbar-channel-name-icon">
                        <i class="fa-solid fa-hashtag"></i>
                        {currChannel.name}
                    </div>
                    <div>
                        <form className="search-form" onSubmit={handleSearchSubmit}>
                            <label className="search-label" >
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    required
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
                                {showMenu ? <i class="fa-solid fa-sort-down"></i> : <i class="fa-solid fa-caret-right"></i> }
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
                    <div className='profile-container' onClick={toggleProfileOpen} ref={ulRef}>
                        <img className="profile-pic" src={userObj.profileImg}></img>
                        <div className="profile-data-container">
                            <div>
                                {userObj.username}
                            </div>
                            <div className='member-status'>
                                Grinding
                            </div>
                        </div>
                    </div>
                    <button className='channel-edit-button2'>
                    <OpenModalMenuItem
                                itemText={<i class="fa-solid fa-gear"></i>}
                                modalComponent={<EditProfileModal />}
                    />
                </button>
                {isOpen ? <ProfileCard user={userObj} /> : <></> }
                </div>
            </div>
            <div className="messages-container">
                {/* {messages.length > 0? messages.map(message => (
                    <MessageIndex message={message} />
                )) : <div>Hello</div>} */}
                <form className="create-messages-form" onSubmit={handleSubmit}>
                    <label>
                        <input
                            type="text"
                            required
                            value={content}
                            onChange = {e => setContent(e.target.value)}
                            className="create-channel-input"
                            placeholder="Message"
                        />
                    </label>
                </form>
            </div>
            <div className="members-container">
                <div className="members-online-status">Members - {members.length}</div>
                {
                    members && members.map(member => (
                        <MembersDisplay member={member} server={serverObj} />
                    ))
                }
            </div>
        </div>
    )
}


export default ChannelIndex
