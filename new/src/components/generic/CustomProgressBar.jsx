import "./CustomProgressBar.scss"
import React from 'react'

function CustomProgressBar({now, fillColor}) {
    return (
        <div className={`progress`}>
            <div className="progress-bar"
                 role="progressbar"
                 style={{
                     width: `${now}%`,
                     backgroundColor: fillColor || 'auto',
                     opacity: 0.25 + (now/100)*0.75
                 }
            }/>
        </div>
    )
}

export default CustomProgressBar