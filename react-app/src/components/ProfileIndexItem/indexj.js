import "./index.css";
import LogoutButton from "../auth/LogoutButton";
import { useHistory } from "react-router";

function ProfileCard({ user }) {
  const history = useHistory();

  return (
    <div className="profile-card-container">
      <img className="profile-card-img" src="https://pnggrid.com/wp-content/uploads/2021/05/Discord-Logo-Circle-1024x1024.png" alt="img"></img>
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
