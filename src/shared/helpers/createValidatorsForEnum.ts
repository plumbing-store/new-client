import { createFieldValidator, createObjectValidator } from '@/shared/helpers/validators'

type Validator = ReturnType<typeof createObjectValidator> | ReturnType<typeof createFieldValidator>

export const createValidatorsForEnum = <T extends string>(
    enumValues: T[],
    fieldValidators: { [key: string]: Validator }
) => {
    return createObjectValidator(
        enumValues.reduce(
            (acc, value) => {
                return {
                    ...acc,
                    [value]: createObjectValidator(fieldValidators)
                }
            },
            {} as { [key in T]: Validator }
        )
    )
}
