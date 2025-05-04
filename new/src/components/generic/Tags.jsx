import './Tags.scss'
import React from 'react'
import FaIcon from "/src/components/generic/FaIcon.jsx"

function Tags({strings, className, shorten}) {
    if(!strings || !strings.map)
        strings = []

    return (
        <div className={`tags d-block ${className}`}>
            {strings.map((string, key) => (
                <span key={key} className={`badge badge-sm ${shorten ? 'badge-xs' : ''}`}>
                    {!shorten && (
                        <FaIcon iconName={`fa-solid fa-bullseye`} className={`me-2 opacity-25`}/>
                    )}
                    {shorten ? string : string.toUpperCase()}
                </span>
            ))}
        </div>
    )
}

export default Tags