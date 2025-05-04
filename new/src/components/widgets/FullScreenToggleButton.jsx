import React from 'react'
import ToolButton from "/src/components/generic/ToolButton.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"

function FullscreenToggleButton({className, enabled}) {
    const {getString} = useLanguage()
    const isFullScreen = document.fullscreenElement

    const _toggle = () => {
        if (!isFullScreen) {
            window.toggledFullscreen = true
            document.documentElement.requestFullscreen({ navigationUI: 'hide' })
                .catch(err => {
                    console.log(`Error attempting to enter full-screen mode: ${err.message}`)
                })
        }
        else {
            window.toggledFullscreen = false
            document.exitFullscreen()
                .catch(err => {
                    console.log(`Error attempting to exit full-screen mode: ${err.message}`)
                })
        }
    }

    return (
        <div className={`toggle-button-wrapper ${className}`}>
            {enabled && (
                <ToolButton size={2}
                            tooltip={isFullScreen ? getString('full_screen_exit') : getString('full_screen_enter')}
                            icon={isFullScreen ? 'fa-solid fa-minimize' : 'fa-solid fa-maximize'}
                            onClick={_toggle}/>
            )}
        </div>
    )
}

export default FullscreenToggleButton