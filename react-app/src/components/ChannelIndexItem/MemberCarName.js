import { useHistory } from "react-router";
import LogoutButton from "../auth/LogoutButton";


function MemberNameCard({member}){
    const history = useHistory();
    console.log('what memebrer aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', member)
    return (
        <div className="member-cardname-container" >
            <div className="member-card-container">
                <img className='member-profile-card-img'
                onError={e => { e.currentTarget.src = "https://i.imgur.com/Nf1arcX.png"}}
                src={member.profileImg} alt="img"></img>
                <div className='member-card-banner'>
                </div>
                <div className='member-card-info-container'>
                    <div className="members-card-data-container">
                        <div className='member-card-info'>
                            {`${member.username}#00${member.id}`}
                        </div>
                        <div className='member-card-member-date'>
                            CHATCORD MEMBER SINCE
                            <div className='member-card-member-date2'>Jan 1, 2020</div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberNameCard
