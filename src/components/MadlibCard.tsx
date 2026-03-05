import "./MadlibCard.css";
import type { SavedMadlibResponse } from "../types/SavedMadlibResponse";

interface MadlibCardProps {
    madlib: SavedMadlibResponse;
}

export default function MadlibCard({ madlib }: MadlibCardProps) {
    const formattedDate = madlib.createdAt
        ? new Date(madlib.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
          })
        : null;

    return (
        <div className="madlib-card">
            {formattedDate && <p className="madlib-card-date">{formattedDate}</p>}
            <p className="madlib-card-text">{madlib.completedText}</p>
        </div>
    );
}
