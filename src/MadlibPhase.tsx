// Maintains state of madlib creation so LandingPage.tsx can determine which view/form is available to user

export type MadlibPhase =
    "SUBMIT_SOURCE" |
    "REPLACE_WORDS" |
    "COMPLETE";

