import { tlds } from '@/shared/constants'
import { Language } from '@/shared/types/languages'
import { useLanguage } from '@/app/providers/LanguageProvider'

type Schema = {
    [key: string]: FieldValidator
}

type Fields = {
    [key: string]: any
}

export type FieldError = string | null

export type FieldErrors = {
    [key: string]: FieldError
}

export type ObjectErrors = {
    [key: string]: FieldErrors | FieldError
}

type ValidatorFn = (value: any, values?: any) => FieldError

const localization = {
    isRequired: {
        [Language.EN]: 'This field is required',
        [Language.RU]: 'Обязательное поле'
    },
    invalidEmail: {
        [Language.EN]: 'Invalid email format',
        [Language.RU]: 'Неверный формат почты'
    },
    min: {
        [Language.EN]: 'Minimum length is {{length}}',
        [Language.RU]: 'Минимальная длина {{length}}'
    },
    max: {
        [Language.EN]: 'Maximum length is {{length}}',
        [Language.RU]: 'Максимальная длина {{length}}'
    },
    invalidNumber: {
        [Language.EN]: 'Invalid number format',
        [Language.RU]: 'Неверный формат числа'
    },
    invalidPhone: {
        [Language.EN]: 'Invalid phone number format',
        [Language.RU]: 'Неверный формат номера телефона'
    },
    mustBePositive: {
        [Language.EN]: 'Value must be positive',
        [Language.RU]: 'Значение должно быть положительным'
    },
    invalidFormat: {
        [Language.EN]: 'Invalid format',
        [Language.RU]: 'Неверный формат'
    },
    invalidLink: {
        [Language.EN]: 'Invalid URL format',
        [Language.RU]: 'Неверный формат URL'
    }
}

export class FieldValidator {
    private validators: ValidatorFn[] = []
    private language: Language

    constructor(language: Language) {
        this.language = language
    }

    isRequired(message: string = localization.isRequired[this.language]): this {
        this.validators.push((value) => (value ? null : message))
        return this
    }

    isEmail(message: string = localization.invalidEmail[this.language]): this {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        this.validators.push((value) =>
            typeof value === 'string' && emailRegex.test(value) ? null : message
        )
        return this
    }

    min(length: number, message: string = localization.min[this.language]): this {
        this.validators.push((value) =>
            typeof value === 'string' ? (value.length >= length ? null : message) : null
        )
        return this
    }

    max(length: number, message: string = localization.max[this.language]): this {
        this.validators.push((value) =>
            typeof value === 'string' ? (value.length <= length ? null : message) : null
        )
        return this
    }

    isNumber(message: string = localization.invalidNumber[this.language]): this {
        const regex = /^-?\d+(\.\d+)?$/
        this.validators.push((value) => {
            if (!value) {
                return null
            }
            return regex.test(String(value)) ? null : message
        })
        return this
    }

    isPositive(message: string = localization.mustBePositive[this.language]): this {
        this.validators.push((value) => {
            if (!value) {
                return null
            }
            const num = parseFloat(value)
            return !isNaN(num) && num > 0 ? null : message
        })
        return this
    }

    isMatch(regex: RegExp, message: string = localization.invalidFormat[this.language]): this {
        this.validators.push((value) =>
            typeof value === 'string' && regex.test(value) ? null : message
        )
        return this
    }

    custom(validatorFn: ValidatorFn): this {
        this.validators.push(validatorFn)
        return this
    }

    isPhoneNumber(message: string = localization.invalidPhone[this.language]): this {
        const phoneRegex = /^\+7\d{10}$/
        this.validators.push((value) =>
            typeof value === 'string' && phoneRegex.test(value) ? null : message
        )
        return this
    }

    isLink(message: string = localization.invalidLink[this.language]): this {
        const tldRegex = tlds.join('|')
        const urlRegex = new RegExp(
            `^(https?:\\/\\/)?` + // Протокол (необязательный)
                `([\\da-z.-]+)\\.(${tldRegex})` + // Домен и TLD
                `(\\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?$` // Путь (необязательный)
        )

        this.validators.push((value) =>
            typeof value === 'string' && urlRegex.test(value) ? null : message
        )
        return this
    }

    validate(value: any, values?: any): FieldError {
        for (const validator of this.validators) {
            const error = validator(value, values)

            if (error) {
                return error
            }
        }
        return null
    }
}

export const createFieldValidator = (language: Language) => new FieldValidator(language)

export class ObjectValidator {
    private schema: { [key: string]: FieldValidator | ObjectValidator }

    constructor(schema: { [key: string]: FieldValidator | ObjectValidator }) {
        this.schema = schema
    }

    validate(values: { [key: string]: any }): ObjectErrors {
        const errors: ObjectErrors = {}
        for (const key in this.schema) {
            if (this.schema.hasOwnProperty(key)) {
                const validator = this.schema[key]
                if (validator instanceof FieldValidator) {
                    const error = validator.validate(values[key], values)
                    if (error) {
                        errors[key] = error
                    }
                } else if (validator instanceof ObjectValidator) {
                    const nestedErrors = validator.validate(values[key])
                    if (Object.keys(nestedErrors).length > 0) {
                        // @ts-ignore
                        errors[key] = nestedErrors
                    }
                }
            }
        }
        return errors
    }
}

export const createObjectValidator = (schema: {
    [key: string]: FieldValidator | ObjectValidator
}) => new ObjectValidator(schema)

export const extractFieldError = (errors: ObjectErrors, path: string): string | null => {
    const keys = path.split(/[\.\[\]]/).filter((key) => key !== '')

    const getNestedError = (
        currentErrors: ObjectErrors | FieldError,
        keys: string[]
    ): FieldError => {
        if (keys.length === 0 || typeof currentErrors === 'string' || currentErrors === null) {
            return currentErrors as FieldError
        }

        const [firstKey, ...restKeys] = keys
        if (currentErrors[firstKey] === undefined) {
            return null
        }

        return getNestedError(currentErrors[firstKey], restKeys)
    }

    return getNestedError(errors, keys) as FieldError
}
