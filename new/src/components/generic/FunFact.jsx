import "./FunFact.scss"
import React from 'react'
import CircleAvatar from "/src/components/generic/CircleAvatar.jsx"
import {useUtils} from "/src/helpers/utils.js"
import {useWindow} from "/src/providers/WindowProvider.jsx"

function FunFact({ img, fallbackIcon, fallbackIconColors, title, info }) {
    const utils = useUtils()
    const {getBreakpoint} = useWindow()

    let size = 2
    if(getBreakpoint() === 'xl')
        size = 3
    if(getBreakpoint() === 'xxl')
        size = 4

    return (
        <div className={`fun-fact text-center`}>
            <CircleAvatar size={size}
                          dynamicSize={false}
                          img={img}
                          fallbackIcon={fallbackIcon || 'fa-solid fa-heart'}
                          fallbackIconColors={fallbackIconColors || {
                              bg: utils.getRootSCSSVariable('theme-secondary'),
                              fill: utils.getRootSCSSVariable('theme-section-background')
                          }}/>

            <div className={`fun-fact-texts mt-3`}>
                <h5 className={`text-highlight fw-bold mb-1`} dangerouslySetInnerHTML={{__html: title}}/>
                <span className={`mt-0 text-2 font-family-subheadings fw-bold`} dangerouslySetInnerHTML={{__html: info}}/>
            </div>
        </div>
    )
}

export default FunFact