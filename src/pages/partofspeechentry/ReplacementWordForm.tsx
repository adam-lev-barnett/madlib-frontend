import FormTextBox from "../../components/forms/entryfields/FormTextBox.tsx";
import Form from "../../components/forms/Form";
import WordReplacementText from "./WordReplacementText.tsx";
import "./ReplacementWordForm.css";

export interface ReplacementWordFormProps {
    partsOfSpeech: string[];
    onWordChange: (i: number, replacementWord: string) => void;
    onSubmit: () => void;
    isPending: boolean;
}

const VOWELS = ['a', 'e', 'i', 'o', 'u'];

function ReplacementWordForm({ partsOfSpeech, onWordChange, onSubmit, isPending }: ReplacementWordFormProps) {
    const formFields = partsOfSpeech.map((pos, i) => (
        <div key={i} className="word-field-wrapper">
            <div className="word-field-tag">
                <span>{pos}</span>
                <span className="word-field-number">#{i + 1}</span>
            </div>
            <FormTextBox
                labelId={pos + i.toString()}
                prompt={VOWELS.includes(pos[0].toLowerCase()) ? `Enter an ${pos}` : `Enter a ${pos}`}
                minChars={0}
                maxChars={25}
                onChange={(newWord: string) => onWordChange(i, newWord)}
            />
        </div>
    ));

    return (
        <div id="replaceWords" className="replace-words-container">
            <WordReplacementText />
            <Form
                actionUrl=""
                formId="replaceWords"
                formFields={formFields}
                button={(
                    <input
                        type="submit"
                        value={isPending ? "Assembling Story…" : "Complete Madlib ✨"}
                        disabled={isPending}
                    />
                )}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default ReplacementWordForm;
