import { useState } from "react";
import { NavLink } from "react-router-dom";
import ServerNameCard from "./serverhovercard";

function ServerIndex({ server }) {
  // console.log(server.channels);
  const [isHover, setIsHover] = useState(false);
  const firstChan = server.channels[0];
  const toggleIsHover = () => {
    setIsHover(!isHover);
  };
  if (!firstChan) {
    return null;
  }
  // console.log(firstChan);
  return (

    <NavLink key={server.id} to={`/servers/${server.id}/${firstChan.id}`}>
      <div
        className="server-img-container"
        key={server.id}
        onMouseEnter={toggleIsHover}
        onMouseLeave={toggleIsHover}
      >
        <img
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
