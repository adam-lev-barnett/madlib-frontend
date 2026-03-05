import FormTextBox from "../../components/forms/entryfields/FormTextBox.tsx";
import Form from "../../components/forms/Form";
import WordReplacementText from "./WordReplacementText.tsx";

export interface ReplacementWordFormProps {
    partsOfSpeech: string[];
    onWordChange: (i: number, replacementWord: string) => void;
    onSubmit: () => void;
    isPending: boolean;
}

const VOWELS = ['a', 'e', 'i', 'o', 'u'];

function ReplacementWordForm({ partsOfSpeech, onWordChange, onSubmit, isPending }: ReplacementWordFormProps) {
    const formFields = partsOfSpeech.map((pos, i) => (
        <div key={i}>
            <FormTextBox
                labelId={pos + i.toString()}
                prompt={VOWELS.includes(pos[0]) ? `Enter an ${pos}` : `Enter a ${pos}`}
                minChars={0}
                maxChars={25}
                onChange={(newWord: string) => onWordChange(i, newWord)}
            />
        </div>
    ));

    return (
        <div id="replaceWords">
                <WordReplacementText />
                <Form
                    actionUrl=""
                    formId="replaceWords"
                    formFields={formFields}
                    button={(<input type="submit" value="Submit" disabled={isPending} />)}
                    onSubmit={onSubmit}
                />
        </div>
    )
}

export default ReplacementWordForm;
