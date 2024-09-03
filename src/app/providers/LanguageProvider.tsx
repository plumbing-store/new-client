import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Language } from '@/shared/types/languages'

interface ILanguageContext {
    language: Language
    setLanguage: (language: Language) => void
}

const LanguageContext = createContext<ILanguageContext | undefined>(undefined)

interface Props {
    children: ReactNode
}

export const useLanguage = () => {
    const context = useContext(LanguageContext)

    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }

    return context
}

const LanguageProvider = ({ children }: Props) => {
    const [language, setLanguage] = useState<Language | null>(null)

    const saveLanguage = (language: Language) => {
        document.cookie = `language=${language}; path=/; max-age: 31536000`
    }

    useEffect(() => {
        const savedLanguage = document.cookie.replace(
            /(?:(?:^|.*;\s*)language\s*=\s*([^;]*).*$)|^.*$/,
            '$1'
        ) as Language

        if (savedLanguage) {
            setLanguage(savedLanguage)
        }
    }, [])

    useEffect(() => {
        if (language) {
            saveLanguage(language)
        }
    }, [language])

    return (
        <LanguageContext.Provider value={{ language: language || Language.RU, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

export default LanguageProvider
