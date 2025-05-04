import "./MenuItem.scss"
import React from 'react'
import {useUtils} from "/src/helpers/utils.js"
import FaIcon from "/src/components/generic/FaIcon.jsx"

function MenuItem({label, icon, faSuffix, hoverAnimation, selected, size, shrink, className, style, tooltip}) {
    const utils = useUtils()

    label = label || 'Item'
    size = utils.clamp(size, 1, 2)
    icon = icon || 'fa-solid fa-circle'

    const isImageIcon = icon.includes('.')

    return (
        <div data-tooltip={tooltip} style={style} className={`
            menu-item 
            ${utils.strIf(hoverAnimation, 'menu-item-with-hover')}
            ${utils.strIf(shrink, 'menu-item-compressed')}
            ${utils.strIf(selected, 'menu-item-selected')}
            ${className}
        `}>
            <div className={`menu-item-icon-wrapper menu-item-icon-wrapper-${size}`}>
                {isImageIcon && (
                    <img src={String(icon)} alt={label}/>
                )}

                {!isImageIcon && (
                    <FaIcon iconName={icon}/>
                )}
            </div>
            
            <span className={`menu-item-label ms-3`}
                  dangerouslySetInnerHTML={{__html:label}}/>

            {faSuffix && (
                <FaIcon iconName={faSuffix} className={`ms-2 pb-1 text-2`}/>
            )}
        </div>
    )
}

export default MenuItem