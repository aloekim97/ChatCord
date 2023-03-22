import { useState } from 'react';
import './index.css';
import ServerNameCard from '../ServerIndexItem/serverhovercard';
import MemberNameCard from './MemberCarName';
import { useSelector } from 'react-redux';


function MembersDisplay({member, server}){
    const [isHover, setIsHover] = useState(false);
    const {id} = server
    // const members = useSelector(state => state.server.allServers[id].members)

    // console.log('this is the membersa nnew list', members)

    const toggleIsHover = () => {
        setIsHover(!isHover);
    };


    return(
        <div className="member-index-container" onClick={toggleIsHover} >
            <img className="profile-pic" onError={e => { e.currentTarget.src = "https://i.imgur.com/Nf1arcX.png"}} src={member.profileImg} alt='img'></img>
            <div className='member-username-container'>
                {member.username}
                <div className='member-status'>Grinding</div>
            </div>
            {/* <div className="server-popout-card">{isHover? <MemberNameCard member={member} /> : <></>}</div> */}
        </div>
    )
}

export default MembersDisplay
