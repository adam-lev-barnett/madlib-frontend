import { useState } from 'react';
import './CompletedMadlibBlock.css';

interface CompletedMadlibBlockProps {
    blankedText: string;
    replacementWords: string[];
    onReset?: () => void;
}

function CompletedMadlibBlock({ blankedText, replacementWords, onReset }: CompletedMadlibBlockProps) {
    const [copied, setCopied] = useState(false);
    const segments = blankedText.split(/\[[^\]]+\]/g);

    const fullText = segments.reduce((acc, seg, idx) => {
        const word = idx < replacementWords.length ? replacementWords[idx] : "";
        return acc + seg + word;
    }, "");

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(fullText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback
        }
    };

    const content = segments.map((segment, i) => (
        <span key={i}>
            {segment}
            {i < replacementWords.length && (
                <span
                    className="replaced-word"
                    style={{ animationDelay: `${i * 0.5}s` }}
                >
                    {replacementWords[i]}
                </span>
            )}
        </span>
    ));

    return (
        <section className="CompletedMadlib">
            <header className="completed-header">
                <span className="completed-badge">— Formal Composition —</span>
                <h2>The Completed Madlib</h2>
                <div className="completed-ornament">✦</div>
            </header>
            <article className="completed-story-body">{content}</article>
            <footer className="completed-actions">
                <button
                    type="button"
                    className={`completed-btn copy-btn ${copied ? 'copied' : ''}`}
                    onClick={handleCopy}
                >
                    {copied ? "✓ Inscription Copied" : "Copy Inscription"}
                </button>
                {onReset && (
                    <button
                        type="button"
                        className="completed-btn reset-btn"
                        onClick={onReset}
                    >
                        Compose Another
                    </button>
                )}
            </footer>
        </section>
    );
}

export default CompletedMadlibBlock;
