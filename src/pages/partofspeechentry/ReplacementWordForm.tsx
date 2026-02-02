import FormTextBox from "../../components/forms/entryfields/FormTextBox.tsx";
import Form from "../../components/forms/Form";
import type {ReactNode} from "react";
import WordReplacementText from "./WordReplacementText.tsx";

export interface ReplacementWordFormProps {
    partsOfSpeech: string[];
    onWordChange: (i: number, replacementWord: string) => void;
    onSubmit: () => void;


}

function ReplacementWordForm({ partsOfSpeech, onWordChange, onSubmit }: ReplacementWordFormProps) {

    /* Propagate index and replacement word from FormTextBox's onChange to WordReplacementPage-->Landing Page
    *  This will populate the replacement word array that fills out the madlib for final generation
    */
    function handleChange(index: number, replacementWord: string) {
        onWordChange(index, replacementWord);
    }


    /*
     * Create a list of text box fields from x number of parts of speech passed to ReplacementWordForm from the Landing Page via SourceTextSubmit form
     * Label each with a prompt asking for a replacement word for the given part of speech
    */
    const formFields: ReactNode[] = [];
    for (let i = 0; i < partsOfSpeech.length; i++) {
        formFields.push(
            <div key={i}>

                <FormTextBox
                    labelId={partsOfSpeech[i] + i.toString()}
                    // Ensure correct use of 'a' versus 'an'
                    prompt={ (!['a', 'e', 'i', 'o', 'u'].includes(partsOfSpeech[i][0])) ? "Enter a " + partsOfSpeech[i] : "Enter an " + partsOfSpeech[i] }
                    minChars={0}
                    maxChars={25}
                    onChange={(newWord: string) => handleChange(i, newWord)}
                />
            </div>
        )
    }

    return (
        <div id="replaceWords">
                <WordReplacementText />
                <Form
                    formBody="Now that you've submitted your source text, you'll be prompted to fill in words to replace the ones blanked out by the machine! Afterwards, you'll receive the completed madlibification of the text."
                    actionUrl=""
                    formId="replaceWords"
                    formFields={formFields}
                    button={(<input type="submit" value="Submit" />)}
                    onSubmit={onSubmit}
                />
        </div>
    )
}

export default ReplacementWordForm;
