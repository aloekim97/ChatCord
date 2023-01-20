import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServersThunk, updateServer, getOneServerThunk } from "../../store/server";
import { useModal } from "../../context/Modal";
import "./index.css";

function NewEditServerModal({ serverId }) {
  const dispatch = useDispatch();
  const server = useSelector((state) => state.server.allServers[serverId])
  const [name, setName] = useState(server?.name);
  const [server_img, setServer_Img] = useState(server?.serverImg);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const id = serverId;

  useEffect(() => {
    let newErrors = [];

    if (name.length < 1)
      newErrors.push("Server name must be at least 1 character");
    else if (name.length > 30)
      newErrors.push("Server name must be less than 30 characters");

    if (server_img.length < 5) newErrors.push("Please input valid image url");

    setErrors(newErrors);
  }, [name, server_img]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverData = {
      name,
      server_img,
      id,
    };

    await dispatch(updateServer(serverData));
    await dispatch(getAllServersThunk());
    await dispatch(getOneServerThunk(serverId))

    closeModal();
  };

  return (
    <div className="edit-server-modal">
        <div className="create-server-top-container">
          <h1 className="create-server-h1">Edit your server</h1>
          <div className="description-container">
            <div className="create-server-descript">
              Ready for a change? Give your server a fresh new name
            </div>
            <div className="create-server-descript">
              and image! You can always change it later.
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
              onChange={(e) => setServer_Img(e.target.value)}
              required
              className="create-server-modal-input"
            />
          </label>

          <div className="edit-footer-background">
            <div className="create-server-footer">
              <div className="create-server-cancel" onClick={closeModal}>
                Cancel
              </div>
              <button className="create-server-btn" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
  );
}

export default NewEditServerModal;
