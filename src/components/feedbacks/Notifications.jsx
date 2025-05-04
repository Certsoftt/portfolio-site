import "./Notifications.scss"
import React, {useEffect, useState} from 'react'
import {Card, CardBody, CardHeader} from "react-bootstrap"
import FaIcon from "/src/components/generic/FaIcon.jsx"
import {useScheduler} from "/src/helpers/scheduler.js"

function Notifications({displayingNotification, killNotification}) {
    const scheduler = useScheduler()
    const schedulerTag = 'notifications'

    const [classList, setClassList] = useState('')

    useEffect(() => {
        scheduler.clearAllWithTag(schedulerTag)
        setClassList(`notification-hidden`)
        if(!displayingNotification) {
            return
        }

        scheduler.schedule(() => {
            setClassList(`notification-${displayingNotification.type}`)
        }, 50, schedulerTag)

        scheduler.schedule(() => {
            setClassList(`notification-hiding notification-${displayingNotification.type}`)
        }, 4000, schedulerTag)

        scheduler.schedule(() => {
            killNotification()
        }, 4400, schedulerTag)
    }, [displayingNotification])

    const _getIcon = () => {
        if(!displayingNotification)
            return ``

        switch (displayingNotification.type) {
            case 'default': return `fa-solid fa-bell`
            case 'error': return `fa-solid fa-circle-exclamation`
        }
    }

    const _onCloseButton = () => {
        killNotification()
    }

    return (
        <>
            {displayingNotification && (
                <div className={`notifications-container`}>
                    <Card className={`notification ${classList}`}>
                        <CardHeader>
                            <h6 className={`mb-0 fw-bold`}>
                                <FaIcon iconName={`${_getIcon()} me-2`}/>
                                <span>{displayingNotification.title}</span>
                            </h6>

                            <button className={`hide-button ps-1`} onClick={_onCloseButton}>
                                <FaIcon iconName={`fa-solid fa-xmark`}/>
                            </button>
                        </CardHeader>

                        <CardBody>
                            <div className={`message text-3 opacity-75`}>
                                {displayingNotification.message}
                            </div>
                        </CardBody>
                    </Card>
                </div>
            )}
        </>
    )
}

export default Notifications