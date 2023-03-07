import { useState } from "react"
import { useDispatch } from "react-redux";
import { updateInfo } from "../../store/session";
import './index.css';

function EditUserDetails({user, detail, tag, close}){
    const [value, setValue] = useState(detail)
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const handleSubmit = async (e) => {
        setErrors([])
        e.preventDefault();
        let username = tag === 'Username'? value : user.username
        let email = tag === 'Email'? value : user.email
        let profileImg = tag === 'Profile Image' ? value : user.profileImg
        console.log('what is the profile img', profileImg)
        const body = await dispatch(updateInfo(email, password, username, user.id, profileImg))
        if (body){
            console.log('what is the body', body)
            return setErrors(body)
        }
        console.log('submit')
        close(false)
    }
    return(
        <form className="Edit-user-details-form" onSubmit={handleSubmit}>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{color: '#FFFFFF', fontSize: '24px'}}>
                    {`Change your ${tag.toLowerCase()}`}
                </div>
                <div style={{color: '#989AA2', fontSize: '16px'}}>
                    {`Enter a new ${tag.toLowerCase()} and your existing password`}
                </div>
            </div>
            <ul className="create-channel-errors" style={{listStyle: 'none'}}>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>

            <label>
                <div className="channel-form-name">
                    {tag}
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                    className="create-channel-input"
                    placeholder="new-channel"
                />
            </label>
            <label>
                <div className="channel-form-name">
                    Current Password
                </div>
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="create-channel-input"
                />
            </label>
            <div className="form-footer">
                <button className="cancelButton" type="button" onClick={() => close(false)}>Cancel</button>
                <button className="submitButton" type="submit" disabled={value === detail ? true: false} style={{cursor: value === detail ?'not-allowed' : 'pointer' }}>Save</button>
            </div>
        </form>
    )
}

export default EditUserDetails
