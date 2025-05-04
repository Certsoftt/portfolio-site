import "./NavSidebar.scss"
import React, {useEffect, useState} from 'react'
import Box from "/src/components/wrappers/Box.jsx"
import {useUtils} from "/src/helpers/utils.js"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useData} from "/src/providers/DataProvider.jsx"
import {useTheme} from "/src/providers/ThemeProvider.jsx"
import {useGlobalState} from "/src/providers/GlobalStateProvider.jsx"
import ToolButton from "/src/components/generic/ToolButton.jsx"
import NavHeader from "/src/components/nav/desktop/NavHeader.jsx"
import {NavSidebarGroup, NavSidebarGroupItem} from "/src/components/nav/desktop/NavSidebarGroup"
import LanguagePicker from "/src/components/widgets/LanguagePicker.jsx"
import ThemePicker from "/src/components/widgets/ThemePicker.jsx"
import CursorToggleButton from "/src/components/widgets/CursorToggleButton.jsx"
import NavLink from "/src/components/nav/desktop/NavLink.jsx"
import {useWindow} from "/src/providers/WindowProvider.jsx"
import {useFeedbacks} from "/src/providers/FeedbacksProvider.jsx"

function NavSidebar() {
    const utils = useUtils()

    const [shrinkSelected, setShrinkSelected] = useState(false)
    const [canExpand, setCanExpand] = useState(true)
    const {getSections} = useData()
    const {isBreakpoint} = useWindow()
    const {getString} = useLanguage()

    const sections = getSections()
    const shouldShrink = shrinkSelected || !canExpand

    useEffect(() => {
        setCanExpand(isBreakpoint('lg'))
    }, [isBreakpoint('lg')])


    const _toggle = () => {
        setShrinkSelected(!shrinkSelected)
    }

    return (
        <Box nav={true} className={`sidebar highlight-scrollbar ${utils.strIf(shouldShrink, 'sidebar-shrink')}`}>
            {canExpand && (
                <ToolButton className={`btn-toggle`}
                            icon={shouldShrink ? "fa-solid fa-caret-right" : "fa-solid fa-caret-left"}
                            size={shouldShrink ? 1 : 2}
                            tooltip={getString('toggle_sidebar')}
                            onClick={_toggle}/>
            )}

            <div className={`sidebar-content d-flex h-100 flex-column`}>
                <NavHeader shrink={shouldShrink}/>
                {isBreakpoint('md') && (
                    <>
                        <NavSidebarLinks shouldShrink={shouldShrink} sections={sections}/>
                        <NavSidebarBottomMenu shouldShrink={shouldShrink}/>
                    </>
                )}
            </div>
        </Box>
    )
}

function NavSidebarLinks({shouldShrink, sections}) {
    const {getTranslation} = useLanguage()
    const {isSectionActive, setActiveSection} = useGlobalState()
    const {isShowingSpinner} = useFeedbacks()

    const [selectedItemSectionId, setSelectedItemSectionId] = useState(null)

    const _isActive = (section) => {
        if(isShowingSpinner())
            return false

        if(selectedItemSectionId)
            return section.id === selectedItemSectionId
        return isSectionActive(section.id)
    }

    const _setActive = (section) => {
        if(selectedItemSectionId)
            return

        setSelectedItemSectionId(section.id)
        setTimeout(() => { setActiveSection(section.id) }, 60)
        setTimeout(() => { setSelectedItemSectionId(null) }, 100)
    }

    return (
        <NavSidebarGroup direction={`vertical`} shrink={shouldShrink} className={`mt-3`} fillSpace={true}>
            {sections.map((section, key) => (
                <NavSidebarGroupItem key={key} visible={true}>
                    <NavLink shrink={shouldShrink}
                             label={getTranslation(section.content["locales"], "title_menu", true) || getTranslation(section.content["locales"], "title")}
                             icon={section.faIcon}
                             size={1}
                             className={`px-4`}
                             disabled={_isActive(section)}
                             selected={_isActive(section)}
                             onClick={() => {_setActive(section)}}/>
                </NavSidebarGroupItem>
            ))}
        </NavSidebarGroup>
    )
}

function NavSidebarBottomMenu({shouldShrink}) {
    const {canChangeLanguage} = useLanguage()
    const {canChangeTheme} = useTheme()
    const {isAnimatedCursorEnabled} = useFeedbacks()

    return (
        <NavSidebarGroup direction={`horizontal`} shrink={shouldShrink}>
            <NavSidebarGroupItem visible={canChangeLanguage}>
                <LanguagePicker shrink={true}/>
            </NavSidebarGroupItem>

            <NavSidebarGroupItem visible={canChangeTheme}>
                <ThemePicker shrink={true}/>
            </NavSidebarGroupItem>

            {!shouldShrink && (
                <NavSidebarGroupItem visible={isAnimatedCursorEnabled()}>
                    <CursorToggleButton/>
                </NavSidebarGroupItem>
            )}
        </NavSidebarGroup>
    )
}

export default NavSidebar