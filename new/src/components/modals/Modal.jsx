import "./Modal.scss"
import React, {useEffect, useState} from 'react'
import {Card, CardBody, CardHeader, CardFooter} from "react-bootstrap"
import FaIcon from "/src/components/generic/FaIcon.jsx"
import {useUtils} from "/src/helpers/utils.js"
import ToolButton from "/src/components/generic/ToolButton.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useScheduler} from "/src/helpers/scheduler.js"

const utils = useUtils()
const scheduler = useScheduler()

function Modal({children, className, id, visible}) {
    useEffect(() => {
        window.scrollTo(0, Math.max(0, window.scrollTop - 1))
        utils.setPageScrollingEnabled(!visible)
    }, [visible])

    return (
        <>
            {visible && (
                <div className={`custom-modal ${className}`} id={id}>
                    {children}
                </div>
            )}
        </>
    )
}

function ModalWindow({children}) {
    const [isTransitioning, setIsTransitioning] = useState(true)

    useEffect(() => {
        scheduler.schedule(() => {
            setIsTransitioning(false)
        }, 50, 'modal')
    }, [])

    const transitionClass = isTransitioning ? 'custom-modal-window-hidden' : ''

    return (
        <Card className={`custom-modal-window ${transitionClass}`}>
            {children}
        </Card>
    )
}

function ModalHeader({title, faIcon, onClose}) {
    return (
        <CardHeader>
            <div className={`fw-bold lead-3 font-family-headings me-3`}>
                {faIcon && (<FaIcon iconName={`${faIcon} me-3 text-highlight `}/>)}
                {title && (<span className={``}>{title}</span>)}
            </div>

            <div className={`close-menu d-flex align-items-center`}>
                <ModalCloseButton color={`dark`}
                                  onClose={onClose}/>
            </div>
        </CardHeader>
    )
}

function ModalBody({children}) {
    return (
        <CardBody>
            {children}
        </CardBody>
    )
}

function ModalFooter({text}) {
    return (
        <CardFooter>
            <FaIcon iconName={`fa-solid fa-comments eq-h4 text-highlight`}/>
            <span className={`description text-1 text-secondary-4 mb-1`} dangerouslySetInnerHTML={{__html: text}}/>
        </CardFooter>
    )
}

function ModalWindowTransparent({children, onClose}) {
    return (
        <div className={`custom-modal-window-transparent`}>
            {children}

            <ModalCloseButton color={`highlight`}
                              onClose={onClose}/>
        </div>
    )
}

function ModalCloseButton({color, onClose}) {
    const {getString} = useLanguage()
    color = color || 'dark'

    const _onButtonClicked = () => {
        onClose()
    }

    return (
        <ToolButton icon={`fa-solid fa-xmark`}
                    className={`close-button`}
                    size={2}
                    onClick={_onButtonClicked}
                    color={color}
                    tooltip={getString('close')}/>
    )
}

export {Modal, ModalWindow, ModalWindowTransparent, ModalHeader, ModalBody, ModalFooter}