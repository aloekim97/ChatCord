import { useState } from "react"

function DmBox({dm, deleteDm, user}) {
    const [isHover, setIsHover] = useState(false)
    const buttonTheme = isHover ? "delete-dm2" : "delete-dm"
    return(
        <div className="message-content"
        onMouseEnter={() => setIsHover(!isHover)}
        onMouseLeave={() => setIsHover(!isHover)}>
            <div className="actual-message">
                <img className="message-profile-pic" onError={e => { e.currentTarget.src = "https://i.imgur.com/Nf1arcX.png"}}src={user.profileImg}>
                </img>
                <div className="message-content-container">
                    <div className="message-profile-name">
                        <h3 className="message-content-name">
                            {dm.userSender.username}
                        </h3>
                        <div className="message-content-date">
                            {dm.created_at}
                        </div>
                    </div>
                    <div className="message-data">
                        {dm.content}
                    </div>
                </div>
            </div>
                {user.id === dm.userSender.id && (
            <div className='buttoon'>
                <button className={buttonTheme} onClick={() => deleteDm(dm.id)}><i class="fa-solid fa-trash-can"></i>Delete Message</button>
            </div>
                )}
        </div>
    )
}

export default DmBox


            //   <div className="sent-message" key={dm.id}>
            //     {/* <img src={}></img> */}
            //     <div>{dm.content}{dm.id}{delId}</div>
            //     <div className="edit/del">
            //       <button
            //         className="edit"
            //         onClick={function () {
            //           setDmId(dm.id);
            //           setSenderId(dm.sender_id);
            //         }}
            //       >
            //         Edit
            //       </button>
            //       <button
            //         className="del"
            //         onClick={() => {
            //             setDelId(dm.id);
            //             deleteDm(delId)
            //         }}

            //       >
            //         Delete
            //       </button>
            //     </div>
            //     <form className="edit-box">
            //       {dm.id === dmId ? (
            //         <input
            //           className="text-here"
            //           onSubmit={sendChat}
            //           value={chatInput}
            //           onChange={updateChatInput}
            //           placeholder={dm.content}
            //         />
            //       ) : null}
            //     </form>
            //   </div>
            // );
            // )}
            // </div>
            /* <form onSubmit={onSub}>
                            <input className='text-box'
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            />
                        </form> */
