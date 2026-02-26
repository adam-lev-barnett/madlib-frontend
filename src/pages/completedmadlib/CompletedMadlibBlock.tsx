import './CompletedMadlibBlock.css';

interface CompletedMadlibBlockProps {
    blankedText: string;
    replacementWords: string[];
}

function CompletedMadlibBlock({ blankedText, replacementWords }: CompletedMadlibBlockProps) {
    const segments = blankedText.split(/\[[^\]]+\]/g);

    const content = segments.map((segment, i) => (
        <span key={i}>
            {segment}
            {i < replacementWords.length && (
                <span
                    className="replaced-word"
                    style={{ animationDelay: `${i * 0.09}s` }}
                >
                    {replacementWords[i]}
                </span>
            )}
        </span>
    ));

    return (
        <section className="CompletedMadlib">
            <h2>Your completed Madlib</h2>
            <article>{content}</article>
        </section>
    );
}

export default CompletedMadlibBlock;
