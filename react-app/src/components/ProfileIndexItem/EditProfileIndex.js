import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateInfo } from "../../store/session";
import OpenModalMenuItem from "../OpenModalButton";
import EditUserDetails from "./EditUsername";
import './index.css';

function EditProfileIndex({user, setPage}){
    const { closeModal } = useModal();
    const [isHiddenEmail, setIsHiddenEmail] = useState(false)
    const [changeUsername, setChangeUsername] = useState(false)
    const [changeEmail, setChangeEmail] = useState(false)
    const [changePic, setChangePic] = useState(false)
    const dispatch = useDispatch()
    let emailCheck = user.email.split('@')
    console.log(emailCheck)
    let last = emailCheck[1]
    let len = emailCheck[0].length
    const replacement = []
    for (let i = 0; i < len; i++){
        replacement.push('*')
    }
    const hiddenEmail = replacement.join('') + '@' + last
    console.log('wha is the num of chars', hiddenEmail)
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors([]);

        closeModal()
    }

    const toggleHiddenEmail = () => {
        setIsHiddenEmail(!isHiddenEmail)
    }
    return(
        <div className="my-account-component-container">
            <h1 className="edit-prof-title">
                My Account
            </h1>
            <div className="edit-profile-card-container">
                <img className='edit-profile-card-img' src={user.profileImg} onError={e => { e.currentTarget.src = "https://i.imgur.com/Nf1arcX.png"}}></img>
                <div className='edit-profile-card-banner'>
                </div>
                <div className='edit-profile-card-info-container'>
                    <div className='edit-profile-card-info'>
                        {`${user.username}#00${user.id}`}
                        <button disabled={true} style={{cursor: 'pointer', padding: '5px 10px', color: '#FFFFFF',
                        backgroundColor: '#5865F2', borderStyle: 'none', cursor: 'not-allowed'}}>Edit User Profile</button>
                    </div>
                    <div className="edit-profile-options-container">
                        <div className="edit-profile-options-index">
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{color: '#B3B9BF'}}>
                                    USERNAME
                                </div>
                                <div style={{color: '#F3F4F5'}}>
                                    {`${user.username}#00${user.id}`}
                                </div>
                            </div>
                            <button onClick={() => {
                                setChangeUsername(!changeUsername)
                            }} className="edit-profile-modal-account-buttons" style={{width: '65px', color: '#FFFFFF', backgroundColor:'#4E5058', borderStyle: 'none'}}>
                                {changeUsername ? 'Cancel' : 'Edit'}
                            </button>
                        </div>
                        <div className="edit-profile-options-index">
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{color: '#B3B9BF'}}>
                                    EMAIL
                                </div>
                                <div style={{color: '#F3F4F5'}}>
                                    { isHiddenEmail ? user.email : hiddenEmail }
                                    <button onClick={toggleHiddenEmail} className="reveal-button" style={{ fontSize: '12px', color: '#218EFC'}}>
                                       { isHiddenEmail ? 'Hide' : 'Reveal'}
                                    </button>
                                </div>
                            </div>
                            <button onClick={() => {
                                setChangeEmail(!changeEmail)
                            }} className="edit-profile-modal-account-buttons" style={{width: '65px', color: '#FFFFFF', backgroundColor:'#4E5058', borderStyle: 'none'}}>
                                {changeEmail ? 'Cancel' : 'Edit'}
                            </button>
                        </div>
                        <div className="edit-profile-options-index">
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{color: '#B3B9BF'}}>
                                    AVATAR
                                </div>
                                <div style={{color: '#F3F4F5'}}>
                                    Change your profile picture
                                </div>
                            </div>
                            <button onClick={() => {
                                setChangePic(!changePic)
                            }} className="edit-profile-modal-account-buttons" style={{width: '65px', color: '#FFFFFF', backgroundColor:'#4E5058', borderStyle: 'none'}}>
                                {changePic ? 'Cancel' : 'Edit'}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            {changeUsername ? <div>
                <EditUserDetails user={user} detail={user.username} tag={'Username'} close={setChangeUsername} />
            </div> : <></>}
            {changeEmail ? <div>
                <EditUserDetails user={user} detail={user.email} tag={'Email'} close={setChangeEmail}/>
            </div> : <></>}
            {changePic ? <div>
                <EditUserDetails user={user} detail={user.profileImg} tag={'Profile Image'} close={setChangePic}/>
            </div> : <></>}
        </div>
    )
}

export default EditProfileIndex
