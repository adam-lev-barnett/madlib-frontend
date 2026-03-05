import { useState, useCallback, useTransition } from "react";
import type { MadlibPhase } from "../enums/MadlibPhase.tsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

function authHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    };
}

export function useMadlib() {
    const [blankedText, setBlankedText] = useState<string>("");
    const [partsOfSpeech, setPartsOfSpeech] = useState<string[]>([]);
    const [replacementWords, setReplacementWords] = useState<string[]>([]);
    const [completedMadlib, setCompletedMadlib] = useState<string>("");
    const [phase, setPhase] = useState<MadlibPhase>("SUBMIT_SOURCE");
    const [isPending, startTransition] = useTransition();

    const handleReplaceWord = useCallback((i: number, word: string) => {
        setReplacementWords(prev => {
            const updated = [...prev];
            updated[i] = word;
            return updated;
        });
    }, []);

    const handleSourceSubmit = useCallback((sourceText: string, skipper: number) => {
        startTransition(async () => {
            try {
                const response = await fetch(`${API_BASE}/madlibs/madlibify`, {
                    method: "POST",
                    headers: authHeaders(),
                    body: JSON.stringify({ sourceText, skipper }),
                });
                if (!response.ok) throw new Error("Failed to madlibify text");
                const data = await response.json();
                setBlankedText(data.blankedText);
                setPartsOfSpeech(data.partsOfSpeech);
                setReplacementWords(new Array(data.partsOfSpeech.length).fill(""));
                setPhase("REPLACE_WORDS");
            } catch (err) {
                console.error(err);
            }
        });
    }, []);

    const handleReplacementSubmit = useCallback(() => {
        startTransition(async () => {
            try {
                const response = await fetch(`${API_BASE}/madlibs/fillMadlib`, {
                    method: "POST",
                    headers: authHeaders(),
                    body: JSON.stringify({ blankedText, replacementWords, completedMadlib }),
                });
                if (!response.ok) throw new Error("Failed to complete madlib with submitted words");
                const data = await response.json();
                setCompletedMadlib(data.completeMadlib);
                setPhase("COMPLETE");
            } catch (err) {
                console.error(err);
            }
        });
    }, [blankedText, replacementWords, completedMadlib]);

    return {
        phase,
        blankedText,
        partsOfSpeech,
        replacementWords,
        isPending,
        handleSourceSubmit,
        handleReplaceWord,
        handleReplacementSubmit,
    };
}
