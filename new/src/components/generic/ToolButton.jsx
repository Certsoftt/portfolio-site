import "./ToolButton.scss"
import React from 'react'
import {useUtils} from "/src/helpers/utils.js"
import FaIcon from "/src/components/generic/FaIcon.jsx"

function ToolButton({className, tooltip, icon, size, onClick, nav, color}) {
    const utils = useUtils()

    const clampedSize = utils.clamp(size, 1, 4)
    const sizeClass = 'tool-button-size-' + clampedSize
    const navClass = nav ? 'tool-button-nav' : ''
    const colorClass = `tool-button-color-` + color

    return (
        <button data-tooltip={tooltip} className={`btn tool-button ${sizeClass} ${navClass} ${className} ${colorClass}`} onClick={onClick}>
            <div className={`tool-button-content`}>
                <FaIcon iconName={icon}/>
            </div>
        </button>
    )
}

export default ToolButton