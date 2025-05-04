import React, {useRef, useState} from 'react'

function SensitiveButton({ onClick, children, className, tooltipText, disabled }) {
    const [isTouched, setIsTouched] = useState(false)

    const _onTouchStart = (e) => {
        setIsTouched(true)
    }

    const _onTouchMove = (e) => {
        setIsTouched(false)
    }

    const _onTouchEnd = (e) => {
        if(isTouched)
            onClick()
        setIsTouched(false)
    }

    const _onClick = (e) => {
        if(isTouched) {
            e.stopImmediatePropagation()
            return
        }

        onClick()
    }

    return (
        <button className={`sensitive-button ${className}`}
                data-tooltip={tooltipText}
                type={`button`}
                disabled={disabled}
                onTouchStart={_onTouchStart}
                onTouchMove={_onTouchMove}
                onTouchEnd={_onTouchEnd}
                onClick={_onClick}>
            {children}
        </button>
    )
}

export default SensitiveButton