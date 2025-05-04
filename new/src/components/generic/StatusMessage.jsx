import "./StatusMessage.scss"
import React from 'react'
import {Card, CardBody} from "react-bootstrap"
import CircleAvatar from "/src/components/generic/CircleAvatar.jsx"
import {useUtils} from "/src/helpers/utils.js"
import {useWindow} from "/src/providers/WindowProvider.jsx"

function StatusMessage({title, message, faIcon, type}) {
    const {isBreakpoint} = useWindow()
    const utils = useUtils()

    let fallbackIconColors = null
    switch (type) {
        case 'success':
            fallbackIconColors = {
                bg: utils.getRootSCSSVariable('theme-highlight'),
                fill: utils.getRootSCSSVariable('theme-dark')
            }
            break
    }

    return (
        <Card className={`status-message`}>
            <CardBody>
                <div>
                    <CircleAvatar size={isBreakpoint('lg') ? 5 : 3}
                                  dynamicSize={false}
                                  img={null}
                                  fallbackIcon={faIcon}
                                  fallbackIconColors={fallbackIconColors}/>

                    <div className={`status-message-content mt-2`}>
                        <h5 className={`fw-bold mb-3`}>{title}</h5>
                        <p className={`text-5 text-muted`} dangerouslySetInnerHTML={{__html: message}}/>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default StatusMessage