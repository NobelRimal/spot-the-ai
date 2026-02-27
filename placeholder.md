import { useState, useRef } from "react";
const ROUNDS = [
    {
        id: 1,
        type: "image",
        mediaUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/640px-Golde33443.jpg",
        question: "Is this photo of a Golden Retriever real or AI-generated?",
        answer: "real",
        explanation: "This is a real photograph. Notice the natural variation in fur texture, the authentic catchlight in the eyes, and the slightly imperfect composition. Real photos tend to have subtle asymmetries that AI often smooths out."
    },
    {
        id: 2,
        type: "image",
        mediaUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
        question: "Real cat or AI-generated?",
        answer: "real",
        explanation: "This is a real photograph. The fur detail, whisker placement, and background depth of field are all consistent with a real camera capture. AI-generated cats often have whiskers that fade or merge unnaturally."
    },
    {
        id: 3,
        type: "image",
        mediaUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Tigerwater_edit2.jpg/800px-Tigerwater_edit2.jpg",
        question: "Is this image of a tiger real or AI-generated?",
        answer: "real",
        explanation: "This is a real photograph. The water splashing has the chaotic, unpredictable quality of real physics. AI-generated water often looks too smooth or repeats patterns."
    },
    {
        id: 4,
        type: "image",
        mediaUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
        question: "Street scene: Real photo or AI-generated?",
        answer: "real",
        explanation: "This is a real photograph taken with a mobile phone. Notice the lens flare, natural noise grain, and the way people in the background are slightly motion-blurred. AI images tend to render every element with equal sharpness."
    },
    {
        id: 5,
        type: "image",
        mediaUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/800px-Camponotus_flavomarginatus_ant.jpg",
        question: "Macro shot of an ant. Real or AI?",
        answer: "real",
        explanation: "This is a real macro photograph. The depth of field, exoskeleton texture, and natural imperfections are all signs of real photography. AI struggles with consistent micro-detail at this scale."
    },
    {
        id: 6,
        type: "image",
        mediaUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/300px-PNG_transparency_demonstration_1.png",
        question: "Are these dice real or AI-generated?",
        answer: "real",
        explanation: "These are real dice. The reflections, transparency, and the way light passes through the material are physically accurate in ways that AI often gets subtly wrong with transparent or reflective objects."
    },
    {
        id: 7,
        type: "image",
        mediaUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
        question: "Is this the real Mona Lisa or an AI recreation?",
        answer: "real",
        explanation: "This is the real Mona Lisa photographed at the Louvre. The craquelure (crack patterns), aged varnish, and wood panel texture are authentic signs of a centuries-old painting that AI would struggle to replicate."
    }
];

const c = {
    bg: "#0a0a0a",
    card: "#141414",
    accent: "#e63946",
    green: "#2ecc71",
    greenDim: "rgba(46, 204, 113, 0.15)",
    red: "#e74c3c",
    redDim: "rgba(231, 76, 60, 0.15)",
    text: "#f1f1f1",
    dim: "#888",
    border: "#222",
};

const serif = "'Georgia', 'Times New Roman', serif";
const sans = "system-ui, -apple-system, sans-serif";

