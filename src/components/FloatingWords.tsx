import './FloatingWords.css';

const WORDS = [
    { word: 'noun',         left:  3, top: 15, size: 1.3,  duration:  9, delay: 0,   anim: 'float1' },
    { word: 'verb',         left: 90, top: 10, size: 1.0,  duration: 11, delay: 2,   anim: 'float2' },
    { word: 'adjective',    left: 78, top: 55, size: 0.85, duration: 13, delay: 4,   anim: 'float1' },
    { word: 'adverb',       left:  8, top: 70, size: 1.1,  duration: 10, delay: 1,   anim: 'float3' },
    { word: 'gerund',       left: 20, top: 85, size: 0.9,  duration: 14, delay: 6,   anim: 'float2' },
    { word: 'proper noun',  left: 65, top: 20, size: 0.8,  duration: 12, delay: 3,   anim: 'float1' },
    { word: 'pronoun',      left: 30, top:  5, size: 1.0,  duration:  8, delay: 5,   anim: 'float3' },
    { word: 'conjunction',  left: 88, top: 78, size: 0.75, duration: 15, delay: 7,   anim: 'float2' },
    { word: 'preposition',  left:  5, top: 45, size: 0.8,  duration: 11, delay: 2.5, anim: 'float1' },
    { word: 'interjection', left: 55, top: 88, size: 0.7,  duration: 16, delay: 8,   anim: 'float3' },
    { word: 'article',      left: 75, top: 38, size: 1.2,  duration:  9, delay: 1.5, anim: 'float2' },
    { word: 'participle',   left: 15, top: 55, size: 0.85, duration: 13, delay: 4.5, anim: 'float1' },
    { word: 'infinitive',   left: 42, top: 92, size: 0.9,  duration: 10, delay: 3.5, anim: 'float3' },
    { word: 'clause',       left: 60, top: 65, size: 1.0,  duration: 12, delay: 6.5, anim: 'float2' },
    { word: 'subject',      left: 35, top: 75, size: 0.8,  duration: 14, delay: 9,   anim: 'float1' },
    { word: 'predicate',    left: 92, top: 50, size: 0.75, duration: 11, delay: 0.5, anim: 'float3' },
];

export default function FloatingWords() {
    return (
        <div className="floating-words-container" aria-hidden="true">
            {WORDS.map(({ word, left, top, size, duration, delay, anim }) => (
                <span
                    key={word}
                    className="floating-word"
                    style={{
                        left: `${left}%`,
                        top: `${top}%`,
                        fontSize: `${size}rem`,
                        animationDuration: `${duration}s`,
                        animationDelay: `${delay}s`,
                        animationName: anim,
                    }}
                >
                    {word}
                </span>
            ))}
        </div>
    );
}
