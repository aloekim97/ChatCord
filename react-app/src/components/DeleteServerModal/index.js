import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteServerThunk, getAllServersThunk } from "../../store/server";
import { deleteChanel } from "../../store/channel";
import { getChats, loadChats } from "../../store/chats";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

function DeleteServerModal({ serverId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const server = useSelector((state) => state.server.allServers);
  const channel = useSelector((state) => state.channel);
  const chats = useSelector((state) => state.chats);

  console.log("chats ? ", chats);

  const handleDelete = async (e) => {
    e.preventDefault();

    await dispatch(deleteServerThunk(serverId));
    await dispatch(deleteChanel(channel));
    await dispatch(getAllServersThunk());

    closeModal();

    await dispatch(loadChats(chats));
  };

  return (
    <div>
      <form onSubmit={handleDelete}>
        <label>Are you sure you want to delete the server?</label>
        <button type="submit">Delete Server</button>
        <button type="button" onClick={closeModal}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default DeleteServerModal;