export default function App() {
    const [screen, setScreen] = useState("intro");
    const [cur, setCur] = useState(0);
    const [score, setScore] = useState(0);
    const [sel, setSel] = useState(null);
    const [show, setShow] = useState(false);
    const [log, setLog] = useState([]);

    const r = ROUNDS[cur];
    const n = ROUNDS.length;

    const pick = (choice) => {
        if (show) return;
        const ok = choice === r.answer;
        setSel(choice);
        setShow(true);
        if (ok) setScore((s) => s + 1);
        setLog((l) => [...l, { id: r.id, choice, ok }]);
    };

    const next = () => {
        if (cur + 1 < n) {
            setCur((i) => i + 1);
            setSel(null);
            setShow(false);
        } else {
            setScreen("results");
        }
    };

    const restart = () => {
        setScreen("intro");
        setCur(0);
        setScore(0);
        setSel(null);
        setShow(false);
        setLog([]);
    };

    const msg = () => {
        const pct = score / n;
        if (pct === 1) return "Perfect score. Your instincts are sharp.";
        if (pct >= 0.7) return "Strong. You caught most of them.";
        if (pct >= 0.4) return "Mixed results. The fakes are getting better.";
        return "The AI fooled you more than you expected. That is the point.";
    };

    // --- INTRO ---
    if (screen === "intro") {
        return (
            <div style={{ minHeight: "100vh", background: c.bg, color: c.text, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: serif, padding: 20 }}>
                <div style={{ maxWidth: 520, textAlign: "center" }}>
                    <div style={{ fontSize: 13, letterSpacing: 3, color: c.accent, marginBottom: 24, textTransform: "uppercase", fontFamily: sans }}>Nepali Times</div>
                    <h1 style={{ fontSize: 42, fontWeight: 700, lineHeight: 1.15, marginBottom: 16, letterSpacing: -0.5 }}>Spot the AI</h1>
                    <p style={{ fontSize: 17, color: c.dim, lineHeight: 1.6, marginBottom: 36 }}>
                        {n} rounds. Each one shows you a piece of content. Your job: decide if it is real or AI-generated. At the end, you get a score and an explanation for every round.
                    </p>
                    <p style={{ fontSize: 14, color: c.dim, lineHeight: 1.6, marginBottom: 40, fontStyle: "italic" }}>
                        The fakes are better than you think.
                    </p>
                    <button onClick={() => setScreen("game")} style={{ background: c.accent, color: "#fff", border: "none", padding: "14px 48px", fontSize: 16, fontFamily: sans, fontWeight: 600, cursor: "pointer", letterSpacing: 0.5 }}>
                        START
                    </button>
                </div>
            </div>
        );
    }

    // --- RESULTS ---
    if (screen === "results") {
        return (
            <div style={{ minHeight: "100vh", background: c.bg, color: c.text, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: serif, padding: 20 }}>
                <div style={{ maxWidth: 520, textAlign: "center" }}>
                    <div style={{ fontSize: 13, letterSpacing: 3, color: c.accent, marginBottom: 24, textTransform: "uppercase", fontFamily: sans }}>Your Results</div>
                    <div style={{ fontSize: 72, fontWeight: 700, marginBottom: 8 }}>
                        {score}<span style={{ fontSize: 28, color: c.dim }}>/{n}</span>
                    </div>
                    <p style={{ fontSize: 18, color: c.dim, lineHeight: 1.6, marginBottom: 36 }}>{msg()}</p>
                    <div style={{ marginBottom: 40, textAlign: "left" }}>
                        {log.map((a, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${c.border}` }}>
                                <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontFamily: sans, fontWeight: 700, background: a.ok ? c.greenDim : c.redDim, color: a.ok ? c.green : c.red }}>
                                    {a.ok ? "✓" : "✗"}
                                </div>
                                <span style={{ fontSize: 15, fontFamily: sans }}>Round {i + 1}: You said <strong>{a.choice}</strong> — {a.ok ? "Correct" : `Wrong (it was ${ROUNDS[i].answer})`}</span>
                            </div>
                        ))}
                    </div>
                    <button onClick={restart} style={{ background: c.accent, color: "#fff", border: "none", padding: "12px 36px", fontSize: 15, fontFamily: sans, fontWeight: 600, cursor: "pointer" }}>
                        TRY AGAIN
                    </button>
                    <p style={{ fontSize: 13, color: c.dim, marginTop: 32, fontFamily: sans }}>
                        A Nepali Times project. Read the full article at nepalitimes.com
                    </p>
                </div>
            </div>
        );
    }

    // --- GAME ---
    return (
        <div style={{ minHeight: "100vh", background: c.bg, color: c.text, fontFamily: serif, display: "flex", flexDirection: "column" }}>
            <div style={{ height: 3, background: c.border }}>
                <div style={{ height: 3, background: c.accent, width: `${(cur / n) * 100}%`, transition: "width 0.3s ease" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", fontFamily: sans }}>
                <span style={{ fontSize: 12, letterSpacing: 2, color: c.dim, textTransform: "uppercase" }}>Round {cur + 1} of {n}</span>
                <span style={{ fontSize: 14, color: c.dim }}>Score: <span style={{ color: c.text, fontWeight: 600 }}>{score}</span></span>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px 24px" }}>
                <div style={{ maxWidth: 560, width: "100%" }}>
                    {r.type === "image" && (
                        <div style={{ marginBottom: 28, borderRadius: 4, overflow: "hidden", background: c.card, border: `1px solid ${c.border}` }}>
                            <img src={r.mediaUrl} alt="Round content" style={{ width: "100%", display: "block", maxHeight: 360, objectFit: "cover" }} />
                        </div>
                    )}
                    {r.type === "audio" && (
                        <div style={{ marginBottom: 28, padding: 40, background: c.card, border: `1px solid ${c.border}`, borderRadius: 4, textAlign: "center" }}>
                            <div style={{ fontSize: 40, marginBottom: 16 }}>🎧</div>
                            <audio controls style={{ width: "100%" }} src={r.mediaUrl} />
                        </div>
                    )}
                    {r.type === "video" && (
                        <div style={{ marginBottom: 28, borderRadius: 4, overflow: "hidden", background: c.card, border: `1px solid ${c.border}` }}>
                            <video controls style={{ width: "100%", display: "block", maxHeight: 360 }} src={r.mediaUrl} />
                        </div>
                    )}
                    <p style={{ fontSize: 20, lineHeight: 1.5, marginBottom: 24, textAlign: "center" }}>{r.question}</p>
                    <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
                        {["real", "ai"].map((ch) => {
                            let bg = c.card, bd = c.border, cl = c.text;
                            if (show) {
                                if (ch === r.answer) { bg = c.greenDim; bd = c.green; cl = c.green; }
                                else if (ch === sel && ch !== r.answer) { bg = c.redDim; bd = c.red; cl = c.red; }
                            }
                            return (
                                <button key={ch} onClick={() => pick(ch)} style={{ flex: 1, padding: "16px 0", fontSize: 16, fontFamily: sans, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, background: bg, color: cl, border: `2px solid ${bd}`, cursor: show ? "default" : "pointer", transition: "all 0.2s" }}>
                                    {ch === "real" ? "Real" : "AI Generated"}
                                </button>
                            );
                        })}
                    </div>
                    {show && (
                        <div style={{ background: c.card, border: `1px solid ${c.border}`, padding: 20, borderRadius: 4, marginBottom: 24 }}>
                            <div style={{ fontSize: 13, fontFamily: sans, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: sel === r.answer ? c.green : c.red, marginBottom: 10 }}>
                                {sel === r.answer ? "✓ Correct" : "✗ Wrong"}
                            </div>
                            <p style={{ fontSize: 15, lineHeight: 1.65, color: c.dim, margin: 0 }}>{r.explanation}</p>
                        </div>
                    )}
                    {show && (
                        <div style={{ textAlign: "center" }}>
                            <button onClick={next} style={{ background: c.accent, color: "#fff", border: "none", padding: "12px 48px", fontSize: 15, fontFamily: sans, fontWeight: 600, cursor: "pointer", letterSpacing: 0.5 }}>
                                {cur + 1 < n ? "NEXT ROUND" : "SEE RESULTS"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}