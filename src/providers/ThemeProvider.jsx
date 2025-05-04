import React, { createContext, useContext, useState, useEffect } from 'react'
import {useUtils} from "/src/helpers/utils.js"
import {useData} from "/src/providers/DataProvider.jsx"

const ThemeContext = createContext(null)
export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({children}) => {
    const {getSettings} = useData()

    const settings = getSettings()
    const allThemes = settings['supportedThemes'] || []
    const localStorageName = 'theme-preferences'
    const canChangeTheme = allThemes.length >= 2

    const [selectedThemeId, setSelectedThemeId] = useState(null)

    /** On configurations loaded... **/
    useEffect(() => {
        const savedThemeId = window.localStorage.getItem(localStorageName)
        const savedTheme = allThemes.find(theme => theme.id === savedThemeId)
        const defaultTheme = allThemes.find(theme => theme.default) || allThemes[0]

        selectTheme(savedTheme || defaultTheme)
    }, [])

    const selectTheme = (theme) => {
        if(!theme)
            return

        setSelectedThemeId(theme.id)
        document.documentElement.setAttribute('data-theme', theme.id)
        window.localStorage.setItem(localStorageName, theme.id)
    }

    const getSelectedTheme = () => {
        return allThemes.find(theme => theme.id === selectedThemeId)
    }

    const getAvailableThemes = () => {
        return allThemes.filter(theme => theme.id !== selectedThemeId)
    }

    const selectThemeWithId = (themeId) => {
        const theme = allThemes.find(theme => theme.id === themeId)
        selectTheme(theme)
    }

    return (
        <ThemeContext.Provider value={{
            selectTheme,
            canChangeTheme,
            getSelectedTheme,
            getAvailableThemes,
            selectThemeWithId
        }}>
            {selectedThemeId && (
                <>{children}</>
            )}
        </ThemeContext.Provider>
    )
}