import './index.css';

function MembersDisplay({member}){
    return(
        <div className="member-index-container">
            <img className="profile-pic" src={member.profileImg}></img>
            <div className='member-username-container'>
                {member.username}
                <div className='member-status'>Online</div>
            </div>
        </div>
    )
}

export default MembersDisplay
