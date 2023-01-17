import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchChannels } from "../../store/channel";
import './index.css';
import ChannelDisplay from "./channelIndex";

function ChannelIndex(){

    const dispatch = useDispatch();
    const channelsObj = useSelector(state => state.channel)
    const {serverId} = useParams()
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };



    useEffect(() => {
        dispatch(fetchChannels(serverId));
    }, [dispatch]);

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
          if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);


    if (Object.keys(channelsObj).length < 1){
        return null
    }
    console.log('this is state', showMenu)

    const channels = Object.values(channelsObj.server)
    console.log('the channels in the component',channels)
    const ulClassName = (showMenu ? 'channel-droplist' : 'channel-droplist2');
    return(
        <div className="page-container">
            <div className="channels-container">
                <div>

                </div>
                <div>
                    Server Name
                </div>
                <>
                    <div className="channel-buttons">
                        <button className="channel-button-container" onClick={openMenu}>
                            {showMenu ? <i class="fa-solid fa-sort-down"></i> : <i class="fa-solid fa-caret-right"></i> }
                            TEXT CHANNELS
                        </button>
                        <button className="create-channel-button">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <ul className={ulClassName} ref={ulRef}>
                        <>
                            {
                                channels.map(channel => (
                                    <ChannelDisplay channel={channel}/>
                                ))
                            }
                        </>
                    </ul>
                </>
            </div>
            <div className="messages-container">

            </div>
            <div className="members-container">

            </div>
        </div>
    )
}


export default ChannelIndex
