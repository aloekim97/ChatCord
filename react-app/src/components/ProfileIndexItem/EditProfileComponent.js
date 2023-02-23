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
                    <button onClick={() => setPage('My Account')} className="edit-profile-nav-buttons" style={{display: 'flex', backgroundColor: page === 'My Account' ? '#3F4248' : '', color: '#F3F4F5' }}>My Account</button>
                    <button disabled={true} className="edit-profile-nav-buttons" style={{display: 'flex', cursor: 'not-allowed' }}>Profile</button>
                    <button disabled={true} className="edit-profile-nav-buttons" style={{display: 'flex', cursor: 'not-allowed' }}>
                        Privacy & Security
                    </button>
                    <button disabled={true} className="edit-profile-nav-buttons" style={{display: 'flex', cursor: 'not-allowed' }}>
                        Devices
                    </button>
                    <button disabled={true} className="edit-profile-nav-buttons" style={{display: 'flex', cursor: 'not-allowed' }}>
                        Connections
                    </button>
                    <button disabled={true} className="edit-profile-nav-buttons" style={{display: 'flex', cursor: 'not-allowed' }}>
                        Friend Requests
                    </button>
                </div>
            </div>
            <div className="edit-profile-pages-container">
                <div className="edit-profile-page-actual-page">
                    {
                        page === 'My Account' ? <EditProfileIndex user={userObj} setPage={setPage} /> : <></>
                    }
                    {
                        page === 'Profile ' ? <EditUserProfile user={userObj} setPage={setPage} /> : <></>
                    }
                </div>
                <button onClick={closeModal} className="close-modal-button"><i class="fa-regular fa-circle-xmark fa-2xl"></i></button>
            </div>

        </div>
    )
}


export function EditUserProfile({user, setPage}){
    return(
        <div style={{width: '100%'}}>
            <div>Profile</div>
            <div style={{display: 'flex'}}>
                <div style={{display: 'flex' , width: '50%', flexDirection: 'column'}}>
                    <div>
                        <div>AVATAR</div>
                        <button>Change Avatar</button>
                    </div>
                    <div>
                        <div>BANNER COLOR</div>
                        <button>Change color</button>
                    </div>
                    <div>
                        <div>ABOUT ME</div>
                        <textarea />
                    </div>
                </div>
                <div style={{position: 'relative', width: '50%'}}>
                    <div>
                        PREVIEW
                    </div>
                    <img className='edit-profile-card-img' src={user.profileImg} onError={e => { e.currentTarget.src = "https://i.imgur.com/Nf1arcX.png"}}></img>
                    <div className='edit-profile-card-banner'>
                    </div>
                    <div className='edit-profile-card-info-container'>
                        <div style={{width: '100%', height: '60px'}}>

                        </div>
                        <div className="edit-profile-options-container">
                            <div className="edit-profile-options-index">
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <div style={{color: '#B3B9BF'}}>
                                        USERNAME
                                    </div>
                                    <div>
                                        {`${user.username}#00${user.id}`}
                                    </div>
                                </div>

                            </div>
                            <div className="edit-profile-options-index">
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <div style={{color: '#B3B9BF'}}>
                                        EMAIL
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditProfileModal
