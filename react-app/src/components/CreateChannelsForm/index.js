import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import './index.css';
import { createChannel } from "../../store/channel";
import { NavLink } from "react-router-dom";
import { loadChannel } from "../../store/channel";
import { Redirect, useHistory } from "react-router-dom";
import { updateServer } from "../../store/server";

function CreateChannelModal({serverId}){
    const dispatch = useDispatch();
    const [name, setName] = useState("")
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const history = useHistory();

    useEffect(() => {
        let newErrors = []

        if (name.length < 1) newErrors.push('Name must be at least 1 character')
        else if (name.length > 30) newErrors.push("Name must be less than 30 characters")

        setErrors(newErrors)
    }, [name])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors([]);
        const payload = {
            name
        }
        let errors;
        const body = await dispatch(createChannel(name, serverId))
        console.log('yoooooooooooooo wgat', body.server)
        dispatch(updateServer(body.server))
        dispatch(loadChannel(body.channel))
        console.log('yay we submitted')
        closeModal()
        return history.push(`/servers/${serverId}/${body.channel.id}`)
    }

    return (
        <>
            <div className="create-form-header">
                <h1 id="create-channel-h1">
                    Create Channel
                    <button className="x-cancel-button" onClick={closeModal}>
                        <i class="fa-solid fa-x fa-xl"></i>
                    </button>
                </h1>
            </div>
            <form className="create-channel" onSubmit={handleSubmit}>
                <ul className="create-channel-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>

                <label>
                    <div className="channel-form-name">
                        CHANNEL NAME
                    </div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="create-channel-input"
                        placeholder="new-channel"
                    />
                </label>
                <div className="form-footer">
                    <button className="cancelButton" type="button" onClick={closeModal}>Cancel</button>
                    <button className="submitButton" type="submit">Create Channel</button>
                </div>
            </form>
        </>
    )
}

export default CreateChannelModal
