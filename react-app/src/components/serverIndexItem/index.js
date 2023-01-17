import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServersThunk } from "../../store/server";
import "./index.css";

function ServerPage() {
  const dispatch = useDispatch();
  const serverObject = useSelector((state) => state.servers.allServers);

  useEffect(() => {
    dispatch(getAllServersThunk());
  }, [dispatch]);

  const serversArr = Object.values(serverObject);

  return (
    <div className="server-page-container">
      <div className="left-side-servers">
        <div className="server-title">ChatCord</div>
        <div className="serverList">
          {serversArr.map((server) => (
            <div key={server.id}>
              <img
                className="server-img"
                src={server.serverImg}
                alt="server img"
              ></img>
            </div>
          ))}
        </div>
      </div>
      <div className="left-side-channels"> channels info </div>
    </div>
  );
}

export default ServerPage;
