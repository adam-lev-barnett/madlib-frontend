import SourceTextSubmit from "../sourcetextsubmit/SourceTextSubmit.tsx";
import "./LandingPage.css";
import {useState} from "react";
import ReplacementWordForm from "../partofspeechentry/ReplacementWordForm.tsx";
import CompletedMadlibBlock from "../../components/text/CompletedMadlibBlock.tsx";
import type {MadlibPhase} from "../../MadlibPhase.tsx";

/*
 * Landing page for the app holding the overall HTML formatting and state of madlib creation
 * Defines functions for backend fetching and determining which phase of the app is visible to the user
 */
function LandingPage() {

    /*
     * Used to pass source madlib text to backend logic to blank out user-defined number of words and replace them with text blocks indicating parts of speech.
     *  Currently not visible to the user, but will be available in future updates for users to share
     */
    const [blankedText, setBlankedText] = useState<string>("");

    /*
     * Backend returns a list of parts of speech so front end can prompt users to enter replacement words based on the pos given to them
     * Used by ReplacementWordForm to generate array of pos fields
    */
    const [partsOfSpeech, setPartsOfSpeech] = useState<string[]>([]);

    /* Passed to backend so it can fill in the blanked words and return the completed madlib */
    const [replacementWords, setReplacementWords] = useState<string[]>([]);

    /* Displays the completed madlib to the user */
    const [completedMadlib, setCompletedMadlib] = useState<string>("");

    /* Determines which phase of madlib creation is visible to the user on the landing page (submit source text, fill in replacement words, completed madlib)
       instead of navigating to different URLs */
    const [madlibPhase, setMadlibPhase] = useState<MadlibPhase>("SUBMIT_SOURCE");

    /*
     * Updates the dom as user enters or deletes replacement word form (or any future use of FormTextBox text fields)
     */
    function handleReplaceWord(i: number, word: string) {
        const replacementWordTemp: string[] = [...replacementWords];
        replacementWordTemp[i] = word;
        setReplacementWords(replacementWordTemp);
    }

    /* Submits the source text and skipper values to the backend to retrieve the blanked madlib and list of parts of speech to prompt user to enter replacement words*/
    function handleSourceSubmit(sourceText: string, skipper: number) {

        fetch("https://sea-lion-app-qnlay.ondigitalocean.app/madlibs/madlibify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sourceText: sourceText,
                skipper: skipper,
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to madlibify text");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Madlib response:", data);
            setBlankedText(data.blankedText);
            setPartsOfSpeech(data.partsOfSpeech);
            const posListSize: number = data.partsOfSpeech.length;
            setReplacementWords(new Array(posListSize).fill(""));
            setMadlibPhase("REPLACE_WORDS");
        })
        .catch((err) => {
            console.error(err);
        });
    }

    /* Submits the array of user's replacement words to the backend to retrieve the completed madlib */
    function handleReplacementSubmit() {
        fetch("https://sea-lion-app-qnlay.ondigitalocean.app/madlibs/fillMadlib", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                blankedText: blankedText,
                replacementWords: replacementWords,
                completedMadlib: completedMadlib,
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to complete madlib with submitted words");
            }
            return response.json();
        })
            .then((data) => {
                console.log("Complete madlib:", data);
                setCompletedMadlib(data.completeMadlib);
                setMadlibPhase("COMPLETE");
            })
            .catch((err) => {
                console.error(err);
            })
    }

    return (
        <main className="layout">
            <h1>Madlib Machine</h1>
            <section className="description" id="what">
                <article className="update">I encountered my first bug! Thank you for your patience while I attempt to get the replacement word phase back up.</article>
                <h2>What is the Madlib Machine?</h2>
                <article className="explanation" id="app-summary">
                    <section className="simpleSummary">
                        The Madlib Machine is an app that turns any text into a madlib by blanking out a given number of
                        words and prompts users to fill them back in!
                    </section>
                    <ol className="steps">
                        <li>Enter text you wish to <em>madlibify</em>.</li>
                        <li>Enter how many <em>madlibifiable</em> words you would like to skip.<sup>1, 2</sup></li>
                        <li>The Machine returns a new text with various madlibifiable words replaced by their respective
                            parts of speech
                        </li>
                        <li>The Machine prompts you to enter replacement words for each removed word based on their
                            parts of speech
                        </li>
                        <li>Voila! You now have a silly madlib to share with everyone you know and/or don't know!</li>
                    </ol>

                    <hr/>

                    <ol className="foot-notes" id="glossary">
                        <li><sup>1</sup><strong> Madlibifiable word</strong>: Any noun, verb, adjective, or adverb. This
                            excludes words like "has," "is," etc.
                        </li>
                        <li><sup>2</sup><strong> Skipper:</strong> The number of madlibifiable words you want the
                            Machine to skip before blanking out another word.
                            A skipper of 0 would blank out every madlibifiable word; a skipper of a value equal or
                            greater than the number of madlibifiable words contained within a given text would return
                            the text unaltered.
                        </li>
                    </ol>

                    <hr/>

                </article>
            </section>


            {
                /* Default state of madlib - Displays form for Madlib submission (SourceTextSubmit)*/
                madlibPhase === "SUBMIT_SOURCE" && <SourceTextSubmit onSubmit={handleSourceSubmit} />}

            {
                /* Sets the state following source text submission - Replaces source text submission with ReplacementWordForm to prompt user for replacement words*/
                madlibPhase === "REPLACE_WORDS" &&
                <ReplacementWordForm
                    partsOfSpeech={partsOfSpeech}
                    onWordChange={handleReplaceWord}
                    onSubmit={handleReplacementSubmit}
                />
            }

            {
                /* Replaces word replacement form to display the completed Madlib to the user*/
                madlibPhase === "COMPLETE" &&
                <CompletedMadlibBlock
                    body={completedMadlib}
                />
            }



            <section className="description" id="madlib-explanation">
                <h3>What is a Madlib?</h3>
                <article className="explanation" id="explanation">
                    Madlibs are pieces of texts (stories, articles, poems, whatever uses written words) in which
                    various words are removed and replaced with blank spaces. These blank spaces are labeled with the
                    part-of-speech
                    of the words they replaced. Madlibbers are prompted to fill in the blank spaces with any word they
                    can think of that represents that part of speech.
                    <br/>
                    <br/>
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
                    <br/>
                    For more information, check out <a className="external=-link" id="official-history"
                                                       href="https://madlibs.com/history/" target="_blank">the official
                    history of Madlibs</a> as told by their creator.
                </article>

            </section>

        </main>
    )
}

export default LandingPage;