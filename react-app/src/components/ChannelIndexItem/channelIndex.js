import './index.css';
import OpenModalMenuItem from "../OpenModalButton";
import EditModal from '../EditModal';
import { NavLink } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";


function ChannelDisplay({channel, isEdit, serverId, serverObj}){

    // console.log('we got to the display component')
    return(
        <NavLink key={channel.id} to={`/servers/${serverId}/${channel.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <li className=''>
                <div className="channel-border">
                    <div className='channel-icon-border'>
                        <i class="fa-solid fa-hashtag"></i>
                    </div>
                    <div className='channel-label'  key={channel.id}>
                        {channel.name}
                    </div>
                    <button className='channel-edit-button'>
                        <OpenModalMenuItem
                                    itemText={<i class="fa-solid fa-gear"></i>}
                                    modalComponent={<EditModal serverObj={serverObj} isEdit={isEdit} channel={channel} channelId={channel.id} />}
                        />
                    </button>
                </div>
            </li>
        </NavLink>
    )

}

export default ChannelDisplay
