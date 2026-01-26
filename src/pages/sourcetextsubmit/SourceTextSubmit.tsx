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

    /* Empty text submission still results in word replacement form, but there aren't any fields to submit, resulting in a blank completed madlib*/
    const [sourceText, setSourceText] = useState("");

    /*
    *  Skipper defines how many madlibifiable words are skipped (nouns, verbs, adjectives, adverbs - accepted parts of speech are definable in the back end)
    *  A skipper of 1 blanks out every other word in a madlib. The longer the madlib, the higher the skipper value should be if a user wants to maintain the original
    *  context of the source text so that it's not just its own narrative with silly words. Though, the user can do that if they want.
    *  If the skipper is higher than the number of madlibifiable words, the app returns an unaltered madlib
    */
    const [skipper, setSkipper] = useState(1);

    /* Passes submission functionality to the Landing Page to submit to the backend endpoint */
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
                        {/* Determine maximum length of string user can submit. Keep this high if you want users to be able to submit longer madlibs like short stories*/}
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