import './index.css';
import OpenModalMenuItem from "../OpenModalButton";
import EditModal from '../EditModal';


function ChannelDisplay({channel, isEdit}){
    console.log('we got to the display component')
    return(
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
                                modalComponent={<EditModal isEdit={isEdit} channel={channel} channelId={channel.id} />}
                    />
                </button>
            </div>
        </li>
    )

}

export default ChannelDisplay
