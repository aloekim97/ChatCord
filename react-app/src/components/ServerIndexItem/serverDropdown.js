import "./index.css";
import OpenModalMenuItem from "../OpenModalButton";
import CreateChannelModal from "../CreateChannelsForm";
import EditModal from "../EditModal";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteServerThunk } from "../../store/server";
import { useHistory } from "react-router-dom";
import NewEditServerModal from "../newEditServerModal";

function ServerDropdown({ server, channelId, channel }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user.id);
  const serverId = useSelector((state) => state.server.singleServer.id);

  const serverOwner = useSelector(
    (state) => state.server.singleServer.owner.id
  );
  // console.log("serverowner id", serverOwner);

//   const handleDelete = async (e) => {
//     e.preventDefault();
//     dispatch(deleteServerThunk(serverId));
//     history.push("/@me");
//   };

  return (
    <div className="server-dropdown-container">
      <div style={{ width: "100%" }}>
        {user === serverOwner && (
          <button className="server-drop-button">

              <OpenModalMenuItem
                itemText="Edit Server"
                modalComponent={<NewEditServerModal serverId={server.id} />}
              />

            </button>
        )}
        <button className="server-drop-button">
          <OpenModalMenuItem
            itemText="Create Channel"
            modalComponent={<CreateChannelModal serverId={server.id} />}
          />
        </button>
        <button className="server-drop-button">
          <OpenModalMenuItem
            itemText="Edit Channel"
            modalComponent={
              <EditModal
                serverObj={server}
                channel={channel}
                channelId={channel.id}
              />
            }
          />
        </button>
      </div>
      <div className="dropdown-delete-button-container">
        {user === serverOwner && (
          <button className="server-drop-button" >
            Delete Server
          </button>
        )}
      </div>
    </div>
  );
}

export default ServerDropdown;
