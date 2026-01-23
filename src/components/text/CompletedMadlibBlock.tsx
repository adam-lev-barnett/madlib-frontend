import type {ReactNode} from "react";
import './CompletedMadlibBlock.css';

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


