import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { loadMsgThunk } from "../../store/channelMsg"

function ChannelM(){
    const dispatch = useDispatch()
    const {chatId, channelId} = useParams()
    const [content, setContent] = useState()
    const chatms = useSelector(state => state.msg.messages)

    console.log(chatms)
    useEffect(() => {
        dispatch(loadMsgThunk(channelId))
    })
    return(
        <div className="channel-msg">
            {Object.values(chatms).map(ms => {
                return (
                    <div className="chmsg-sent" key={ms.id}>
                        <div>{ms.content}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default ChannelM