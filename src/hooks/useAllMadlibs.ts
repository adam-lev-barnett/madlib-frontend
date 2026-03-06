import { useState, useCallback, useTransition, useEffect } from "react";
import type { SavedMadlibResponse } from "../types/SavedMadlibResponse";

/* Used to list all Madlibs submitted by registered users; can be seen by everyone */


const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

function authHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return token ? { "Authorization": `Bearer ${token}` } : {};
}

export function useAllMadlibs() {
    const [madlibs, setMadlibs] = useState<SavedMadlibResponse[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const fetchAll = useCallback(() => {
        startTransition(async () => {
            setError(null);
            try {
                const response = await fetch(`${API_BASE}/madlibs/all`, { headers: authHeaders() });
                if (!response.ok) throw new Error("Failed to fetch madlibs");
                const data = await response.json();
                setMadlibs(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            }
        });
    }, []);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    return { madlibs, isPending, error, refetch: fetchAll };
}
