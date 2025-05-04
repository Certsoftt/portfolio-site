import "./MainSlider.scss"
import React from 'react'
import {useData} from "/src/providers/DataProvider.jsx"
import Section from "/src/components/layout/Section.jsx"
import {useWindow} from "/src/providers/WindowProvider.jsx"

function MainSlider() {
    const {getSections} = useData()
    const {hasFooterOffset} = useWindow()

    const sections = getSections()
    const addOnClassList = hasFooterOffset() ? `sections-slider-offset-bottom ` : ``

    return (
        <div className={`sections-slider highlight-scrollbar ${addOnClassList}`}>
            {sections.map((section, key) => {
                return (
                    <Section key={key} section={section}/>
                )
            })}
        </div>
    )
}

export default MainSlider