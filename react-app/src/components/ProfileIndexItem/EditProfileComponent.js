import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import './index.css';
import { createChannel } from "../../store/channel";
import { updateChannel, removeChannel } from "../../store/channel";


function EditProfileModal({channelId, channel}){
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
                <h1 className="edit-prof-title">
                    Edit Profile
                </h1>
            </div>
            <form className="edit-channel" onSubmit={handleSubmit} >

                <label className="edit-channel-label">
                    Profile Username
                    <input
                        type="text"
                        required
                        className="edit-channel-input"
                        placeholder="New Name"
                    />
                </label>
                <div className="form-footer">
                    <button className="edit-submitButton" type="submit">Update</button>
                    {/* <button className="deleteButton" type="button" >Delete Channel</button> */}
                </div>
            </form>
        </>
    )
}

export default EditProfileModal
