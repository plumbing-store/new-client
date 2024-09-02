import { InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    hint?: string | null
    isValid?: boolean
}

const Input = ({ label, hint, maxLength = 100, isValid = true, ...props }: InputProps) => {
    return (
        <div className={styles.inputContainer}>
            <div className={styles.column}>
                <input
                    className={classNames(styles.input, { [styles.invalid]: !isValid })}
                    maxLength={maxLength}
                    {...props}
                />
                {label && (
                    <label className={classNames(styles.label, { [styles.invalid]: !isValid })}>
                        {label}
                    </label>
                )}
            </div>
            {hint && (
                <span className={classNames(styles.hint, { [styles.invalid]: !isValid })}>
                    {hint}
                </span>
            )}
        </div>
    )
}

export default Input
