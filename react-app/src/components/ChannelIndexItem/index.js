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

function ChannelIndex(){

    const dispatch = useDispatch();
    const channelsObj = useSelector(state => state.channel)
    const serverObj = useSelector(state => state.server.singleServer)
    const {serverId} = useParams()
    const [showMenu, setShowMenu] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const ulRef = useRef();

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    console.log('we are in thesesese components')

    useEffect(() => {
        dispatch(fetchChannels(serverId));
        dispatch(getOneServerThunk(serverId))
    }, [dispatch, serverId]);

    const closeMenu = () => setShowMenu(false);


    if (Object.keys(channelsObj).length < 1){
        return null
    }

    console.log('this is state', showMenu)
    console.log('this is the server', serverObj)

    const channels = Object.values(channelsObj.server)
    const members = serverObj.members
    console.log('the channels in the component',channels)
    console.log('the members',members)
    const ulClassName = (showMenu ? 'channel-droplist' : 'channel-droplist2');
    return(
        <div className="page-container">
            <div className="server-name-container">
                <div className="server-name-section">
                    Server Name
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

                </div>

                <>
                    <div className="channel-buttons">
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
                    <ul className={ulClassName}>
                        <>
                            {
                                channels.map(channel => (
                                    <ChannelDisplay channel={channel} isEdit={isEdit}/>
                                ))
                            }
                        </>
                    </ul>
                </>
            </div>
            <div className="messages-container">

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
