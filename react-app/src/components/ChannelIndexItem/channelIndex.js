import './index.css';

function ChannelDisplay({channel}){
    console.log('we got to the display component')
    return(
        <li>
            <div className="channel-border">
                <div className='channel-icon-border'>
                    <i class="fa-solid fa-hashtag"></i>
                </div>
                <div className='channel-label'  key={channel.id}>
                    {channel.name}
                </div>
                <button className='channel-edit-button'>
                    <i class="fa-solid fa-gear"></i>
                </button>
            </div>
        </li>
    )

}

export default ChannelDisplay
