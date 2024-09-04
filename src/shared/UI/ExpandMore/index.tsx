import React from 'react'
import styles from './styles.module.scss'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import classNames from 'classnames'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    isExpanded: boolean
}

const ExpandMore = ({ isExpanded }: Props) => {
    return (
        <button className={classNames(styles.button, { [styles.expanded]: isExpanded })}>
            <ExpandMoreIcon />
        </button>
    )
}

export default ExpandMore
