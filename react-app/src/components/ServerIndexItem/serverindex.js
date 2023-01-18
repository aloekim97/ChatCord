import { NavLink } from "react-router-dom";
function ServerIndex({server}){
    console.log(server.channels)
    const firstChan = server.channels[0]
    if (!firstChan){
        return null
    }
    console.log(firstChan)
    return (
        <NavLink key={server.id} to={`/servers/${server.id}/${firstChan.id}`}>
              <div className="server-img-container" key={server.id}>
                <img
                  className="server-img"
                  src={server.serverImg}
                  alt="server img"
                ></img>
              </div>
            </NavLink>
    )
}

export default ServerIndex
