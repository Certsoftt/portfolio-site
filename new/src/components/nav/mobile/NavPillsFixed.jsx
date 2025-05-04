import "./NavPillsFixed.scss"
import React from 'react'
import {useUtils} from "/src/helpers/utils.js"
import {useData} from "/src/providers/DataProvider.jsx"
import {useGlobalState} from "/src/providers/GlobalStateProvider.jsx"
import NavPills from "/src/components/nav/mobile/NavPills.jsx"
import {useWindow} from "/src/providers/WindowProvider.jsx"

function NavPillsFixed() {
    const {getActiveCategory, fixedNavigationEnabled} = useGlobalState()
    const {getCategorySections} = useData()
    const {scrollY, isBreakpoint} = useWindow()
    const utils = useUtils()

    const activeCategory = getActiveCategory()
    const activeCategorySections = getCategorySections(activeCategory)

    const div = document.getElementById('nav-mobile-top')
    const navMobileBounds = div && div.getBoundingClientRect() || 0
    const outsideOfBonds = utils.isElementOutsideBounds(div, 20)
    const shouldDisplay = activeCategory && getCategorySections(activeCategory).length > 1

    return (
        <>
            {!isBreakpoint('md') && shouldDisplay && scrollY > navMobileBounds.height - 10 && fixedNavigationEnabled && (
                <div id={`fixed-nav-pills-wrapper`} className={`fixed-nav-pills-wrapper ${utils.strIf(!outsideOfBonds, `fixed-nav-pills-wrapper-hidden`)}`}>
                    <NavPills sections={activeCategorySections}/>
                </div>
            )}
        </>
    )
}

export default NavPillsFixed