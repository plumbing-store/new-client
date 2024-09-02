import { ObjectErrors } from '@/shared/helpers/validators'

export const handleValidation = (
    schema: any,
    values: any,
    setErrors: (errors: ObjectErrors) => void
): boolean => {
    const result = schema.validate(values)

    if (Object.values(result).some((value) => Boolean(value))) {
        setErrors(result)

        return true
    }

    return false
}
