import './index.css';
import OpenModalMenuItem from '../OpenModalButton';
import CreateChannelModal from '../CreateChannelsForm';
import EditModal from '../EditModal';

function ServerDropdown({server, channelId, channel}){


    return(
        <div className="server-dropdown-container">
            <div style={{"width": "100%"}}>
                <button className='server-drop-button'>Edit Settings</button>
                <button className='server-drop-button'>
                    <OpenModalMenuItem
                    itemText='Create Channel'
                                    modalComponent={<CreateChannelModal serverId={server.id}/>}
                                    />
                </button>
                <button className='server-drop-button'>
                    <OpenModalMenuItem
                        itemText='Edit Channel'
                                        modalComponent={<EditModal serverObj={server} channel={channel} channelId={channel.id}/>}
                                        />
                </button>
            </div>
            <div className='dropdown-delete-button-container'>
                <button className='server-drop-button'>Delete Server</button>
            </div>
        </div>
    )

}

export default ServerDropdown
