import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./index.css";
import {
  addServer,
  getAllServersThunk
} from "../../store/server";
import { useHistory } from "react-router-dom";
import { addChannel, loadChannel, loadChannels } from "../../store/channel";

function CreateServerModal({ user }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(`${user}'s server`);
  const [server_img, setServer_img] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }


  useEffect(() => {
    (async () => {
      let errors = [];
      const btn = await document.getElementById("create-server-btn-id")

      if (name.length < 1) {
        errors.push("Server name must be at least 1 character");
        btn.disabled = true;
        btn.className = "errors-btn"
      } else if (name.length > 30) {
        errors.push("Server name must be less than 30 characters");
        btn.disabled = true;
        btn.className = "errors-btn"
      }

      if (!isValidUrl(server_img)) {
        errors.push("Photo image url must start with https:// or http://")
        btn.disabled = true
        btn.className = "errors-btn"
      }

      if (isValidUrl(server_img) && (name.length > 1 && name.length < 30)) {
        btn.disabled = false
        btn.className = "create-server-btn"
      }

      await setErrors(errors)
    })();
  }, [name, server_img]);

  useEffect(() => {
    dispatch(getAllServersThunk());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
              <button id="create-server-btn-id" className="create-server-btn" type="submit">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateServerModal;
