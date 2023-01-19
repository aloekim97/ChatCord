import { useState } from 'react';
import './index.css';
import ServerNameCard from '../ServerIndexItem/serverhovercard';
function MembersDisplay({member, server}){
    const [isHover, setIsHover] = useState(false);
    const toggleIsHover = () => {
        setIsHover(!isHover);
    };


    return(
        <div className="member-index-container" onMouseEnter={toggleIsHover}
        onMouseLeave={toggleIsHover}>
            <img className="profile-pic" src={member.profileImg}></img>
            <div className='member-username-container'>
                {member.username}
                <div className='member-status'>Grinding</div>
            </div>
            <div className="server-popout-card">{isHover? <ServerNameCard server={server} /> : <></>}</div>
        </div>
    )
}

export default MembersDisplay
