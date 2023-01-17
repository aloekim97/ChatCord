import './index.css';

function ChannelDisplay({channel}){
    console.log('we got to the display component')
    return(
        <div className="channel-border">
            <img className='channel-img' src='https://media.istockphoto.com/id/1142196147/vector/hand-drawn-brush-stroke-dirty-art-hashtag-symbol-icon-sign-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=6shSWSHv6t1Lh0tSvJmI7Y8ghkwTSDzeOnMoY-UCBmM='></img>
            <div className='channel-label'  key={channel.id}>
                {channel.name}
            </div>
        </div>
    )

}

export default ChannelDisplay
