import './SmallFormFields.css'

/*
 * For forms with number fields. Used primarily for SourceTextSubmit to enter the "skipper"
 */

interface FormNumberEntryProps {
    labelId: string;
    prompt: string;
    placeHolder: string;
    minNumber: number;
    maxNumber: number;
    // Required to use state in SourceTextSubmit.tsx
    onChange: (value: number) => void;
}

function FormNumberEntry({labelId, prompt, placeHolder, minNumber, maxNumber, onChange}: FormNumberEntryProps) {
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
                onChange={(event) => {

                    // Need to parse number from string entry
                    const valueAsNumber = Number(event.target.value);

                    onChange(valueAsNumber);
                }}
                required />
        </div>
    )
}

export default FormNumberEntry;