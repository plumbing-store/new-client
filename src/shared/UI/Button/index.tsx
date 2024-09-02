import { ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'
import Loader from '@/shared/UI/Loader'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    fit?: boolean
    isLoading?: boolean
}

const Button = ({ className, isLoading, ...props }: Props) => {
    return (
        <button
            className={classNames(styles.button, className, { [styles.fit]: props.fit })}
            // check
            disabled={isLoading}
            {...props}
        >
            {isLoading ? <Loader size={20} /> : props.children}
        </button>
    )
}

export default Button
