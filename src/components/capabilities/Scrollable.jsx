import "./Scrollable.scss"
import React, {useEffect, useState} from 'react'
import Scrollbar from 'smooth-scrollbar'
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll'

import {useUtils} from "/src/helpers/utils.js"
import {useWindow} from "/src/providers/WindowProvider.jsx"

Scrollbar.use(OverscrollPlugin)

function Scrollable({ children, id, scrollEnabled, scrollActive }) {
    const utils = useUtils()
    const {isMobileLayout} = useWindow()
    const [pluginScrollbar, setPluginScrollbar] = useState(null)
    const canPluginScroll = pluginScrollbar && pluginScrollbar.limit.y > 0

    useEffect(() => {
        const supportsPlugin = !isMobileLayout()

        if(scrollEnabled && supportsPlugin) {
            _createPlugin()
        }
        else {
            _deactivatePlugin()
        }
    }, [scrollEnabled])

    useEffect(() => {
        const div = document.getElementById(id)
        if(!scrollActive || !div)
            return

        _scrollToTop()
    }, [scrollActive])

    const _createPlugin = () => {
        if(pluginScrollbar)
            return

        const target = document.getElementById(id)
        const scrollbar = Scrollbar.init(target, {
            damping: 0.2,
            renderByPixels: true,
            alwaysShowTracks: true,
            continuousScrolling: true,
            plugins: {
                overscroll: {
                    effect: 'glow',
                    glowColor: utils.getBootstrapColor('secondary')
                }
            }
        })

        setPluginScrollbar(scrollbar)
    }

    const _deactivatePlugin = () => {
        if(!pluginScrollbar)
            return

        const target = document.getElementById(id)
        Scrollbar.destroy(target)
        setPluginScrollbar(null)
    }

    const _scrollToTop = () => {
        const div = document.getElementById(id)
        if(!div)
            return
        if(pluginScrollbar)
            pluginScrollbar.scrollTo(0, 0)
        else
            div.scrollTop = 0
    }

    return (
        <div className={`custom-scrollable ${utils.strIf(!scrollEnabled || !canPluginScroll, `custom-scrollable-disabled`)}`}
             id={id}>
            <div className={`custom-scrollable-content`}>
                {children}
            </div>
        </div>
    )
}

export default Scrollable