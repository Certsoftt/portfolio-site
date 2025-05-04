import "./Preloader.scss"
import React, {useEffect, useState} from 'react'
import {useUtils} from "/src/helpers/utils.js"
import {useScheduler} from "/src/helpers/scheduler.js"

const Status = {
    ANIMATING: "animating",
    SHOWN: "shown",
    HIDING: "hiding",
    HIDDEN: "hidden"
}

const SCHEDULER_TAG = 'fs-loader'

function Preloader({children}) {
    const utils = useUtils()
    const scheduler = useScheduler()

    const [visible, setVisible] = useState(false)
    const [didLoadSvg, setDidLoadSvg] = useState(false)
    const [didLoadLogo, setDidLoadLogo] = useState(false)
    const [settings, setSettings] = useState(null)
    const [spinnerClass, setSpinnerClass] = useState('spinner-hidden')
    const [contentInfoClass, setContentInfoClass] = useState('loader-content-info-hidden')
    const [status, setStatus] = useState(Status.ANIMATING)

    const title = settings?.preloader.title || ''
    const subtitle = settings?.preloader.subtitle || ''

    useEffect(() => {
        const settingsPath = utils.resolvePath('/data/settings.json')
        fetch(settingsPath).then(r => r.json()).then(json => {
            setSettings(json)
        })
    }, [])

    useEffect(() => {
        if(!settings)
            return

        const preloaderEnabled = settings['preloader'].enabled
        setVisible(preloaderEnabled)

        if(!preloaderEnabled) {
            _skip()
            return
        }

        if(settings && didLoadLogo && didLoadSvg) {
            _tweenIn()
        }
    }, [didLoadLogo, didLoadSvg, settings])

    const _tweenIn = () => {
        scheduler.clearAllWithTag(SCHEDULER_TAG)
        setVisible(true)

        scheduler.schedule(() => {
            setSpinnerClass('')
        }, 100, SCHEDULER_TAG)

        scheduler.schedule(() => {
            setContentInfoClass('')
        }, 500, SCHEDULER_TAG)

        scheduler.schedule(() => {
            setStatus(Status.SHOWN)
            utils.addClassToBody('body-with-image')
        }, 900, SCHEDULER_TAG)

        scheduler.schedule(() => {
            _checkCompletion()
        }, 2500, SCHEDULER_TAG)
    }

    const _checkCompletion = () => {
        let timePassed = 0
        scheduler.interval(() => {
            timePassed += 0.2
            if(timePassed >= 5) {
                _hide()
                return
            }

            const imageCount = document.querySelectorAll('img')
            if(imageCount.length <= 2)
                return

            const complete = utils.didLoadAllImages()
            if(complete) {
                _hide()
            }
        }, 200, SCHEDULER_TAG)
    }

    const _hide = () => {
        scheduler.clearAllWithTag(SCHEDULER_TAG)
        setStatus(Status.HIDING)
        scheduler.schedule(() => {
            setStatus(Status.HIDDEN)
            setVisible(false)
        }, 400, SCHEDULER_TAG)
    }

    const _skip = () => {
        utils.addClassToBody('body-with-image')
        scheduler.clearAllWithTag(SCHEDULER_TAG)
        setStatus(Status.HIDDEN)
        setVisible(false)
    }

    return (
        <>
            {visible && (
                <div className={`loader loader-${status === Status.ANIMATING || status === Status.SHOWN ? 'visible' : 'hidden'}`}>
                    <div className={`loader-content text-white`}>
                        <img src={utils.resolvePath(`/images/svg/pacman.svg`)}
                             onLoad={() => {setDidLoadSvg(true)}}
                             className={`spinner ${spinnerClass}`}
                             alt={`loader`}/>

                        <div className={`loader-content-info ${contentInfoClass}`}>
                            <div className={`title-wrapper`}>
                                <img src={utils.resolvePath(`/images/svg/logo.svg`)}
                                     onLoad={() => {setDidLoadLogo(true)}}
                                     className={`logo me-3`}
                                     alt={`logo`}/>
                                <h5 dangerouslySetInnerHTML={{__html: title}}/>
                            </div>

                            <p  className={`opacity-50 text-4 text-center`}
                                dangerouslySetInnerHTML={{__html: subtitle}}/>
                        </div>
                    </div>
                </div>
            )}

            {status !== Status.ANIMATING && (
                <>{children}</>
            )}
        </>
    )
}

export default Preloader