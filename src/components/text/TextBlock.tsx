import type {ReactNode} from "react";

/*
 * General text section component for easier bulk formatting
 */

interface TextSectionProps {
    heading: ReactNode;
    body: ReactNode;
    sectionName: string;
}

function TextSection({ heading, body, sectionName }: TextSectionProps) {
    return (
        <section className={sectionName}>
            <h2>{heading}</h2>
            <article>{body}</article>
        </section>
    )
}

export default TextSection;


