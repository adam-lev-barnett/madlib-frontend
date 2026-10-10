
import SourceTextSubmit from "../submitsrctext/SourceTextSubmit.tsx";
import "./LandingPage.css";
import ReplacementWordForm from "../partofspeechentry/ReplacementWordForm.tsx";
import CompletedMadlibBlock from "../completedmadlib/CompletedMadlibBlock.tsx";
import { useMadlib } from "../../hooks/useMadlib.ts";

function LandingPage() {
    const {
        phase,
        blankedText,
        partsOfSpeech,
        replacementWords,
        isPending,
        handleSourceSubmit,
        handleReplaceWord,
        handleReplacementSubmit,
        handleReset,
    } = useMadlib();

    return (
        <div className="landing-page-wrapper">
            <header className="hero-header">
                <div className="hero-eyebrow">
                    <span>— An Occasion of Ridiculous Prose —</span>
                </div>
                <h1 className="site-heading">Madlib Machine</h1>
                <p className="hero-subtitle">
                    Partake in the artful deconstruction and inventive reimagining of the written word.
                </p>
            </header>

            {phase === "SUBMIT_SOURCE" && (
                <div className="submit-row">
                    <aside className="info-card">
                        <div className="card-header-row">
                            <h3 className="info-card-heading">Rules of Engagement</h3>
                        </div>
                        <ol className="steps">
                            <li>
                                <span className="step-num">I</span>
                                <div><strong>Sign in with Google</strong> (upper right) should you wish to archive your composition.</div>
                            </li>
                            <li>
                                <span className="step-num">II</span>
                                <div><strong>Submit any passage</strong> of prose, verse, or quotation you wish to transform.</div>
                            </li>
                            <li>
                                <span className="step-num">III</span>
                                <div><strong>Select blank density</strong>: a higher index maintains more of the original context.</div>
                            </li>
                            <li>
                                <span className="step-num">IV</span>
                                <div><strong>Provide replacement terms</strong> for each prompted part of speech.</div>
                            </li>
                            <li>
                                <span className="step-num">V</span>
                                <div><strong>Reveal the final composition</strong> and enjoy the resulting absurdity.</div>
                            </li>
                        </ol>
                        <div className="instructions-note-box">
                            <p className="instructions-note">
                                <strong>Grammatical Scope:</strong> Eligible terms comprise nouns, verbs, adjectives, and adverbs. Setting 1 redacts every applicable term; 9 redacts almost no words.
                            </p>
                        </div>
                    </aside>

                    <main className="submit-center">
                        <SourceTextSubmit onSubmit={handleSourceSubmit} isPending={isPending} />
                    </main>

                    <aside className="accordion-card">
                        <details className="accordion" open>
                            <summary className="accordion-summary">
                                <div className="card-header-row">
                                    <span>Concerning The Madlib</span>
                                </div>
                            </summary>
                            <div className="accordion-content">
                                <article id="explanation">
                                    <p className="explanation-intro">
                                        A Madlib removes pivotal terms from a written work, prompting a curious onlooker to replace those terms upon only revealing their original parts of speech. Once supplied without knowledge of the context, an amusing variation unfolds.
                                    </p>

                                    <h4 className="example-heading">Example</h4>
                                    <section className="example" id="example-basic-madlib">
                                        <div className="example-step">
                                            <span className="example-tag">Original Composition</span>
                                            <blockquote className="source-text">
                                                "The quick brown fox jumped over the lazy dog."
                                            </blockquote>
                                        </div>
                                        <div className="transform-divider">
                                            <span className="transform-arrow">↓ With Blanks Applied</span>
                                        </div>
                                        <div className="example-step">
                                            <span className="example-tag">Template</span>
                                            <blockquote className="blank-text">
                                                "The quick <span className="blank-word">adjective</span> fox <span className="blank-word">verb</span> over the lazy <span className="blank-word">noun</span>."
                                            </blockquote>
                                        </div>
                                        <div className="transform-divider">
                                            <span className="transform-arrow">↓ Completed Inscription</span>
                                        </div>
                                        <div className="example-step">
                                            <span className="example-tag example-tag-result">Final Result</span>
                                            <blockquote className="filled-text">
                                                "The quick <strong className="example-replaced-word">goofy</strong> fox <strong className="example-replaced-word">flew</strong> over the lazy <strong className="example-replaced-word">cheese</strong>."
                                            </blockquote>
                                        </div>
                                    </section>
                                    <p className="history-link-container">
                                        Consult <a className="external-link" id="official-history" href="https://madlibs.com/history/" target="_blank" rel="noopener noreferrer">the official chronicle of Madlibs ↗</a>
                                    </p>
                                </article>
                            </div>
                        </details>
                    </aside>
                </div>
            )}

            {phase === "REPLACE_WORDS" && (
                <ReplacementWordForm
                    partsOfSpeech={partsOfSpeech}
                    onWordChange={handleReplaceWord}
                    onSubmit={handleReplacementSubmit}
                    isPending={isPending}
                />
            )}

            {phase === "COMPLETE" && (
                <CompletedMadlibBlock
                    blankedText={blankedText}
                    replacementWords={replacementWords}
                    onReset={handleReset}
                />
            )}
        </div>
    );
}

export default LandingPage;
