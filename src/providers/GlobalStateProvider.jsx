import React, { createContext, useContext, useState, useEffect } from 'react'
import {useData} from "/src/providers/DataProvider.jsx"
import {useFeedbacks} from "/src/providers/FeedbacksProvider.jsx"
import {useScheduler} from "/src/helpers/scheduler.js"

const GlobalStateContext = createContext(null)
export const useGlobalState = () => useContext(GlobalStateContext)

export const GlobalStateProvider = ({children}) => {
    const {getSections, getCategories, getCategorySections} = useData()
    const {showActivitySpinner, hideActivitySpinner} = useFeedbacks()
    const scheduler = useScheduler()

    const [activeSectionId, setActiveSectionId] = useState(null)
    const [fixedNavigationEnabled, setFixedNavigationEnabled] = useState(true)
    const [didRenderFirstSection, setDidRenderFirstSection] = useState(false)

    const sections = getSections()
    const categories = getCategories()

    /** Loaded everything **/
    useEffect(() => {
        window.addEventListener('popstate', _updateSectionFromHash)
        window.addEventListener('hashchange', _updateSectionFromHash)
        _updateSectionFromHash()

        return () => {
            window.removeEventListener('popstate', _updateSectionFromHash)
            window.removeEventListener('hashchange', _updateSectionFromHash)
        }
    }, [])


    const setActiveSection = (sectionId) => {
        const section = sections.find(section => section.id === sectionId)
        if(!section)
            return

        _onSectionChange(section)
    }

    const _updateSectionFromHash = () => {
        const hash = window.location.hash.substring(1)

        let section = sections.find(section => section.id === hash)
        if(!section && sections.length) {
            section = sections[0]
        }

        _onSectionChange(section)
    }

    const _onSectionChange = (section) => {
        if(window.targetSectionId === section.id)
            return

        const timespan = new Date().getTime()
        const diff = timespan - (window.lastSectionChangeTimespan || timespan)
        const minWaitingTime = 800

        if(diff > minWaitingTime) {
            _makeSectionActive(section)
            return
        }

        const waitingTime = Math.max(minWaitingTime - diff, 300)
        showActivitySpinner('section-changing')

        scheduler.clearAllWithTag('section-state')
        scheduler.schedule(() => {
            _makeSectionActive(section)
        }, waitingTime, 'section-state')
    }

    const _makeSectionActive = (section) => {
        scheduler.clearAllWithTag('section-state')

        window.lastSectionChangeTimespan = new Date().getTime()
        window.targetSectionId = section.id
        window.location.hash = section.id
        setActiveSectionId(section.id)

        hideActivitySpinner('section-changing')

        if(section.category) {
            window.visitHistory = window.visitHistory || []
            window.visitHistory[section.category.id] = section.id
        }
    }

    const getActiveSection = () => {
        return sections.find(section => section.id === activeSectionId)
    }

    const isSectionActive = (sectionId) => {
        if(!activeSectionId)
            return false

        return activeSectionId === sectionId
    }

    const setActiveSectionFromCategory = (categoryId) => {
        if(isCategoryActive(categoryId))
            return

        const category = categories.find(category => category.id === categoryId)
        const sections = getCategorySections(category)

        if(!category || !sections || sections.length === 0)
            return

        const targetSectionId = window.visitHistory && window.visitHistory[categoryId] ?
            window.visitHistory[categoryId] :
            sections[0].id

        setActiveSection(targetSectionId)
    }

    const isCategoryActive = (categoryId) => {
        const displayingSection = getActiveSection()
        if(!displayingSection || !displayingSection.category)
            return false
        return displayingSection.category.id === categoryId
    }

    const getActiveCategory = () => {
        const section = getActiveSection()
        if(!section)
            return null
        return section.category
    }

    return (
        <GlobalStateContext.Provider value={{
            activeSectionId,
            setActiveSection,
            getActiveSection,
            isSectionActive,
            setActiveSectionFromCategory,
            isCategoryActive,
            getActiveCategory,
            fixedNavigationEnabled,
            setFixedNavigationEnabled,
            didRenderFirstSection,
            setDidRenderFirstSection
        }}>
            {activeSectionId && (
                <>{children}</>
            )}
        </GlobalStateContext.Provider>
    )
}