/* Saved Madlibs are stored in the database connected to the back end with these fields */
export interface SavedMadlibResponse {
    id: number;
    completedText: string;
    sourceText?: string;
    // Stored to maintain styling of replacement words in gallery
    blankedText?: string;
    createdAt?: string;
}
