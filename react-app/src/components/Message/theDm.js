import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChats } from '../../store/chats'
import {NavLink} from "react-router-dom"
import './allDms.css'
import DmBar from './allDms'

function DmPage(){
    const dispatch = useDispatch()
    const dms = useSelector(state => state.dm.chatDetails)
    console.log(dms)

    return (
        <div className='dm-container'>
            <div className='side-bar'><DmBar /></div>
            
        </div>
    )
}

export default DmPage