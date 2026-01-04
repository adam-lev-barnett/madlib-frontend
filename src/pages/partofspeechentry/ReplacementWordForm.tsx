import FormTextBox from "../../components/forms/entryfields/FormTextBox.tsx";
import Form from "../../components/forms/Form";
import type {ReactNode} from "react";

export interface ReplacementWordFormProps {
    partsOfSpeech: string[];
}

function ReplacementWordForm({ partsOfSpeech }: ReplacementWordFormProps) {

    const formFields: ReactNode[] = [];
    for (let i = 0; i < partsOfSpeech.length; i++) {
        formFields.push(
            <div key={i}>

                <FormTextBox
                    labelId={partsOfSpeech[i] + i.toString()}
                    prompt={ "Enter a" + partsOfSpeech[i] }
                    minChars={0}
                    maxChars={25}
                />
            </div>
        )
    }

    return (
        <div id="replaceWords">
            <h2>Fill in your Madlib!</h2>
            <Form
                actionUrl=""
                formId="replaceWords"
                formFields={formFields}
                button={(<input type="button" value="Submit" />)}
            />
        </div>
    )
}

export default ReplacementWordForm;
