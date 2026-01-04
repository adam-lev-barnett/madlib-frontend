
interface FormTextBoxProps {
    labelId: string;
    prompt: string;
    minChars: number;
    maxChars: number;
}

function FormTextBox({labelId, prompt, minChars, maxChars}: FormTextBoxProps ) {
    return (
        <div>
            <label htmlFor={labelId}>{prompt}</label>
            <input
                type="text"
                id={labelId}
                name={labelId}
                minLength={minChars}
                maxLength={maxChars}
                required />
        </div>
    )
}

export default FormTextBox;