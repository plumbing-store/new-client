import AuthProvider from '@/app/providers/AuthProvider'
import StoreProvider from '@/app/providers/StoreProvider'
import ModeProvider from '@/app/providers/ModeProvider'
import LanguageProvider from '@/app/providers/LanguageProvider'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
    components: {
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: 'var(--color-dark);'
                }
            }
        }
    }
})

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <LanguageProvider>
            <ModeProvider>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </ModeProvider>
        </LanguageProvider>
    )
}

export default Providers
