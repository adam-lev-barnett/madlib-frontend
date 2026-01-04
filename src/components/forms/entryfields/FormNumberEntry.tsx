interface FormNumberEntryProps {
    labelId: string;
    prompt: string;
    placeHolder: string;
    minNumber: number;
    maxNumber: number;
}

function FormNumberEntry({labelId, prompt, placeHolder, minNumber, maxNumber}: FormNumberEntryProps) {
    return (
        <div>
            <label htmlFor={labelId}>{prompt}</label>
            <input
                type="number"
                id={labelId}
                name={labelId}
                placeholder={placeHolder}
                min={minNumber}
                max={maxNumber}
                required />
        </div>
    )
}

export default FormNumberEntry;