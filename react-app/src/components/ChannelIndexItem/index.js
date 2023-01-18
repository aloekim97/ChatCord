import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchChannels } from "../../store/channel";
import { getOneServerThunk } from "../../store/server";
import './index.css';
import ChannelDisplay from "./channelIndex";
import MembersDisplay from "./MembersIndex";
import OpenModalMenuItem from "../OpenModalButton";
import CreateChannelModal from "../CreateChannelsForm";
import { getAllServersThunk } from "../../store/server";
import EditServerModal from "../EditServerModal";

function ChannelIndex(){

    const dispatch = useDispatch();
    const channelsObj = useSelector(state => state.channel)
    const serverObj = useSelector(state => state.server.singleServer)
    const userObj = useSelector(state => state.session.user)
    const {serverId} = useParams()
    const [showMenu, setShowMenu] = useState(false);
    // const [members, setMembers] = useState([]);
    const [isEdit, setIsEdit] = useState(false)
    const ulRef = useRef();

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    console.log('we are in thesesese components')

    useEffect(() => {
        dispatch(fetchChannels(serverId));
        // dispatch(getAllServersThunk())
        dispatch(getOneServerThunk(serverId))
        // setMembers(serverObj.members)
    }, [dispatch, serverId]);

    const closeMenu = () => setShowMenu(false);


    if (Object.keys(channelsObj).length < 1 ){
        return null
    }

    console.log('this is state', showMenu)
    console.log('this is the server', serverObj)

    const channels = Object.values(channelsObj.server)
    const members = serverObj.members
    // if (serverObj && serverObj.members.length > 0)
    console.log('the channels in the component',channels)
    console.log('the members',members)
    const ulClassName = (showMenu ? 'channel-droplist' : 'channel-droplist2');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors([]);
        console.log('it submitted the message')

        // closeModal()
    }



    return(
        <div className="page-container">
            <div className="server-name-container">
                <div className="server-name-section">
                    {serverObj.name}
                    <i class="fa-solid fa-sort-down"></i>
                </div>
                <div className="server-navbar">
                    <div className="navbar-channel-name-icon">
                        <i class="fa-solid fa-hashtag"></i>
                        Channel Name
                    </div>
                    <div>
                        Search Placeholder
                    </div>
                </div>
            </div>
            <div className="channels-container">
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
                                        <ChannelDisplay channel={channel} isEdit={isEdit}/>
                                    ))
                                }
                            </>
                        </div>
                    </div>

                </div>
                <div className="channels-profile-container">
                    <div className='profile-container'>
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
                    <button className='channel-edit-button'>
                    <OpenModalMenuItem
                                itemText={<i class="fa-solid fa-gear"></i>}
                                modalComponent={<EditServerModal />}
                    />
                </button>
                </div>
            </div>
            <div className="messages-container">
                <div className="message-content">

                </div>
                <form className="create-messages-form" onSubmit={handleSubmit}>
                    <label>
                        <input
                            type="text"
                            required
                            className="create-channel-input"
                            placeholder="Message"
                        />
                </label>
                </form>
            </div>
            <div className="members-container">
                <div className="members-online-status">Online - 1</div>
                {
                    members && members.map(member => (
                        <MembersDisplay member={member} />
                    ))
                }
            </div>
        </div>
    )
}


export default ChannelIndex
