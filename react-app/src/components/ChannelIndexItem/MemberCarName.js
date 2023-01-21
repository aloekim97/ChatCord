import { useHistory } from "react-router";
import LogoutButton from "../auth/LogoutButton";


function MemberNameCard({member}){
    const history = useHistory();
    return (
        <div className="member-cardname-container" >
            <div className="member-card-container">
                <img className='member-profile-card-img' src="https://pnggrid.com/wp-content/uploads/2021/05/Discord-Logo-Circle-1024x1024.png" alt="img"></img>
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
