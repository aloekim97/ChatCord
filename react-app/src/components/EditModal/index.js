import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import './index.css';
import { createChannel, deleteChanel } from "../../store/channel";
import { updateChannel, removeChannel } from "../../store/channel";
import { Redirect, useHistory } from "react-router-dom";
import { loadChannel } from "../../store/channel";
import { updateServer, editServer } from "../../store/server";

function EditModal({channelId, channel, serverObj}){
    const dispatch = useDispatch();
    const [name, setName] = useState("")
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const history = useHistory();
    useEffect(() => {
        let newErrors = []

        if (name.length < 1) newErrors.push('Name must be atleast 1 character')
        else if (name.length > 30) newErrors.push("Name must be less than 30 characters")

        setErrors(newErrors)
    }, [name])
    console.log('testing messages,', serverObj)
    const id = serverObj.channels[0].id
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors([]);
        let errors;
        console.log('hi b4 the dispatch')
        const body = await dispatch(updateChannel(channelId, name, serverObj ))
        // console.log('hi im tryin got se the bodyu',body)
        // console.log('following')
        dispatch(loadChannel(body.channel))
        dispatch(updateServer(body.server))
        // history.push(`/servers/${serverObj.id}/${body.channel.id}`)
        closeModal()
    }

    const handleDelete = async (e) => {
        // e.preventDefault();
        const body = await dispatch(removeChannel(channel, serverObj))
        console.log('hitting this')
        // history.push('/')
        console.log('plz jelp',serverObj.id, id )
        // return <Redirect to={`/servers/${serverObj.id}/${id}`}/>
        // dispatch(loadChannel(serverObj.channel[0]))
        console.log('what is serever', body)
        dispatch(loadChannel(body.server.channels[0]))
        dispatch(updateServer(body.server))
        history.push(`/servers/${serverObj.id}/${id}`)
        // console.log('yo what')
        // dispatch(deleteChanel(channel))
        closeModal()
    }
    return(
        <>
            <div className="create-form-header">
                <h1 id="create-channel-h1">
                        Edit Channel
                        <button className="x-cancel-button" onClick={closeModal}>
                            <i class="fa-solid fa-x fa-xl"></i>
                        </button>
                </h1>
            </div>
            <form className="edit-channel" onSubmit={handleSubmit} >

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
                        placeholder="New Channel Name"
                    />
                </label>
                <div className="form-footer">
                    <button className="submitButton" type="submit">Edit Channel</button>
                    <button className="deleteButton" type="button" onClick={() => handleDelete()}>Delete Channel</button>
                </div>
            </form>
        </>
    )
}

export default EditModal
