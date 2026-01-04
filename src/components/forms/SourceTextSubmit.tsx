import FormNumberEntry from "./FormNumberEntry.tsx";
import FormTextArea from "./FormTextArea.tsx";
import Form from "./Form.tsx";

/*
* Creates unique form component for initiating madlib creation using a "skipper" so the Madlib Machine doesn't blank every word it sees
*/

function SourceTextSubmit() {
    return (
        <div>
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