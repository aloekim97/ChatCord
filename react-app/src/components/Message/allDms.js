import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getChats } from '../../store/chats'

const MePage = () => {
    const [chatId, setChatId] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatchEvent(getChats())
    }, [dispatch])

    return(
        <div className='all-chats'>

        </div>
    )
}

export default MePage