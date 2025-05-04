import "./StatusBadge.scss"
import React, {useEffect, useState} from 'react'
import Tooltip from "/src/components/generic/Tooltip.jsx"
import {useUtils} from "/src/helpers/utils.js"
import {useScheduler} from "/src/helpers/scheduler.js"
import {useWindow} from "/src/providers/WindowProvider.jsx"

function StatusBadge({ available, message, smallMode }) {
    const utils = useUtils()
    const scheduler = useScheduler()
    const {getBreakpoint} = useWindow()
    const isTouchScreen = utils.isTouchDevice()

    const [customClass, setCustomClass] = useState('')

    const circleClass = available ? `status-circle-active` : `status-circle-inactive`
    const pulseClass = available ? `status-circle-active-pulse` : `status-circle-inactive-pulse`

    const [showToolTip, setShowToolTip] = useState(false)

    useEffect(() => {
        window.addEventListener('mousedown', _onWindowClick)

        return () => {
            window.removeEventListener('mousedown', _onWindowClick)
        }
    }, [])

    useEffect(() => {
        setCustomClass('d-none')
        setTimeout(() => {
            setCustomClass('')
        }, 10)
    }, [getBreakpoint(), smallMode])

    const _onMouseEnter = () => {
        if(isTouchScreen)
            return
        setShowToolTip(true)
    }

    const _onMouseLeave = () => {
        if(isTouchScreen)
            return
        setShowToolTip(false)
    }

    const _onClick = (e) => {
        if(!isTouchScreen)
            return
        setShowToolTip(!showToolTip)
        e.stopPropagation()
    }

    const _onWindowClick = (e) => {
        if(!isTouchScreen || e.target.classList.contains('status-badge'))
            return

        setShowToolTip(false)
    }

    return (
        <div className={`status-badge ${smallMode ? 'status-badge-sm' : ''} ${customClass}`}
             onMouseEnter={_onMouseEnter}
             onMouseLeave={_onMouseLeave}
             onClick={_onClick}>
            <div className={`status-circle ${circleClass}`}/>
            <div className={`status-circle-pulse ${pulseClass}`}/>
            {showToolTip && (<Tooltip id={`status-tooltip`} label={message} position={'right'}/>)}
        </div>
    )
}

export default StatusBadge