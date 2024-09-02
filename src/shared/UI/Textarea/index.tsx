import React, { TextareaHTMLAttributes } from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    hint?: string | null
    isValid?: boolean
}

const Textarea = ({ label, hint, isValid = true, ...props }: Props) => {
    return (
        <div className={styles.inputContainer}>
            <div className={styles.column}>
                <textarea
                    className={classNames(styles.input, { [styles.invalid]: !isValid })}
                    rows={5}
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

export default Textarea
