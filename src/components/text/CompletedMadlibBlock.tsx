import type {ReactNode} from "react";
import './CompletedMadlibBlock.css';

/*
 * The final result after submitting the source text and the replacement words
 */
interface CompletedMadlibBlockProps {
    body: ReactNode;
}

function CompletedMadlibBlock({body}: CompletedMadlibBlockProps) {
    return (
        <section className="CompletedMadlib">
            <h2>Your completed Madlib</h2>
            <article>{body}</article>
        </section>
    )
}

export default CompletedMadlibBlock;


