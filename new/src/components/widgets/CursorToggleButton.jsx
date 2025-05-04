import React from 'react'
import NavLink from "/src/components/nav/desktop/NavLink.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useFeedbacks} from "/src/providers/FeedbacksProvider.jsx"

function CursorToggleButton() {
    const {isAnimatedCursorEnabled, isAnimatedCursorActive, toggleAnimatedCursorActive} = useFeedbacks()
    const {getString} = useLanguage()

    const _toggle = () => {
        toggleAnimatedCursorActive()
    }

    return (
        <div className={`toggle-button-wrapper`}>
            {isAnimatedCursorEnabled() && (
                <NavLink shrink={true}
                         label={``}
                         tooltip={getString('magic_cursor_on')}
                         icon={!isAnimatedCursorActive() ? 'fa-solid fa-wand-magic' : 'fa-solid fa-wand-magic-sparkles'}
                         size={2}
                         onClick={_toggle}/>
            )}
        </div>
    )
}

export default CursorToggleButton