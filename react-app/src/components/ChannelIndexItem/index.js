import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchChannels } from "../../store/channel";
import './index.css';
import ChannelDisplay from "./channelIndex";

function ChannelIndex(){

    const dispatch = useDispatch();
    const channelsObj = useSelector(state => state.channel)
    const {serverId} = useParams()

    useEffect(() => {
        dispatch(fetchChannels(serverId));
    }, [dispatch]);

    if (Object.keys(channelsObj).length < 1){
        return null
    }

    const channels = Object.values(channelsObj.server)
    console.log('the channels in the component',channels)
    return(
        <div className="page-container">
            <div className="channels-container">
                <div>
                    Server Name
                </div>
                <div>
                    {
                        channels.map(channel => (
                            <ChannelDisplay channel={channel}/>
                        ))
                    }
                </div>
            </div>
            <div className="messages-container">

            </div>
            <div className="members-container">

            </div>
        </div>
    )
}


export default ChannelIndex
