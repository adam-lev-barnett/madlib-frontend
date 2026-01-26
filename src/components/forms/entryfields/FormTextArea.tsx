import './FormTextArea.css'
import type {ChangeEvent} from "react";

/*
 * For text area form components (text entry longer than a single block)
 */
interface FormTextAreaProps {
    // Prompt text present before user input
    placeholderText: string,
    minLength: number,
    maxLength: number,
    onChange: (text: string) => void
}

function FormTextArea({placeholderText, minLength, maxLength, onChange}: FormTextAreaProps) {
    //TODO remove magic numbers from rows/cols
    return (
        <textarea
            id="src-text"
            rows={20}
            cols={75}
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