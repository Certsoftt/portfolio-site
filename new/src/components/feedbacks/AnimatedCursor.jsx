import "./AnimatedCursor.scss"
import React, {useEffect, useState} from 'react'
import FaIcon from "/src/components/generic/FaIcon.jsx"
import Tooltip from "/src/components/generic/Tooltip.jsx"
import {useUtils} from "/src/helpers/utils.js"

const CIRCLE_SIZE_IN_PIXELS = 75
const MIN_OPACITY = 0.1
const MAX_OPACITY = 0.6
const MIN_SCALE = 1
const MAX_SCALE = 3.0

const TARGET_CLASSES = [
    {name: 'scrollbar-track', icon: 'fa-solid fa-up-down'},
    {name: 'scrollbar-thumb', icon: 'fa-solid fa-up-down'},
    {name: 'menu-item', icon: null},
    {name: 'swiper-pagination-bullet', icon: null},
    {name: 'status-badge', icon: null}
]

const utils = useUtils()

function AnimatedCursor({enabled, active, modalOpen }) {
    const willRender = enabled && active

    const [targetX, setTargetX] = useState(0)
    const [targetY, setTargetY] = useState(0)
    const [hoveringDiv, setHoveringDiv] = useState(0)
    const [isClicked, setIsClicked] = useState(false)

    useEffect(() => {
        _createListeners()

        return () => {
            _destroyListeners()
        }
    }, [])

    useEffect(() => {
        if(modalOpen) {
            setHoveringDiv(null)
        }
    }, [modalOpen])

    const _createListeners = () => {
        if(!willRender)
            return

        window.addEventListener("mousedown", _onMouseDown)
        window.addEventListener("mousemove", _onMouseMove)
        window.addEventListener("mouseup", _onMouseUp)
    }

    const _destroyListeners = () => {
        window.removeEventListener("mousedown", _onMouseDown)
        window.removeEventListener("mousemove", _onMouseMove)
        window.removeEventListener("mouseup", _onMouseUp)
    }

    const _onMouseDown = (e) => {
        setIsClicked(true)
        _onAnyMouseEvent(e)
    }

    const _onMouseMove = (e) => {
        setTargetX(e.clientX)
        setTargetY(e.clientY)
        _onAnyMouseEvent(e)
    }

    const _onMouseUp = (e) => {
        setIsClicked(false)
        _onAnyMouseEvent(e)
    }

    const _onAnyMouseEvent = (e) => {
        let isHoveringInteractiveElement = false
        const target = e.target

        if(target) {
            if(target.matches('a') || target.matches('button')) {
                isHoveringInteractiveElement = true
            }

            for(const classInfo of TARGET_CLASSES) {
                if(e.target.classList.contains(classInfo.name)) {
                    isHoveringInteractiveElement = true
                }
            }
        }

        setHoveringDiv(isHoveringInteractiveElement ? e.target : null)
    }

    return (
        <>
            {willRender && (
                <div className={`animated-cursor`}>
                    <AnimatedCursorCircle targetX={targetX}
                                          targetY={targetY}
                                          hoveringDiv={hoveringDiv}
                                          isClicked={isClicked}/>

                    <AnimatedCursorTooltip hoveringDiv={hoveringDiv}/>
                </div>
            )}
        </>
    )
}

