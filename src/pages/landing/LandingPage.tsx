import SourceTextSubmit from "./SourceTextSubmit.tsx";

function LandingPage() {
    return (
        <main className="layout">
            <h1>Madlib Machine</h1>
            <section className="description" id="what">

                <h2>What is the Madlib Machine?</h2>
                <article className="explanation" id="app-summary">
                    The Madlib Machine is an app that turns any text into a madlib by blanking out a given number of
                    words and prompts users to fill them back in!
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

                    <ol className="foot-notes" id="glossary">
                        <li><sup>1</sup><strong> Madlibiable word</strong>: Any noun, verb, adjective, or adverb. This
                            excludes words like "has," "is," etc.
                        </li>
                        <li><sup>2</sup><strong> Skipper:</strong> The number of madlibifiable words you want the
                            Machine to skip before blanking out another word.
                            A skipper of 0 would blank out every madlibifiable word; a skipper of a value equal or
                            greater than the number of madlibifiable words contained within a given text would return
                            the text unaltered.
                        </li>
                    </ol>

                </article>
            </section>

            <SourceTextSubmit/>

        </main>
    )
}

export default LandingPage;