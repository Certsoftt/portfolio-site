import "./Divider.scss"
import React from 'react'

function Divider({type, variant}) {
    type = type || 'simple'

    return (
        <hr className={`divider-${type}-${variant}`}/>
    )
}

export default Divider