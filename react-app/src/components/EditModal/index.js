import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import './index.css';
import { createChannel } from "../../store/channel";
import { updateChannel, removeChannel } from "../../store/channel";

function EditModal({channelId, channel}){
    const dispatch = useDispatch();
    const [name, setName] = useState("")
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    useEffect(() => {
        let newErrors = []

        if (name.length < 1) newErrors.push('Name must be atleast 1 character')
        else if (name.length > 30) newErrors.push("Name must be less than 30 characters")

        setErrors(newErrors)
    }, [name])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors([]);
        let errors;
        await dispatch(updateChannel(channelId, name ))

        closeModal()
    }

    const handleDelete = async (e) => {
        await dispatch(removeChannel(channel))
        closeModal()
    }
    return(
        <>
            <div className="create-form-header">
                <h1 id="create-channel-h1">
                    Edit Channel
                </h1>
            </div>
            <form className="edit-channel" onSubmit={handleSubmit} >

                <label>
                    CHANNEL NAME
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="create-channel-input"
                        placeholder="new channel"
                    />
                </label>
                <div className="form-footer">
                    <button className="submitButton" type="submit">Edit Channel</button>
                    <button className="deleteButton" type="button" onClick={handleDelete}>Delete Channel</button>
                </div>
            </form>
        </>
    )
}

export default EditModal
