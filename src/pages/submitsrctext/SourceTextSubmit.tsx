import FormTextArea from "../../components/forms/entryfields/FormTextArea.tsx";
import Form from "../../components/forms/Form.tsx";
import './SourceTextSubmit.css'
import { type JSX, useState, useCallback } from "react";

interface SourceTextSubmitProps {
    onSubmit: (sourceText: string, skipper: number) => void;
    isPending: boolean;
}

/* Determines how many words are blanked */
function skipperDescriptor(skipper: number): string {
    if (skipper === 1) return 'maximum chaos — blank every word';
    if (skipper <= 2)  return 'heavy — lots of blanks';
    if (skipper <= 4)  return 'classic madlib feel';
    if (skipper <= 6)  return 'light — fewer blanks';
    return 'sprinkle — barely any blanks';
}

function SourceTextSubmit({ onSubmit, isPending }: SourceTextSubmitProps): JSX.Element {
    const [sourceText, setSourceText] = useState("");
    const [skipper, setSkipper] = useState(3);

    const handleSubmit = useCallback(() => {
        onSubmit(sourceText, skipper);
    }, [onSubmit, sourceText, skipper]);

    return (
        <div>
            <Form
                actionUrl=""
                formId="sourceTextSubmit"
                formBody={<h2>Madlibify your text!</h2>}
                formFields={[
                    <div className="skipper-field">
                        <label className="skipper-label">
                            Blank density
                            <span className="skipper-value-chip">{skipper}</span>
                        </label>
                        <div className="skipper-slider-row">
                            <span className="skipper-axis-label">more blanks</span>
                            <input
                                type="range"
                                min={1}
                                max={9}
                                value={skipper}
                                onChange={(e) => setSkipper(Number(e.target.value))}
                                className="skipper-slider"
                            />
                            <span className="skipper-axis-label">fewer blanks</span>
                        </div>
                        <p className="skipper-descriptor">{skipperDescriptor(skipper)}</p>
                    </div>,
                    <div className="textBoxComponent">
                        <FormTextArea
                            placeholderText="Enter the text you wish to madlibify"
                            minLength={0}
                            maxLength={2000}
                            onChange={(sourceText: string) => setSourceText(sourceText)}
                        />
                    </div>,
                ]}
                button={<input type="submit" value="Submit" disabled={isPending} />}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

export default SourceTextSubmit;
