import MadlibCard from "../../components/MadlibCard";
import "./GalleryPage.css";
import {useMyMadlibs} from "../../hooks/useMyMadlibs.ts";

export default function GalleryPage() {
    const { madlibs, isPending, error, refetch } = useMyMadlibs();

    return (
        <div className="page-wrapper">
            <h1 className="site-heading">Madlib Gallery</h1>
            {isPending && <p className="gallery-status">Loading madlibs…</p>}
            {error && (
                <div className="gallery-error">
                    <p>{error}</p>
                    <button className="gallery-retry-btn" onClick={refetch}>Try again</button>
                </div>
            )}
            {!isPending && !error && madlibs.length === 0 && (
                <p className="gallery-status">No madlibs yet — go create one!</p>
            )}
            {madlibs.length > 0 && (
                <div className="gallery-grid">
                    {madlibs.map((madlib) => (
                        <MadlibCard key={madlib.id} madlib={madlib} />
                    ))}
                </div>
            )}
        </div>
    );
}
