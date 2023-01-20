import './index.css';
import LogoutButton from '../auth/LogoutButton';
import { useHistory } from 'react-router';

function ProfileCard({user}){
    const history = useHistory();

    return(
        <div className="profile-card-container">
            <img className='profile-card-img' src={user.profileImg}></img>
            <div className='profile-card-banner'>
            </div>
            <div className='profile-card-info-container'>
                <div className='profile-card-info'>
                    {`${user.username}#00${user.id}`}
                </div>
                <div className='profile-card-status'>
                    Grinding
                </div>
                <div className='profile-card-member-date'>
                    CHATCORD MEMBER SINCE
                    <div className='profile-card-member-date2'>Jan 1, 2020</div>
                </div>
            </div>
            <div className='profile-logout-container'>
                <button className='profile-logout-button'
                    onClick={() => {
                    <LogoutButton />;
                    history.push("/");
                    }}
                >
                    Log out
                </button>
            </div>
        </div>
    )

}

export default ProfileCard
