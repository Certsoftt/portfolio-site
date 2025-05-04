import React from 'react'
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import DropdownPicker from "/src/components/generic/DropdownPicker.jsx"
import {useUtils} from "/src/helpers/utils.js"

function LanguagePicker({shrink}) {
    const utils = useUtils()
    const {setSelectedLanguage, getSelectedLanguage, getAvailableLanguages, canChangeLanguage} = useLanguage()

    const selectedLanguage = getSelectedLanguage()
    const availableLanguages = getAvailableLanguages()

    const _toDropdownOption = (language) => {
        return {
            id: language.id,
            label: language.name,
            imgUrl: utils.resolvePath(language["flagUrl"])
        }
    }

    const _onOptionSelected = (langId) => {
        const language = availableLanguages.find(language => language.id === langId)
        setSelectedLanguage(language)
    }

    return (
        <div>
            {canChangeLanguage && (
                <DropdownPicker selectedOption={_toDropdownOption(selectedLanguage)}
                                availableOptions={availableLanguages.map(_toDropdownOption)}
                                onOptionSelected={_onOptionSelected}
                                size={2}
                                tooltip={null}
                                alwaysForceDropdown={true}
                                shrink={shrink}/>
            )}
        </div>
    )
}

export default LanguagePicker