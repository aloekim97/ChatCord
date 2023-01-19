import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServersThunk } from "../../store/server";
import "./index.css";
import { NavLink, useHistory } from "react-router-dom";
import ServerIndex from "./serverindex";
import OpenModalMenuItem from "../OpenModalButton";
import CreateChannelModal from "../CreateChannelsForm";
import CreateServerModal from "../CreateServerModal";
import LogoutButton from "../auth/LogoutButton";

function ServerPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const serverObject = useSelector((state) => state.server.allServers);
  const serversArr = Object.values(serverObject);
  const user = useSelector((state) => state.session);
  const userServers = useSelector((state) => state.session.user.servers);

  useEffect(() => {
    dispatch(getAllServersThunk());
  }, [dispatch]);

  let filteredServers = [];

  // loop over userServers for the id(s) of servers that the user is apart of
  // filter the allserversArr obj for servers with matching id(s) of the userServers
  for (let id of userServers) {
    serversArr.filter((server) => {
      if (server.id === id) {
        filteredServers.push(server);
      }
    });
  }

  return (
    <div className="server-page-container">
      <div className="left-side-servers">
        <div className="dm-prof-link">
          <img
            className="server-img"
            src="https://i.pinimg.com/236x/d8/00/7e/d8007e6361ddd2eea97eb17e72335570.jpg"
            alt="dm profile img"
            onClick={() => {
              return history.push("/@me");
            }}
          ></img>
        </div>
        <div className="border-container">
          <div className="border-break"></div>
        </div>
        <div className="serverList">
          <div>
            {filteredServers.map((server) => (
              <ServerIndex server={server} />
            ))}
          </div>
          <div className="server-img-container">
            <button className="server-img add-server-img" alt="add-server">
              <OpenModalMenuItem
                itemText={
                  <img
                    src="https://i.imgur.com/cbn6g5O.jpg"
                    className="add-server-img-icon"
                  ></img>
                }
                modalComponent={<CreateServerModal />}
              />
            </button>
          </div>
          <button
            onClick={() => {
              <LogoutButton />;
              history.push("/");
            }}
          >
            Log out
          </button>
        </div>
      </div>
      {/* <div className="left-side-channels"> channels info </div> */}
    </div>
  );
}

export default ServerPage;
