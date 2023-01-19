import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import ServerNameCard from "./serverhovercard";
import { fetchChannels } from "../../store/channel";
import { getOneServerThunk } from "../../store/server";
function ServerIndex({ server }) {
  // console.log(server.channels);
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState(false);
  const firstChan = server.channels[0];
  const toggleIsHover = () => {
    setIsHover(!isHover);
  };

  useEffect(() => {
    dispatch(fetchChannels(server.id));
    dispatch(getOneServerThunk(server.id))
  }, [dispatch])


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
