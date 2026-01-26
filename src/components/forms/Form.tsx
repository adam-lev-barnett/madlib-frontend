import type {ReactNode} from "react";
import './Form.css';

export interface FormProps {
    actionUrl: string;
    formId: string;
    formBody?: ReactNode;
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