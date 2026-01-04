import type {ReactNode} from "react";
import './form.css';

interface FormProps {
    actionUrl: string;
    formId: string;
    formBody?: ReactNode;

    // Allows for ordering of form elements
    formFields: ReactNode[];
    button?: ReactNode;
}

function Form(
    {actionUrl,
        formId,
        formBody,
        formFields,
        button}
    : FormProps) {

    return (
        <form
            id={formId}
            action={actionUrl}
            method="POST"
            className="form"
        >

            {formBody && (<section className="formBody"></section>)}

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