import React, {useEffect, useState} from 'react'
import {Col} from "react-bootstrap"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import FilterTabs from "/src/components/generic/FilterTabs.jsx"

function Categorizable({ children, items, categories, storageId, onFilter, controlsClass }) {
    const {getString, getTranslation} = useLanguage()

    const [selectedCategoryId, setSelectedCategoryId] = useState(null)

    const tabsCategories = [
        {
            id: null,
            label: getString('all_categories'),
            count: items.length
        },
        ...categories.map(category => ({
            id: category.id,
            label: getTranslation(category['locales'], "plural"),
            count: items.filter(item => item['categoryId'] === category.id).length
        }))
    ]

    useEffect(() => {
        window.categorizableStates = window.categorizableStates || {}
        const _currentState = window.categorizableStates[storageId] || {}
        _selectCategory(_currentState.selectedCategoryId || null)
    }, [null, items])

    const _selectCategory = (categoryId) => {
        setSelectedCategoryId(categoryId)

        const filteredItems = categoryId ?
            items.filter(item => item['categoryId'] === categoryId) :
            items
        onFilter(filteredItems)

        if(!storageId)
            return

        window.categorizableStates = window.categorizableStates || {}
        window.categorizableStates[storageId] = {
            selectedCategoryId: categoryId
        }
    }

    return (
        <>
            <Col className={`col-12 mb-2 w-100 ${controlsClass}`}>
                <FilterTabs items={tabsCategories}
                            selectedItemId={selectedCategoryId}
                            onSelect={_selectCategory}/>
            </Col>

            {children}
        </>
    )
}

export default Categorizable