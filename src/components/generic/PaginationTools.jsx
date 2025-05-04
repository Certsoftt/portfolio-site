import "./PaginationTools.scss"
import React from 'react'
import FaIcon from "/src/components/generic/FaIcon.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"

const THREE_DOTS = '...'
const MAX_BUTTONS = 4

function PaginationTools({currentPage, lastPage, onPageChange}) {
    const {getString} = useLanguage()

    const _prev = (e) => {
        e.target.blur()
        onPageChange(currentPage - 1)
    }

    const _onNumberButton = (e, id) => {
        e.target.blur()
        onPageChange(id)
    }

    const _next = (e) => {
        e.target.blur()
        onPageChange(currentPage + 1)
    }

    const _generateNumbers = () => {
        if(lastPage < MAX_BUTTONS) {
            return [...Array(lastPage + 1).keys()].map(i => i)
        }

        const initial = Math.max(currentPage - MAX_BUTTONS/2, 0)
        const array = []
        for(let i = initial ; i < initial + MAX_BUTTONS ; i++) {
            if(i <= lastPage) {
                array.push(i)
            }
        }

        if(initial !== 0)
            array.unshift(THREE_DOTS)
        if(array[array.length - 1] !== lastPage)
            array.push(THREE_DOTS)
        return array
    }

    const _getButtonClassList = (id) => {
        let classList = `btn btn-target-page fw-bold text-3`
        if(id === THREE_DOTS) {
            return classList + ` btn-link disabled`
        }

        classList += ` btn-secondary`
        if(id === currentPage) {
            classList += ` selected`
        }

        return classList
    }

    return (
        <div className={`pagination-tools`}>
            <div className={`pagination-menu`}>
                <button data-tooltip={getString('previous')}
                        className={`btn btn-primary btn-pagination-control ${currentPage === 0 ? 'disabled' : ''} text-4`} onClick={_prev}>
                    <FaIcon iconName={`fa-solid fa-caret-left`}/>
                </button>

                {_generateNumbers().map((id, key) => (
                    <button key={key}
                            className={_getButtonClassList(id)}
                            onClick={(e) => {_onNumberButton(e, id)}}>
                        <span>
                            {id !== THREE_DOTS ? (id + 1).toString() : THREE_DOTS}
                        </span>
                    </button>
                ))}

                <button data-tooltip={getString('next')}
                        className={`btn btn-primary btn-pagination-control ${currentPage === lastPage ? 'disabled' : ''} text-3`} onClick={_next}>
                    <FaIcon iconName={`fa-solid fa-caret-right`}/>
                </button>
            </div>
        </div>
    )
}

export default PaginationTools