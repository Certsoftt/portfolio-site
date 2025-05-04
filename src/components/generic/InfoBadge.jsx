import "./InfoBadge.scss"
import React from 'react'
import FaIcon from "/src/components/generic/FaIcon.jsx"

function InfoBadge({faIcon, text, className}) {
    return (
        <div className={`info-badge text-1 ${className}`}>
            <FaIcon iconName={faIcon} className={`me-2 opacity-50`}/>
            <span>{text}</span>
        </div>
    )
}

export default InfoBadge