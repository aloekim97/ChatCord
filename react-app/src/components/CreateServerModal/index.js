import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./index.css";
import { addServer, getAllServersThunk, getOneServerThunk } from "../../store/server";
import { NavLink, Redirect, useHistory } from "react-router-dom";

function CreateServerModal() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [server_img, setServer_img] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();


  useEffect(() => {
    let newErrors = [];

    if (name.length < 1)
      newErrors.push("Server name must be atleast 1 character");
    else if (name.length > 30)
      newErrors.push("Server name must be less than 30 characters");

    if (server_img.length < 5) newErrors.push("Please input valid image url");

    setErrors(newErrors);
  }, [name, server_img]);

  useEffect(() => {
    dispatch(getAllServersThunk())
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setErrors([]);

    const newServer = {
      name,
      server_img,
    };

    const body = await dispatch(addServer(newServer));
    history.push(`/servers/${body.server.id}/${body.server.channels[0].id}`)

    // dispatch(getOneServerThunk(body.server.id))

    closeModal();
  };

  return (
    <>
      <div className="create-form-header">
        <h1 id="create-server-h1">Create Server</h1>
      </div>
      <form
        className="create-server-title server-modal-text"
        onSubmit={handleSubmit}
      >
        <ul>
          {errors.map((error, idx) => (
            <li className="server-modal-text" key={idx}>
              {error}
            </li>
          ))}
        </ul>

        <label className="server-modal-label server-modal-text">
          SERVER NAME
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="create-server-input"
          />
        </label>

        <label className="server-modal-label server-modal-text">
          SERVER IMAGE URL
          <input
            type="text"
            value={server_img}
            onChange={(e) => setServer_img(e.target.value)}
            required
            className="create-server-input"
          />
        </label>

        <div className="form-footer">
          <button className="cancelButton" type="button" onClick={closeModal}>
            Cancel
          </button>
          <button className="submitButton" type="submit">
            Create Server
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateServerModal;
