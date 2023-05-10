import { useEffect, useMemo, useState } from 'react';

export function useForm(initialForm: any = {}, formValidations: any = {}) {
    const frmval: { [key: string]: number } = {}
    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setformValidation] = useState(frmval);

    useEffect(() => {
        createValidators();
    }, [formState])

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm])


    const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }
    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }
        return true;
    }, [formValidation])

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const createValidators = () => {
        const formCheckedValues: { [key: string]: number } = {};
        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessaje] = formValidations[formField];
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessaje
        }
        setformValidation(formCheckedValues);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}