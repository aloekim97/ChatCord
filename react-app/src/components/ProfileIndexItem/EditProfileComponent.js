import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import './index.css';
import { createChannel } from "../../store/channel";
import { updateChannel, removeChannel } from "../../store/channel";
import EditProfileIndex from "./EditProfileIndex";


function EditProfileModal({channelId, channel}){
    const userObj = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const [page, setPage] = useState('My Account')
    const { closeModal } = useModal();
    useEffect(() => {

    }, )



    return(
        <div className="edit-profile-modal-container">
            <div className="edit-profile-navbar">
                <div className="edit-profile-modal-nav-section">
                    <h3 style={{color: '#989AA2', fontSize: '14px'}}>
                        USER SETTINGS
                    </h3>
                    <button onClick={() => setPage('My Account')} className="edit-profile-nav-buttons" style={{display: 'flex', backgroundColor: page === 'My Account' ? '#3F4248' : ''}}>My Account</button>
                    <button onClick={() => setPage('Profile')} className="edit-profile-nav-buttons" style={{display: 'flex', backgroundColor: page === 'Profile' ? '#3F4248' : '' }}>Profile</button>
                </div>
            </div>
            <div className="edit-profile-pages-container">
                <div className="edit-profile-page-actual-page">
                    {
                        page === 'My Account' ? <EditProfileIndex user={userObj} setPage={setPage} /> : <></>
                    }
                </div>
                <button onClick={closeModal} className="close-modal-button"><i class="fa-regular fa-circle-xmark fa-2xl"></i></button>
            </div>

        </div>
    )
}

export default EditProfileModal
