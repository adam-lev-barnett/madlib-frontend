
import SourceTextSubmit from "../submitsrctext/SourceTextSubmit.tsx";
import "./LandingPage.css";
import {useState} from "react";
import ReplacementWordForm from "../partofspeechentry/ReplacementWordForm.tsx";
import CompletedMadlibBlock from "../completedmadlib/CompletedMadlibBlock.tsx";
import type {MadlibPhase} from "../../enums/MadlibPhase.tsx";

function LandingPage() {
    const [blankedText, setBlankedText] = useState<string>("");
    const [partsOfSpeech, setPartsOfSpeech] = useState<string[]>([]);
    const [replacementWords, setReplacementWords] = useState<string[]>([]);
    const [completedMadlib, setCompletedMadlib] = useState<string>("");
    const [madlibPhase, setMadlibPhase] = useState<MadlibPhase>("SUBMIT_SOURCE");

    function handleReplaceWord(i: number, word: string) {
        const replacementWordTemp: string[] = [...replacementWords];
        replacementWordTemp[i] = word;
        setReplacementWords(replacementWordTemp);
    }

    function handleSourceSubmit(sourceText: string, skipper: number) {
        fetch(`https://sea-lion-app-qnlay.ondigitalocean.app/madlibs/madlibify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sourceText, skipper }),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to madlibify text");
                return response.json();
            })
            .then((data) => {
                setBlankedText(data.blankedText);
                setPartsOfSpeech(data.partsOfSpeech);
                setReplacementWords(new Array(data.partsOfSpeech.length).fill(""));
                setMadlibPhase("REPLACE_WORDS");
            })
            .catch((err) => console.error(err));
    }

    function handleReplacementSubmit() {
        fetch(`https://sea-lion-app-qnlay.ondigitalocean.app/madlibs/fillMadlib`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ blankedText, replacementWords, completedMadlib }),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to complete madlib with submitted words");
                return response.json();
            })
            .then((data) => {
                setCompletedMadlib(data.completeMadlib);
                setMadlibPhase("COMPLETE");
            })
            .catch((err) => console.error(err));
    }

    return (
        <div className="page-wrapper">
            <h1 className="site-heading">Madlib Machine</h1>

            {madlibPhase === "SUBMIT_SOURCE" && (
                <>
                    <details className="accordion">
                        <summary className="accordion-summary">How it works</summary>
                        <div className="accordion-content">
                            <ol className="steps">
                                <li>Paste any text you want to <em>madlibify</em></li>
                                <li>Set the <em>skipper</em> — how many words to skip before blanking one</li>
                                <li>Fill in a replacement word for each blank</li>
                                <li>Get your madlib!</li>
                            </ol>
                            <hr />
                            <p className="instructions-note">
                                <strong>Madlibifiable words</strong> are nouns, verbs, adjectives, and adverbs.
                                A skipper of <strong>0</strong> blanks every one; higher values mean fewer blanks.
                            </p>
                        </div>
                    </details>

                    <SourceTextSubmit onSubmit={handleSourceSubmit} />

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
                </>
            )}

            {madlibPhase === "REPLACE_WORDS" &&
                <ReplacementWordForm
                    partsOfSpeech={partsOfSpeech}
                    onWordChange={handleReplaceWord}
                    onSubmit={handleReplacementSubmit}
                />
            }

            {madlibPhase === "COMPLETE" &&
                <CompletedMadlibBlock blankedText={blankedText} replacementWords={replacementWords} />
            }
        </div>
    )
}

export default LandingPage;