function AnimatedCursorCircle({ targetX, targetY, hoveringDiv, isClicked}) {
    const [curX, setCurX] = useState(targetX)
    const [curY, setCurY] = useState(targetY)
    const [curScale, setCurScale] = useState(1)
    const [curOpacity, setCurOpacity] = useState(1)
    const [curFaIcon, setCurFaIcon] = useState(null)
    const [dirty, setDirty] = useState(false)
    const [stoppedFor, setStoppedFor] = useState(0)

    useEffect(() => {
        const timeout = setInterval(() => {
            setDirty(true)
        }, 1000/60)

        return () => {
            clearInterval(timeout)
        }
    }, [])

    const _setVisible = (visible) => {
        const circleDiv = document.getElementById('animated-cursor-circle')
        if(!circleDiv)
            return

        if(visible)
            circleDiv.classList.remove(`d-none`)
        else
            circleDiv.classList.add(`d-none`)
    }

    const _setHighlighted = (highlighted) => {
        const circleDiv = document.getElementById('animated-cursor-circle')
        if(!circleDiv)
            return

        if(highlighted)
            circleDiv.classList.add(`animated-cursor-circle-highlight`)
        else
            circleDiv.classList.remove(`animated-cursor-circle-highlight`)
    }

    const _update = () => {
        const circleDiv = document.getElementById('animated-cursor-circle')
        if(!circleDiv || !dirty)
            return

        const dt = utils.isSafari() ? 1.25 : 1

        const isPositioned = targetX === curX && targetY === curY
        if(isPositioned)
            setStoppedFor(prevState => prevState + 1/60)
        else
            setStoppedFor(0)

        setDirty(false)
        _tween(curX, targetX, setCurX, 0.1*dt, 1)
        _tween(curY, targetY, setCurY, 0.1*dt, 1)
        _tween(curScale, _getTargetScale(), setCurScale, 0.2, 0.1)
        _tween(curOpacity, _getTargetOpacity(), setCurOpacity, 0.2, 0.025)
        _setHighlighted(Boolean(hoveringDiv))
        _detectIcon()

        circleDiv.style.transform = `translate3d(${curX - CIRCLE_SIZE_IN_PIXELS/2}px, ${curY - CIRCLE_SIZE_IN_PIXELS/2}px, 0) scale(${curScale/3})`
        circleDiv.style.opacity = curOpacity.toString()
    }

    const _getTargetScale = () => {
        let targetScale = MIN_SCALE
        if(hoveringDiv)
            targetScale = MIN_SCALE + (MAX_SCALE - MIN_SCALE)/2
        if(isClicked)
            targetScale = MAX_SCALE
        return targetScale
    }

    const _getTargetOpacity = () => {
        const stoppedMovingForHalfSecond = stoppedFor > 0.5
        const shouldHideCompletely = stoppedMovingForHalfSecond && !hoveringDiv

        let targetOpacity = 0
        if(!shouldHideCompletely)
            targetOpacity = MIN_OPACITY
        if(hoveringDiv)
            targetOpacity = (MAX_OPACITY - MIN_OPACITY)/2
        if(isClicked)
            targetOpacity += (MAX_OPACITY - MIN_OPACITY)/2
        return targetOpacity
    }

    const _tween = (currentValue, targetValue, setCurrentValue, multiplier, diffBreakpoint) => {
        const diff = targetValue - currentValue
        if(Math.abs(diff) > diffBreakpoint) {
            setCurrentValue(prevState => prevState + diff * multiplier)
        }
        else {
            setCurrentValue(targetValue)
        }
    }

    const _detectIcon = () => {
        if(!hoveringDiv) {
            if(!isClicked)
                setCurFaIcon(null)
            return
        }

        setCurFaIcon(null)

        for(const classInfo of TARGET_CLASSES) {
            if(hoveringDiv.classList.contains(classInfo.name)) {
                setCurFaIcon(classInfo.icon)
            }
        }
    }

    _update()

    return (
        <div className={`animated-cursor-circle`} id={`animated-cursor-circle`}>
            <FaIcon iconName={curFaIcon || 'fa-solid fa-circle'}
                           className={curFaIcon ? 'fa-icon' : 'fa-icon fa-icon-hidden'}/>
        </div>
    )
}

function AnimatedCursorTooltip({ hoveringDiv }) {
    const [dirty, setDirty] = useState(false)
    const [curLabel, setCurLabel] = useState('Label')
    const [timeoutDisplayId, setTimeoutDisplayId] = useState(-1)
    const [timeoutVisibilityId, setTimeoutVisibilityId] = useState(-1)

    const visible = hoveringDiv && curLabel

    useEffect(() => {
        const timeout = setInterval(() => {
            setDirty(true)
        }, 1000/60)

        return () => {
            clearInterval(timeout)
        }
    }, [])

    useEffect(() => {
        const tooltipDiv = document.getElementById('animated-cursor-tooltip')
        if(!tooltipDiv)
            return

        tooltipDiv.classList.add('d-none')
        tooltipDiv.classList.add('custom-tooltip-hidden')
        clearTimeout(timeoutDisplayId)
        clearTimeout(timeoutVisibilityId)
        if(!visible) {
            return
        }

        setTimeoutDisplayId(setTimeout(() => {
            tooltipDiv.classList.remove('d-none')
        }, 10))

        setTimeoutVisibilityId(setTimeout(() => {
            tooltipDiv.classList.remove('custom-tooltip-hidden')
        }, 50))

    }, [visible, curLabel])

    const _detectLabel = () => {
        if(!hoveringDiv)
            return

        if(hoveringDiv.matches('a') && hoveringDiv.href && hoveringDiv.href.includes('//') && utils.isUrlExternal(hoveringDiv.href)) {
            //setCurLabel("🔗")
            setCurLabel("")
            return
        }

        const tooltipContent = hoveringDiv.getAttribute('data-tooltip')
        if(tooltipContent) {
            setCurLabel(tooltipContent)
        }
        else {
            setCurLabel(null)
        }
    }

    const _update = () => {
        const circleDiv = document.getElementById('animated-cursor-circle')
        const tooltipDiv = document.getElementById('animated-cursor-tooltip')
        if(!circleDiv || !tooltipDiv || !dirty)
            return

        setDirty(false)
        _detectLabel()

        const circleBounds = circleDiv.getBoundingClientRect()
        const tooltipBounds = tooltipDiv.getBoundingClientRect()

        const newX = circleBounds.x + circleBounds.width/2 - tooltipBounds.width/2
        const newY = circleBounds.y - 35
        tooltipDiv.style.transform = `translate3d(${newX}px, ${newY}px, 0)`
    }

    _update()
    return (
        <Tooltip id={`animated-cursor-tooltip`} label={curLabel}/>
    )
}

export {AnimatedCursor}