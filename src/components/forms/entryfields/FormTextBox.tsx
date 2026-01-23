import type {ChangeEvent} from "react";

interface FormTextBoxProps {
    labelId: string;
    prompt: string;
    minChars: number;
    maxChars: number;
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