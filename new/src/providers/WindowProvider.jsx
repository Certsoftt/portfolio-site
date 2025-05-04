import React, {createContext, useContext, useEffect, useState} from 'react'
import {useUtils} from "/src/helpers/utils.js"
import {useScheduler} from "/src/helpers/scheduler.js"

const WindowContext = createContext(null)
export const useWindow = () => useContext(WindowContext)

const BREAKPOINT_VALUES = {
    xxs: 0,
    xs: 360,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
}

const TIMEOUT_STEP_IN_SECONDS = 0.1

const utils = useUtils()
const scheduler = useScheduler()

export const WindowProvider = ({children}) => {
    const [scrollX, setScrollX] = useState(0)
    const [scrollY, setScrollY] = useState(0)
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    const [innerHeight, setInnerHeight] = useState(window.innerHeight)
    const [currentTimeSpan, setCurrentTimeSpan] = useState(0)
    const [didCreateListeners, setDidCreateListeners] = useState(false)

    useEffect(() => {
        _createListeners()

        return () => {
            _destroyListeners()
        }
    }, [])

    const _createListeners = () => {
        window.addEventListener('scroll', _onScroll)
        window.addEventListener('resize', _onResize)
        window.addEventListener('keydown', _onKeyDown)
        _onScroll()
        _onResize()

        scheduler.clearAllWithTag('window-provider')
        scheduler.interval(() => {
            _onTick()
        }, TIMEOUT_STEP_IN_SECONDS * 1000, 'window-provider')

        setDidCreateListeners(true)
    }

    const _destroyListeners = () => {
        window.removeEventListener('scroll', _onScroll)
        window.removeEventListener('resize', _onResize)
        window.removeEventListener('keydown', _onKeyDown)
        scheduler.clearAllWithTag('window-provider')
        setDidCreateListeners(false)
    }

    const _onScroll = () => {
        setScrollX(window.scrollX)
        setScrollY(window.scrollY)
    }

    const _onResize = () => {
        setInnerWidth(window.innerWidth)
        setInnerHeight(window.innerHeight)
    }

    const _onTick = () => {
        setCurrentTimeSpan(prevTimer => prevTimer + TIMEOUT_STEP_IN_SECONDS)
    }

    const _onKeyDown = (event) => {
        switch (event.key) {
            case 'ArrowUp':
            case 'ArrowDown':
                focusMainView()
                break
        }
    }

    const isBreakpoint = (breakpoint) => {
        return innerWidth >= BREAKPOINT_VALUES[breakpoint]
    }

    const getBreakpoint = () => {
        const width = innerWidth
        if (width < BREAKPOINT_VALUES.sm) return 'xs'
        if (width < BREAKPOINT_VALUES.md) return 'sm'
        if (width < BREAKPOINT_VALUES.lg) return 'md'
        if (width < BREAKPOINT_VALUES.xl) return 'lg'
        if (width < BREAKPOINT_VALUES.xxl) return 'xl'
        return 'xxl'
    }

    const isMobileLayout = () => {
        return !isBreakpoint(utils.getRootSCSSVariable('mobile-layout-breakpoint') || 'md')
    }

    const hasFooterOffset = () => {
        return utils.isIOS() && utils.isChrome()
    }

    const focusMainView = () => {
        const scrollable = document.querySelector('.custom-scrollable')
        const modal = document.querySelector('.custom-modal')
        if(!scrollable || utils.isTouchDevice() || modal)
            return

        scrollable.focus()
    }

    return (
        <WindowContext.Provider value={{
            scrollX,
            scrollY,
            innerWidth,
            innerHeight,
            currentTimeSpan,
            isBreakpoint,
            getBreakpoint,
            isMobileLayout,
            hasFooterOffset,
            focusMainView
        }}>
            {didCreateListeners && (
                <>{children}</>
            )}
        </WindowContext.Provider>
    )
}