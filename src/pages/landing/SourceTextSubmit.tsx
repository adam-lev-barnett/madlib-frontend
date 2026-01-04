import FormNumberEntry from "../../components/forms/entryfields/FormNumberEntry.tsx";
import FormTextArea from "../../components/forms/entryfields/FormTextArea.tsx";
import Form from "../../components/forms/Form.tsx";
import './SourceTextSubmit.css'

/*
* Creates unique form component for initiating madlib creation using a "skipper" so the Madlib Machine doesn't blank every word it sees
*/

function SourceTextSubmit() {
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
                    />,
                    <div className="textBoxComponent">
                        <FormTextArea placeholderText="Enter the text you wish to madlibify" minLength={0} maxLength={2000}/>
                    </div>
                ]}
                button={<input type="submit" value="Submit" />}
            />
        </div>
    )
}

export default SourceTextSubmit;