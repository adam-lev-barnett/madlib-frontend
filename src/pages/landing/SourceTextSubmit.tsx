import FormNumberEntry from "../../components/forms/entryfields/FormNumberEntry.tsx";
import FormTextArea from "../../components/forms/entryfields/FormTextArea.tsx";
import Form from "../../components/forms/Form.tsx";
import './SourceTextSubmit.css'
import {type JSX, useState} from "react";

/*
* Creates unique form component for initiating madlib creation using a "skipper" so the Madlib Machine doesn't blank every word it sees
*/

interface SourceTextSubmitProps {
    onSubmit: (sourceText: string, skipper: number) => void;
}

function SourceTextSubmit({onSubmit}: SourceTextSubmitProps): JSX.Element {
    const [sourceText, setSourceText] = useState("");
    const [skipper, setSkipper] = useState(1);

    function handleSubmit() {
        onSubmit(sourceText, skipper);
    }

    return (
        <div>
            <h2>Madlibify your text!</h2>
            <Form
                actionUrl=""
                formId="sourceTextSubmit"
                formBody={""}
                formFields= {[
                    <FormNumberEntry
                        labelId="skipper-value"
                        minNumber={0}
                        maxNumber={10}
                        placeHolder="3"
                        prompt="How many madlibifiable words would you like to skip?"
                        onChange={(skipper: number) => setSkipper(skipper)}
                    />,
                    <div className="textBoxComponent">
                        <FormTextArea
                            placeholderText="Enter the text you wish to madlibify"
                            minLength={0}
                            maxLength={10000}
                            onChange={(sourceText: string) => setSourceText(sourceText)}/>
                    </div>
                ]}
                button={<input type="submit" value="Submit" />}
                onSubmit={handleSubmit}
            />
        </div>
    )
}



export default SourceTextSubmit;