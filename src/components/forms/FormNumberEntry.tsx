interface FormNumberEntryProps {
    labelId: string;
    prompt: string;
    placeHolder: string;
    minNumber: number;
    maxNumber: number;
}

function FormNumberEntry(formNumberEntryProps: FormNumberEntryProps) {
    return (
        <div>
            <label htmlFor={formNumberEntryProps.labelId}>{formNumberEntryProps.prompt}</label>
            <input
                type="number"
                id={formNumberEntryProps.labelId}
                name={formNumberEntryProps.labelId}
                placeholder={formNumberEntryProps.placeHolder}
                min={formNumberEntryProps.minNumber}
                max={formNumberEntryProps.maxNumber}
                required />
        </div>
    )
}

export default FormNumberEntry;