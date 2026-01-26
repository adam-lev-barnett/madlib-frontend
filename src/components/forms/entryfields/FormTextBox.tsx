import type {ChangeEvent} from "react";
import './SmallFormFields.css'
/*
 * For small text entry form fields
 * Used primarily in ReplacementWordForm to generate parts-of-speech blocks to prompt users to enter replacement words for their madlibs
 */
interface FormTextBoxProps {
    labelId: string;
    prompt: string;
    minChars: number;
    maxChars: number;
    // Communicates with the DOM whenever anything is entered or removed; separate from form submission
    onChange: (text: string) => void;
}

function FormTextBox({labelId, prompt, minChars, maxChars, onChange}: FormTextBoxProps ) {
    return (
        <div>
            <label htmlFor={labelId}>{prompt}</label>
            <input
                type="text"
                id={labelId}
                name={labelId}
                minLength={minChars}
                maxLength={maxChars}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {onChange(event.target.value)}}
                required />
        </div>
    )
}

export default FormTextBox;