import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import './index.css';
import { createChannel } from "../../store/channel";
import { updateChannel, removeChannel } from "../../store/channel";

function EditServerModal({channelId, channel}){
    const dispatch = useDispatch();

    const { closeModal } = useModal();
    useEffect(() => {

    }, )

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors([]);


        closeModal()
    }

    return(
        <>
            <div className="create-form-header">
                <h1 id="">
                    Edit Server
                </h1>
            </div>
            <form className="edit-channel" onSubmit={handleSubmit} >

                <label>
                    SERVER NAME
                    <input
                        type="text"
                        required
                        className="create-channel-input"
                        placeholder="new name"
                    />
                </label>
                <div className="form-footer">
                    <button className="submitButton" type="submit">Edit Server</button>
                    <button className="deleteButton" type="button" >Delete Channel</button>
                </div>
            </form>
        </>
    )
}

export default EditServerModal
