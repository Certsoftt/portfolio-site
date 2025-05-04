import React from 'react'

function FaIcon({iconName, colors, className}) {
    const faIconClassList = `fa-icon ${iconName}`

    const iconStyle = colors ? {color: colors.fill} : null
    const bgStyle = colors ? {backgroundColor: colors.bg, padding: '5px', borderRadius: '100%'} : null

    return (
        <div className={`fa-icon-wrapper d-inline ${className}`} style={bgStyle}>
            <i className={faIconClassList} style={iconStyle}/>
        </div>
    )
}

export default FaIcon