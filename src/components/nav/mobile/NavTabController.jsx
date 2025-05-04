import "./NavTabController.scss"
import React, {useEffect, useState} from 'react'
import {useData} from "/src/providers/DataProvider.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useGlobalState} from "/src/providers/GlobalStateProvider.jsx"
import FaIcon from "/src/components/generic/FaIcon.jsx"
import {useWindow} from "/src/providers/WindowProvider.jsx"
import {useFeedbacks} from "/src/providers/FeedbacksProvider.jsx"
import SensitiveButton from "/src/components/generic/SensitiveButton.jsx"

function NavTabController() {
    const {isCategoryActive, setActiveSectionFromCategory} = useGlobalState()
    const {getCategories} = useData()
    const {isShowingSpinner} = useFeedbacks()
    const {hasFooterOffset, isMobileLayout} = useWindow()

    const categories = getCategories()
    const addOnClass = hasFooterOffset() ? `nav-tab-controller-with-offset` : ``

    const [clickedTabCategoryId, setClickedTabCategoryId] = useState(null)

    const _isActive = (category) => {
        if(isShowingSpinner())
            return false

        if(clickedTabCategoryId)
            return category.id === clickedTabCategoryId
        return isCategoryActive(category.id)
    }

    const _onCategoryTabClicked = (category) => {
        if(isCategoryActive(category.id)) {
            _onActiveCategoryClicked()
            return
        }

        _onCategorySelected(category)
    }

    const _onActiveCategoryClicked = () => {
        window.scrollTo(0, 0)
    }

    const _onCategorySelected = (category) => {
        if(clickedTabCategoryId)
            return

        setClickedTabCategoryId(category.id)
        setTimeout(() => { setActiveSectionFromCategory(category.id) }, 60)
        setTimeout(() => { setClickedTabCategoryId(null) }, 100)
    }

    return (
        <>
            {isMobileLayout() && (
                <div className={`nav-tab-controller ${addOnClass}`}>
                    {categories.map((category, key) => (
                        <NavTab category={category}
                                key={key}
                                active={_isActive(category)}
                                onClick={_onCategoryTabClicked}/>
                    ))}
                </div>
            )}
        </>
    )
}

function NavTab({category, active, onClick}) {
    const {getTranslation} = useLanguage()

    return (
        <SensitiveButton className={`nav-tab-btn ${active ? `nav-tab-btn-active` : ''}`}
                         onClick={() => { onClick(category) }}>
            <FaIcon iconName={category.faIcon}/>
            <span className={`mb-1`}>{getTranslation(category["locales"], "title")}</span>
        </SensitiveButton>
    )
}

export default NavTabController