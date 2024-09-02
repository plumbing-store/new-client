import { useEffect, useState, useCallback } from 'react'
import { isEqual } from 'lodash'
import { handleValidation } from '@/shared/helpers/handleValidation'
import { ObjectErrors } from '@/shared/helpers/validators'
import { useResetValidation } from '@/shared/hooks/useResetValidation'

const useFormSubmit = (
    data: {
        initialValues?: any
        payload?: any
    },
    schema: any,
    onSubmit: (values: any) => Promise<void>
) => {
    const [values, setValues] = useState(data.payload || data.initialValues)
    const [errors, setErrors] = useState<ObjectErrors>({})
    const [isLoading, setIsLoading] = useState(false)

    // check
    const handleChange = useCallback((name: string, value: any) => {
        setValues((prevValues: any) => ({
            ...prevValues,
            [name]: value
        }))
    }, [])

    const handleSubmit = useCallback(async () => {
        if (schema) {
            const hasErrors = handleValidation(schema, values, setErrors)

            if (hasErrors) return
        }

        setIsLoading(true)

        try {
            await onSubmit(values)
        } finally {
            setIsLoading(false)
        }
    }, [schema, values, onSubmit])

    useEffect(() => {
        if (data.payload && !isEqual(data.payload, values)) {
            setValues(data.payload)
        }
    }, [data.payload, values])

    useEffect(() => {
        const handleKeyDown = async (event: KeyboardEvent) => {
            if (event.key === 'Enter' && !isLoading) {
                await handleSubmit()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleSubmit])

    useResetValidation([values], setErrors)

    let result: { [key: string]: any } = {
        errors,
        isLoading,
        handleSubmit,
        handleChange
    }

    if (data.initialValues) {
        result = {
            ...result,
            values
        }
    }

    return result
}

export default useFormSubmit
