import React, {useEffect, useState} from 'react'
import {Col} from "react-bootstrap"
import PaginationTools from "/src/components/generic/PaginationTools.jsx"
import {useUtils} from "/src/helpers/utils.js"

function Paginable({ children, items, storageId, onFilter, controlsClass, maxItemsPerPage, autoHide }) {
    const utils = useUtils()

    const [didLoadInitialState, setDidLoadInitialState] = useState(false)
    const [currentPage, setCurrentPage] = useState(null)
    const [lastPage, setLastPage] = useState(null)

    useEffect(() => {
        const lastPage = Math.ceil(items.length/maxItemsPerPage) - 1
        setLastPage(lastPage)

        if(!didLoadInitialState)
            return

        setCurrentPage(0)
        _flush(0 , false)
    }, [items, maxItemsPerPage])

    useEffect(() => {
        window.paginableStates = window.paginableStates || {}
        const _currentState = window.paginableStates[storageId] || {}

        const initialPage = _currentState.currentPage || 0
        setCurrentPage(initialPage)
        _flush(initialPage)

        setDidLoadInitialState(true)
    }, [])

    const _onPageChange = (targetPage) => {
        targetPage = utils.clamp(targetPage || 0, 0, lastPage)
        setCurrentPage(targetPage)
        _flush(targetPage, true)
    }

    const _flush = (currentPage, saveState) => {
        const filteredItems = items.slice(currentPage*maxItemsPerPage, currentPage*maxItemsPerPage + maxItemsPerPage)
        onFilter(filteredItems)

        if(!storageId || !saveState)
            return

        window.paginableStates = window.paginableStates || {}
        window.paginableStates[storageId] = { currentPage: currentPage }
    }

    return (
        <>
            {children}

            {(!autoHide || lastPage !== 0) && (
                <Col className={`col-12 mb-2 w-100 ${controlsClass}`}>
                    <PaginationTools currentPage={currentPage}
                                     lastPage={lastPage}
                                     onPageChange={_onPageChange}/>
                </Col>
            )}
        </>
    )
}

export default Paginable