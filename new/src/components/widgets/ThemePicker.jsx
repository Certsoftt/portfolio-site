import React from 'react'
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import DropdownPicker from "/src/components/generic/DropdownPicker.jsx"
import {useTheme} from "/src/providers/ThemeProvider.jsx"

function ThemePicker({shrink}) {
    const {selectThemeWithId, canChangeTheme, getSelectedTheme, getAvailableThemes} = useTheme()
    const {getString} = useLanguage()

    const selectedTheme = getSelectedTheme()
    const availableThemes = getAvailableThemes()

    const _toDropdownOption = (theme) => {
        return {
            id: theme.id,
            faIcon: theme.icon,
            label: getString(theme.id)
        }
    }

    const _onOptionSelected = (themeId) => {
        selectThemeWithId(themeId)
    }

    return (
        <div>
            {canChangeTheme && (
                <DropdownPicker selectedOption={_toDropdownOption(selectedTheme)}
                                availableOptions={availableThemes.map(_toDropdownOption)}
                                onOptionSelected={_onOptionSelected}
                                size={2}
                                tooltip={getString('theme_' + selectedTheme.id)}
                                shrink={shrink}/>
            )}
        </div>
    )
}

export default ThemePicker