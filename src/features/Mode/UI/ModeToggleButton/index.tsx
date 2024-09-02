import React from 'react'
import { Mode, useMode } from '@/app/providers/ModeProvider'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

const ModeToggleButton = () => {
    const { mode, toggleMode } = useMode()

    return (
        <button onClick={toggleMode}>
            {mode === Mode.Light ? <DarkModeIcon /> : <LightModeIcon />}
        </button>
    )
}

export default ModeToggleButton
