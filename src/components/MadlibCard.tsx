import "./MadlibCard.css";
import type { SavedMadlibResponse } from "../types/SavedMadlibResponse";

interface MadlibCardProps {
    madlib: SavedMadlibResponse;
}

// Extracts the replacement words from completedText by aligning it against the
// blankedText template (e.g. "The [ADJECTIVE] dog" + "The quick dog" → ["quick"]).
function extractReplacementWords(blankedText: string, completedText: string): string[] {
    const segments = blankedText.split(/\[[^\]]+\]/g);
    const words: string[] = [];
    let pos = 0;

    for (let i = 0; i < segments.length - 1; i++) {
        pos += segments[i].length;
        const nextSeg = segments[i + 1];
        if (nextSeg === "") {
            words.push(completedText.slice(pos));
            break;
        }
        const nextSegStart = completedText.indexOf(nextSeg, pos);
        if (nextSegStart === -1) return [];
        words.push(completedText.slice(pos, nextSegStart));
        pos = nextSegStart;
    }

    return words;
}

export default function MadlibCard({ madlib }: MadlibCardProps) {
    const formattedDate = madlib.createdAt
        ? new Date(madlib.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
          })
        : null;

    const renderText = () => {
        if (!madlib.blankedText) {
            return <p className="madlib-card-text">{madlib.completedText}</p>;
        }
        const segments = madlib.blankedText.split(/\[[^\]]+\]/g);
        const words = extractReplacementWords(madlib.blankedText, madlib.completedText);
        const content = segments.map((segment, i) => (
            <span key={i}>
                {segment}
                {i < words.length && (
                    <span className="card-replaced-word">{words[i]}</span>
                )}
            </span>
        ));
        return <p className="madlib-card-text">{content}</p>;
    };

    return (
        <div className="madlib-card">
            {formattedDate && <p className="madlib-card-date">{formattedDate}</p>}
            {renderText()}
        </div>
    );
}
