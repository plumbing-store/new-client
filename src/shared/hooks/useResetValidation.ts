import { useEffect } from 'react'
import { ObjectErrors } from '@/shared/helpers/validators'

export const useResetValidation = (
    dependencies: any[],
    setErrors: (errors: ObjectErrors) => void
) => {
    useEffect(() => {
        setErrors({})
    }, dependencies)
}
