
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
    } = useMadlib();

    return (
        <div className="landing-page-wrapper">
            <h1 className="site-heading">Madlib Machine</h1>

            {phase === "SUBMIT_SOURCE" && (
                <div className="submit-row">
                    <div className="info-card">
                        <h3 className="info-card-heading">How it works</h3>
                        <ol className="steps">
                            <li><strong>Log in with Google on the top left</strong> if you want to save your Madlib (optional)</li>
                            <li>Paste any text you want to <em>madlibify</em></li>
                            <li>Set the <em>blank density</em> — a lower number means more blanks!</li>
                            <li>Fill in a replacement word for each blank where prompted</li>
                            <li>Get your madlib!</li>
                        </ol>
                        <hr />
                        <p className="instructions-note">
                            <strong>Madlibifiable words</strong> are nouns, verbs, adjectives, and adverbs.
                            A skipper of <strong>0</strong> blanks every one; higher values mean fewer blanks.
                        </p>
                    </div>

                    <SourceTextSubmit onSubmit={handleSourceSubmit} isPending={isPending} />

                    <details className="accordion">
                        <summary className="accordion-summary">What is a Madlib?</summary>
                        <div className="accordion-content">
                            <article id="explanation">
                                Madlibs are pieces of texts (stories, articles, poems, whatever uses written words) in which
                                various words are removed and replaced with blank spaces. These blank spaces are labeled with the
                                part-of-speech of the words they replaced. Madlibbers are prompted to fill in the blank spaces
                                with any word they can think of that represents that part of speech.
                                <br/><br/>
                                This results in an absurd, often humorous variation of the original text.

                                <h4>Example:</h4>
                                <section className="example" id="example-basic-madlib">
                                    <blockquote className="source-text">
                                        "The quick brown fox jumped over the lazy dog."
                                    </blockquote>
                                    <span className="transform-arrow">–becomes–</span>
                                    <blockquote className="blank-text">
                                        "The quick
                                        <span className="blank-word"> adjective </span>
                                        fox
                                        <span className="blank-word"> verb (past-tense) </span>
                                        over the lazy
                                        <span className="blank-word"> noun </span>."
                                    </blockquote>
                                    <span className="transform-arrow">–becomes–</span>
                                    <blockquote className="filled-text">
                                        "The quick <strong>goofy</strong> fox <strong>flew</strong> over the
                                        lazy <strong>cheese</strong>."
                                    </blockquote>
                                </section>
                                <br/>
                                For more information, check out <a className="external-link" id="official-history"
                                                                   href="https://madlibs.com/history/" target="_blank">the official
                                history of Madlibs</a> as told by their creator.
                            </article>
                        </div>
                    </details>
                </div>
            )}

            {phase === "REPLACE_WORDS" &&
                <ReplacementWordForm
                    partsOfSpeech={partsOfSpeech}
                    onWordChange={handleReplaceWord}
                    onSubmit={handleReplacementSubmit}
                    isPending={isPending}
                />
            }

            {phase === "COMPLETE" &&
                <CompletedMadlibBlock blankedText={blankedText} replacementWords={replacementWords} />
            }
        </div>
    )
}

export default LandingPage;
