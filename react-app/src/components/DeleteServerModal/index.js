import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteServerThunk, getAllServersThunk, getOneServerThunk } from "../../store/server";
import { deleteChanel } from "../../store/channel";
import { getChats, loadChats } from "../../store/chats";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./index.css";

function DeleteServerModal({ serverId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [input, setInput] = useState("");
  const history = useHistory();
  const allServersAvail = useSelector((state) => state.server.allServers)

  let serverName;

  if (!allServersAvail[serverId]) {
    serverName = null
  } else {
    serverName = allServersAvail[serverId].name
  }

  const channel = useSelector((state) => state.channel);
  const chats = useSelector((state) => state.chats);
  let confirmation = `Confirm delete of ${serverName}`;

  console.log("servername?????", serverName);

  console.log("chats ? ", chats);

  const handleDelete = async (e) => {
    e.preventDefault();

    await dispatch(deleteServerThunk(serverId));
    await dispatch(deleteChanel(channel));
    await dispatch(getAllServersThunk());

    closeModal();

    history.push("/@me");
  };

  if (!serverName) return null

  return (
    <div className="delete-server-modal">
      <div className="create-server-top-container">
        <h1 className="create-server-h1">Delete your server</h1>
        <div className="description-container">
          <div className="create-server-descript">
            All good things must come to an end. Remember this
          </div>
          <div className="create-server-descript">
            change cannot be undone!
          </div>
        </div>
      </div>
      <form className="create-server-form" onSubmit={handleDelete}>
        <label className="server-modal-label">
          To confirm please type: "Confirm delete of {serverName}"
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
            className="create-server-modal-input confirm-del-statement"
          />
        </label>
        <div className="delete-footer-background">
          <div className="create-server-footer">
            <div className="create-server-cancel" onClick={closeModal}>
              Cancel
            </div>
            {confirmation === input && (
              <button className="create-server-btn" type="submit">
                Delete
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default DeleteServerModal;
