import "./index.css";
import LogoutButton from "../auth/LogoutButton";

function ProfileCard({ user }) {

  return (
    <div className="profile-card-container">
      <img className="profile-card-img"
      onError={e => { e.currentTarget.src = "https://i.imgur.com/Nf1arcX.png"}}
      src={user.profileImg} alt="img"></img>
      <div className="profile-card-banner"></div>
      <div className="profile-card-info-container">
        <div className="profile-card-info">
          {`${user.username}#00${user.id}`}
        </div>
        <div className="profile-card-status">Grinding</div>
        <div className="profile-card-member-date">
          CHATCORD MEMBER SINCE
          <div className="profile-card-member-date2">Jan 1, 2020</div>
        </div>
      </div>
      <div className="profile-logout-container">
        <LogoutButton />;
      </div>
    </div>
  );
}

export default ProfileCard;
