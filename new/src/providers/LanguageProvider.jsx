import React, {createContext, useContext, useEffect, useState} from 'react'
import {useData} from "/src/providers/DataProvider.jsx"

const LanguageContext = createContext(null)
export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({children}) => {
    const {getSettings, getStrings} = useData()

    const settings = getSettings()
    const strings = getStrings()
    const allLanguages = settings['supportedLanguages'] || []
    const localStorageName = 'language-preferences'
    const canChangeLanguage = allLanguages.length >= 2

    const [defaultLanguageId, setDefaultLanguageId] = useState(null)
    const [selectedLanguageId, setSelectedLanguageId] = useState(null)

    /** On configurations loaded... **/
    useEffect(() => {
        const defaultLanguage = allLanguages.find(language => language.default) || allLanguages[0]
        setDefaultLanguageId(defaultLanguage.id)

        const localStorageItem = window.localStorage.getItem(localStorageName)
        const savedLanguage = allLanguages.find(language => language.id === localStorageItem)
        if(savedLanguage) {
            setSelectedLanguage(savedLanguage)
            return
        }

        const detectedLanguage = allLanguages.find(language => navigator.language.includes(language['id'])) || defaultLanguage
        setSelectedLanguage(detectedLanguage)
    }, [])

    const setSelectedLanguage = (language) => {
        if(language) {
            setSelectedLanguageId(language.id)
            window.localStorage.setItem(localStorageName, language.id.toString())
        }
    }

    const getSelectedLanguage = () => {
        return allLanguages.find(language => language.id === selectedLanguageId)
    }

    const getAvailableLanguages = () => {
        if(!allLanguages)
            return []

        return allLanguages.filter(language => language.id !== selectedLanguageId)
    }

    const getTranslation = (locales, key, shouldReturnNullIfNotFound) => {
        if(!selectedLanguageId || !locales)
            return "locale:" + key

        const selectedLanguageTranslations = locales[selectedLanguageId]
        if(selectedLanguageTranslations && selectedLanguageTranslations[key]) {
            return selectedLanguageTranslations[key]
        }

        const defaultLanguageTranslations = locales[defaultLanguageId]
        if(defaultLanguageTranslations && defaultLanguageTranslations[key]) {
            return defaultLanguageTranslations[key]
        }

        return !shouldReturnNullIfNotFound ?
            "locale:" + key :
            null
    }

    const getString = (key) => {
        return getTranslation(strings['locales'], key)
    }

    return (
        <LanguageContext.Provider value={{
            selectedLanguageId,
            canChangeLanguage,
            setSelectedLanguage,
            getSelectedLanguage,
            getAvailableLanguages,
            getTranslation,
            getString
        }}>
            {selectedLanguageId && (
                <>{children}</>
            )}
        </LanguageContext.Provider>
    )
}