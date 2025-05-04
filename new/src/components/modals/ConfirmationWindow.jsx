import "./ConfirmationWindow.scss"
import React, {useEffect, useState} from 'react'
import {Modal, ModalWindow, ModalHeader, ModalBody} from "/src/components/modals/Modal.jsx"
import FaIcon from "/src/components/generic/FaIcon.jsx"

function ConfirmationWindow({pendingConfirmation, hideConfirmationDialog}) {
    const _confirm = () => {
        pendingConfirmation.onConfirm()
        _close()
    }

    const _close = () => {
        hideConfirmationDialog()
    }

    return (
        <Modal  id={`confirmation-modal`}
                visible={Boolean(pendingConfirmation)}>

            {pendingConfirmation && (
                <ModalWindow>
                    <ModalHeader title={pendingConfirmation.title}
                                 faIcon={`fa-solid fa-link`}
                                 onClose={_close}/>

                    <ModalBody>
                        <div className={`confirmation-window-content`}>
                            <div className={`confirmation-window-message text-center`}>
                                <div className={`text-4`}
                                     dangerouslySetInnerHTML={{__html:pendingConfirmation.message}}/>
                            </div>

                            <div className={`confirmation-window-buttons`}>
                                <button className={`btn btn-secondary text-4`} onClick={_close} data-tooltip={pendingConfirmation.cancelButtonLabel}>
                                    <FaIcon iconName={`fa-solid fa-xmark me-2`}/>
                                    <span>{pendingConfirmation.cancelButtonLabel}</span>
                                </button>

                                <button className={`btn btn-highlight text-4`} onClick={_confirm} data-tooltip={pendingConfirmation.confirmButtonLabel}>
                                    <span>{pendingConfirmation.confirmButtonLabel}</span>
                                    <FaIcon iconName={`fa-solid fa-caret-right ms-2`}/>
                                </button>
                            </div>
                        </div>
                    </ModalBody>
                </ModalWindow>
            )}
        </Modal>
    )
}

export default ConfirmationWindow