import "./CircleAvatar.scss"
import React from 'react'
import ImageView from "/src/components/generic/ImageView.jsx"
import FaIcon from "/src/components/generic/FaIcon.jsx"

function CircleAvatar({img, alt, size, dynamicSize, fallbackIcon, fallbackIconColors, className}) {
    const sizeClass = `circle-avatar-${size || 1}`
    const dynamicSizeClass = dynamicSize ? `circle-avatar-dynamic-${size}` : ``

    return (
        <div className={`circle-avatar ${className} ${sizeClass} ${dynamicSizeClass}`}
             style={{
                 backgroundColor: fallbackIconColors ? fallbackIconColors.bg : null,
                 color: fallbackIconColors ? fallbackIconColors.fill : 'inherit'
             }}>
                {img && (<ImageView src={img} alt={alt}/>)}
                {!img && fallbackIcon && (<FaIcon iconName={fallbackIcon}/>)}
        </div>
    )
}

export default CircleAvatar