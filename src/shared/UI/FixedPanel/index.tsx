import React, { ReactNode } from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames'
import CloseIcon from '@mui/icons-material/Close'

interface Props {
    isHidden: boolean
    setIsHidden: (value: boolean | ((prevState: boolean) => boolean)) => void
    onClose: () => void
    children: ReactNode
}

const FixedPanel = ({ isHidden, setIsHidden, children, onClose }: Props) => {
    return (
        <div className={classNames(styles.panel, { [styles.hidden]: isHidden })}>
            <button className={styles.closeButton} onClick={() => onClose()}>
                <CloseIcon className={styles.icon} />
            </button>
            {children}
        </div>
    )
}

export default FixedPanel
