import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./index.css";
import {
  addServer,
  getAllServersThunk,
  getOneServerThunk,
} from "../../store/server";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { addChannel, loadChannel, loadChannels } from "../../store/channel";

function CreateServerModal({ user }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(`${user}'s server`);
  const [server_img, setServer_img] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  useEffect(() => {
    let newErrors = [];

    if (name.length < 1)
      newErrors.push("Server name must be at least 1 character");
    else if (name.length > 30)
      newErrors.push("Server name must be less than 30 characters");

    if (server_img.length < 5) newErrors.push("Please input valid image url");

    setErrors(newErrors);
  }, [name, server_img]);

  useEffect(() => {
    dispatch(getAllServersThunk());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setErrors([]);

    const newServer = {
      name,
      server_img,
    };

    const body = await dispatch(addServer(newServer));
    console.log("yo about to hit the push", body);
    dispatch(addChannel(body.server.channels[0]));
    dispatch(loadChannel(body.server.channels[0]));
    dispatch(loadChannels(body.server.channels));

    history.push(`/servers/${body.server.id}/${body.server.channels[0].id}`);
    closeModal();
  };

  return (
    <>
      <div className="create-server-modal">
        <div className="create-server-top-container">
          <h1 className="create-server-h1">Customize your server</h1>
          <div className="description-container">
            <div className="create-server-descript">
              Give your new server a personality with a name and an
            </div>
            <div className="create-server-descript">
              icon. You can always change it later.
            </div>
          </div>
        </div>

        <form className="create-server-form" onSubmit={handleSubmit}>
          <ul className="create-server-error-container">
            {errors.map((error, idx) => (
              <li className="server-modal-errors" key={idx}>
                {error}
              </li>
            ))}
          </ul>

          <label className="server-modal-label">
            SERVER NAME
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="create-server-modal-input"
            />
          </label>

          <label className="server-modal-label">
            SERVER IMAGE URL
            <input
              type="text"
              value={server_img}
              onChange={(e) => setServer_img(e.target.value)}
              required
              className="create-server-modal-input"
            />
          </label>

          <div className="server-disclaimer">
            <div className="disclaim agreement">
              By creating a server, you agree to ChatCord's
            </div>
            <div className="guidelines agreement">Community Guidelines</div>
          </div>
          <div className="footer-background">
            <div className="create-server-footer">
              <div className="create-server-cancel" onClick={closeModal}>
                Cancel
              </div>
              <button className="create-server-btn" type="submit">
                Create
              </button>
            </div>
          </div>
        </form>
        <div className="background-grey"></div>
      </div>
    </>
  );
}

export default CreateServerModal;
