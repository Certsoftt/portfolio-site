import React, {useEffect, useState} from 'react'
import FaIcon from "/src/components/generic/FaIcon.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"

function Expandable({ children, items, storageId, onFilter, controlsClass, maxItems, stepAmount }) {
    const {getString} = useLanguage()

    const [displayingItems, setDisplayingItems] = useState(0)

    useEffect(() => {
        window.expandableStates = window.expandableStates || {}
        const _currentState = window.expandableStates[storageId] || {}
        _flush(_currentState.displayingItems || maxItems)
    }, [items, maxItems])

    useEffect(() => {
        window.expandableStates = window.expandableStates || {}
        const _currentState = window.expandableStates[storageId] || {}
        _flush(_currentState.displayingItems || maxItems)
    }, [])

    const _flush = (displayingItems, saveState) => {
        setDisplayingItems(displayingItems)

        const slicedItems = items.slice(0, displayingItems)
        onFilter(slicedItems)

        if(!storageId || !saveState)
            return

        window.expandableStates = window.expandableStates || {}
        window.expandableStates[storageId] = {
            displayingItems: displayingItems
        }
    }

    const _onSeeMoreButton = (e) => {
        e.currentTarget.blur()
        _flush(displayingItems + (stepAmount || maxItems), true)
    }

    return (
        <>
            {children}

            {displayingItems < items.length && (
                <div className={`col-12 w-100 text-center ${controlsClass}`}>
                    <button className={`btn btn-primary text-3`} onClick={_onSeeMoreButton}>
                        <FaIcon iconName={`fa-solid fa-caret-down`}/>
                        <span className={`ms-2`}>{getString('see_more')}</span>
                    </button>
                </div>
            )}
        </>
    )
}

export default Expandable