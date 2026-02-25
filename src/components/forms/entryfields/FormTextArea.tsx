import './FormTextArea.css'
import type {ChangeEvent} from "react";

interface FormTextAreaProps {
    placeholderText: string,
    minLength: number,
    maxLength: number,
    onChange: (text: string) => void
}

function FormTextArea({placeholderText, minLength, maxLength, onChange}: FormTextAreaProps) {
    return (
        <textarea
            id="src-text"
            rows={8}
            minLength={minLength}
            maxLength={maxLength}
            placeholder={placeholderText}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                onChange(event.target.value);
            }}
        />
    )
}

export default FormTextArea;