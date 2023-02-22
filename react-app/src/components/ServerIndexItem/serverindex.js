import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import ServerNameCard from "./serverhovercard";
import { fetchChannels } from "../../store/channel";
import defaultImg from "../../assets/discord-default.png"
import "./index.css";

function ServerIndex({ server }) {
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState(false);
  const firstChan = server.channels[0];
  const toggleIsHover = () => {
    setIsHover(!isHover);
  };

  function addDefaultSrc(e) {
    e.target.src = defaultImg;
  }

  useEffect(() => {
    dispatch(fetchChannels(server.id));
  }, [dispatch])


  if (!firstChan) {
    return null;
  }

  return (

    <NavLink key={server.id} to={`/servers/${server.id}/${firstChan.id}`}>
      <div
        className="server-img-container"
        key={server.id}
        onMouseEnter={toggleIsHover}
        onMouseLeave={toggleIsHover}
      >
        <img
          onError={addDefaultSrc}
          className="server-img"
          src={server.serverImg}
          alt="server img"
        ></img>
        <div className="server-popout-card">{isHover? <ServerNameCard server={server} /> : <></>}</div>
      </div>
    </NavLink>

  );
}

export default ServerIndex;
