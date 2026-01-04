import './FormTextArea.css'

interface FormTextAreaProps {
    placeholderText: string,
    minLength: number,
    maxLength: number,
}

function FormTextArea(formTextAreaProps: FormTextAreaProps) {
    return (
        <textarea
            id="src-text"
            rows={20}
            cols={75}
            minLength={formTextAreaProps.minLength}
            maxLength={formTextAreaProps.maxLength}
            placeholder={formTextAreaProps.placeholderText}
        />
    )
}

export default FormTextArea;