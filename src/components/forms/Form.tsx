import type {ReactNode} from "react";
import './Form.css';

/*
 * Full form template using a collection holding n number of fields via the formFields array.
 */

export interface FormProps {
    // Where the form is ultimately submitted
    actionUrl: string;
    formId: string;
    formBody?: ReactNode;

    // Because this is a template, the form fields components for each form appear as a collection that can then be parsed to display whatever fields are needed.
    /// Only use components from 'components/forms/entryfields'
    formFields: ReactNode[];

    button?: ReactNode;
    onSubmit?: () => void;
}

function Form(
    {actionUrl,
        formId,
        formBody,
        formFields,
        button,
        onSubmit}
    : FormProps) {

    return (
        <form
            id={formId}
            action={actionUrl}
            method="POST"
            className="form"
            onSubmit={(event) => {
                event.preventDefault();
                onSubmit?.();
            }}
        >
            {/* formBody might be optional depending on the use. If not included, created an empty section */}
            {formBody && (<section className="formBody"></section>)}

            {/* Map the collection of each field to pair them with their keys to maintain order. This is especially important for fields prompting replacement words */}
            <section className="formFields">
                {formFields.map((field, i) => (
                    <div key={i} className="formField">
                        {field}
                    </div>
                ))}
            </section>
            {button}
        </form>
    )
}

export default Form;