import "./FilterTabs.scss"
import React, {useState} from 'react'
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import SensitiveButton from "/src/components/generic/SensitiveButton"

function FilterTabs({items, selectedItemId, onSelect}) {
    const _onTabClicked = (item) => {
        if(onSelect) {
            onSelect(item.id)
        }
    }

    return (
        <div className="filter-tabs">
            <div className={`btn-group`} role={`group`}>
                {items.map((item, key) => (
                    <FilterTabButton key={key}
                                     item={item}
                                     isSelected={item.id === selectedItemId}
                                     onClick={_onTabClicked}/>
                ))}
            </div>
        </div>
    )
}

function FilterTabButton({item, isSelected, onClick}) {
    const {getString} = useLanguage()

    const customBtnClass = isSelected ? `btn-selected` : null
    const tooltipText = getString('filter_by').replace('{x}', item.label)
    const label = item.label + (item.count ? ` (${item.count})` : '')

    const _onClick = (e) => {
        onClick(item)
    }

    return (
        <SensitiveButton className={`btn btn-primary text-1 ${customBtnClass}`}
                         onClick={_onClick}
                         tooltipText={tooltipText}>
            <span>{label}</span>
        </SensitiveButton>
    )
}

export default FilterTabs