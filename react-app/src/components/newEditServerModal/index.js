import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServersThunk, updateServer, getOneServerThunk } from "../../store/server";
import { useModal } from "../../context/Modal";

function NewEditServerModal({ serverId }) {
  const dispatch = useDispatch();
  const server = useSelector((state) => state.server.singleServer)
  const [name, setName] = useState(server?.name);
  const [server_img, setServer_Img] = useState("");
  const [errors, setErrors] = useState([]);
  const id = serverId;

  const { closeModal } = useModal();

  const validations = () => {
    const errors = [];

    if (name.length < 1) errors.push("Name must be at least 1 character");
    if (name.length > 30) errors.push("Name must be less than 30 characters");
    if (server_img.length < 5)
      errors.push("Image Url must be at least 5 characters");

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const serverData = {
      name,
      server_img,
      id,
    };

    const validationErrors = validations();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    await dispatch(updateServer(serverData));
    await dispatch(getAllServersThunk());
    await dispatch(getOneServerThunk(serverId))

    closeModal();
  };

  return (
    <div className="edit-server-modal">
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>

        <label>
          name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Name"
          />
        </label>

        <label>
          server img
          <input
            type="text"
            value={server_img}
            onChange={(e) => setServer_Img(e.target.value)}
            required
            placeholder="new server img"
          />
        </label>

        <div>
          <button type="submit">Update Server</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewEditServerModal;
