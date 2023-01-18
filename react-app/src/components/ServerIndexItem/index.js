import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServersThunk } from "../../store/server";
import "./index.css";
import { NavLink } from "react-router-dom";
import ServerIndex from "./serverindex";

function ServerPage() {
  const dispatch = useDispatch();
  const serverObject = useSelector((state) => state.server.allServers);

  useEffect(() => {
    dispatch(getAllServersThunk());
  }, [dispatch]);

  const serversArr = Object.values(serverObject);
  console.log('checking fo channels', serversArr)

  return (
    <div className="server-page-container">
      <div className="left-side-servers">
        <div className="dm-prof-link">
          <img
            className="server-img"
            src="https://i.pinimg.com/236x/d8/00/7e/d8007e6361ddd2eea97eb17e72335570.jpg"
            alt="dm profile img"
          ></img>
        </div>
        <div className="border-container">
          <div className="border-break"></div>
        </div>
        <div className="serverList">
          {serversArr.map((server) => (
            <ServerIndex server={server} />
          ))}
        </div>
      </div>
      {/* <div className="left-side-channels"> channels info </div> */}
    </div>
  );
}

export default ServerPage;
