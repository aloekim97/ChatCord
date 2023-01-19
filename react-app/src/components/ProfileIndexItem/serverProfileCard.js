import './index.css';

function ServerProfileCard({user}){


    return(
        <div className="Server-profile-card-container">
            <img className='Server-profile-card-img' src={user.profileImg}></img>
            <div className='Server-profile-card-banner'>
            </div>
            <div className='Server-profile-card-info-container'>
                <div className='Server-profile-card-info'>
                    {`${user.username}#00${user.id}`}
                </div>
                <div className='Server-profile-card-status'>
                    Grinding
                </div>
                <div className='Server-profile-card-member-date'>
                    CHATCORD MEMBER SINCE
                    <div className='Server-profile-card-member-date2'>Jan 1, 2020</div>
                </div>
            </div>

        </div>
    )

}

export default ServerProfileCard
