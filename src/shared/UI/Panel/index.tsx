import React, { ReactNode } from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames'
import CloseIcon from '@mui/icons-material/Close'
import { useScreenSizeStore } from '@/shared/store/screenSize'

interface Props {
    children: ReactNode
    isHidden: boolean
    setIsHidden: (value: boolean | ((prevState: boolean) => boolean)) => void
    onClose: () => void
    isStatic?: boolean
    width?: number
}

const Panel = ({
    children,
    isStatic = false,
    isHidden,
    setIsHidden,
    onClose,
    width = 50
}: Props) => {
    const { screenSize } = useScreenSizeStore()

    return (
        <div
            className={classNames(
                styles.panel,
                { [styles.static]: isStatic },
                { [styles.hidden]: isHidden }
            )}
            style={{ width: screenSize >= 992 ? `${width}%` : 'auto' }}
        >
            <button className={styles.closeButton} onClick={() => onClose()}>
                <CloseIcon className={styles.icon} />
            </button>
            {children}
        </div>
    )
}

export default Panel
