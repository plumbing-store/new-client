import AuthProvider from '@/app/providers/AuthProvider'
import StoreProvider from '@/app/providers/StoreProvider'
import ModeProvider from '@/app/providers/ModeProvider'
import LanguageProvider from '@/app/providers/LanguageProvider'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <LanguageProvider>
            <ModeProvider>{children}</ModeProvider>
        </LanguageProvider>
    )
}

export default Providers
