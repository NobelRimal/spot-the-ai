import { useState, useRef } from "react";
const ROUNDS = [
    {
        id: 1,
        type: "image",
        mediaUrl: "/images/fakepolitician.png",
        question: "Is this portrait of a political figure real or AI-generated?",
        answer: "ai",
        explanation: "This is AI-generated. Look closely at the background elements - they lack consistent detail and have the characteristic smoothness of AI rendering. The facial symmetry is too perfect, and the skin texture lacks the micro-variations of real photography."
    },
    {
        id: 2,
        type: "image",
        mediaUrl: "/images/fakelandscape.png",
        question: "Is this landscape photograph real or AI-generated?",
        answer: "ai",
        explanation: "This landscape was created by AI. While it looks stunning, notice how the distant elements lack proper atmospheric perspective. The lighting is too perfect, and small details like vegetation patterns repeat unnaturally."
    },
    {
        id: 3,
        type: "image",
        mediaUrl: "/images/realpolitician.jpg",
        question: "Is this photograph real or AI-generated?",
        answer: "real",
        explanation: "This is a real photograph. Notice the worn-out texture of the political party banner, the authentic details in the trees, and the natural weathering of the straw roof. These organic imperfections and realistic wear patterns are difficult for AI to convincingly replicate."
    },
    {
        id: 4,
        type: "image",
        mediaUrl: "/images/reallandscape.jpg",
        question: "Is this landscape photograph real or AI-generated?",
        answer: "real",
        explanation: "This is a real photograph. Notice the person mid-movement - the natural body positioning and motion blur have a specific visual quality that AI typically struggles to generate convincingly. The atmospheric perspective and natural lighting variations also indicate real-world capture."
    },
    {
        id: 5,
        type: "audio",
        mediaUrl: "/audio/fakeyouth.mp3",
        mediaUrl2: "/audio/fakeelderly.mp3",
        question: "Listen to both voices. Which one is AI-generated?",
        answer: "both",
        explanation: "This was a trick question - both voices are AI-generated! Modern AI voice synthesis has become so sophisticated that it can convincingly replicate voices of different ages and genders. The subtle breathing patterns, emotional inflections, and natural pauses that used to distinguish real voices can now all be artificially created."
    },
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
    const [imgLoaded, setImgLoaded] = useState(false);

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
            setImgLoaded(false);
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
        setImgLoaded(false);
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
                    <button onClick={() => setScreen("game")} style={{ background: c.accent, color: "#fff", border: "none", padding: "14px 48px", fontSize: 16, fontFamily: sans, fontWeight: 600, cursor: "pointer", letterSpacing: 0.5, transition: "transform 0.15s ease, box-shadow 0.15s ease", borderRadius: 4 }} onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.95)"} onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
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
                                <span style={{ fontSize: 15, fontFamily: sans }}>Round {i + 1}: You said <strong>{a.choice === "voice1" ? "Voice 1" : a.choice === "voice2" ? "Voice 2" : a.choice}</strong> — {a.ok ? "Correct" : ROUNDS[i].answer === "both" ? "Trick question - both were AI!" : `Wrong (it was ${ROUNDS[i].answer})`}</span>
                            </div>
                        ))}
                    </div>
                    <button onClick={restart} style={{ background: c.accent, color: "#fff", border: "none", padding: "12px 36px", fontSize: 15, fontFamily: sans, fontWeight: 600, cursor: "pointer", transition: "transform 0.15s ease", borderRadius: 4 }} onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.95)"} onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
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
                        <div style={{ marginBottom: 28, borderRadius: 4, overflow: "hidden", background: c.card, border: `1px solid ${c.border}`, position: "relative", minHeight: 360 }}>
                            {!imgLoaded && (
                                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: c.card }}>
                                    <div style={{ width: 48, height: 48, border: `3px solid ${c.border}`, borderTop: `3px solid ${c.accent}`, borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                                </div>
                            )}
                            <img
                                src={r.mediaUrl}
                                alt="Round content"
                                style={{ width: "100%", display: "block", maxHeight: 360, objectFit: "cover", opacity: imgLoaded ? 1 : 0, transition: "opacity 0.3s ease" }}
                                onLoad={() => setImgLoaded(true)}
                            />
                        </div>
                    )}
                    {r.type === "audio" && !r.mediaUrl2 && (
                        <div style={{ marginBottom: 28, padding: 40, background: c.card, border: `1px solid ${c.border}`, borderRadius: 4, textAlign: "center" }}>
                            <div style={{ fontSize: 40, marginBottom: 16 }}>🎧</div>
                            <audio controls style={{ width: "100%" }} src={r.mediaUrl} />
                        </div>
                    )}
                    {r.type === "audio" && r.mediaUrl2 && (
                        <div style={{ marginBottom: 28, display: "flex", gap: 16 }}>
                            <div style={{ flex: 1, padding: 32, background: c.card, border: `1px solid ${c.border}`, borderRadius: 4, textAlign: "center" }}>
                                <div style={{ fontSize: 32, marginBottom: 12 }}>🎧</div>
                                <div style={{ fontSize: 14, fontFamily: sans, fontWeight: 600, color: c.dim, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>Voice 1</div>
                                <audio controls style={{ width: "100%" }} src={r.mediaUrl} />
                            </div>
                            <div style={{ flex: 1, padding: 32, background: c.card, border: `1px solid ${c.border}`, borderRadius: 4, textAlign: "center" }}>
                                <div style={{ fontSize: 32, marginBottom: 12 }}>🎧</div>
                                <div style={{ fontSize: 14, fontFamily: sans, fontWeight: 600, color: c.dim, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>Voice 2</div>
                                <audio controls style={{ width: "100%" }} src={r.mediaUrl2} />
                            </div>
                        </div>
                    )}
                    {r.type === "video" && (
                        <div style={{ marginBottom: 28, borderRadius: 4, overflow: "hidden", background: c.card, border: `1px solid ${c.border}` }}>
                            <video controls style={{ width: "100%", display: "block", maxHeight: 360 }} src={r.mediaUrl} />
                        </div>
                    )}
                    <p style={{ fontSize: 20, lineHeight: 1.5, marginBottom: 24, textAlign: "center" }}>{r.question}</p>
                    <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
                        {(r.mediaUrl2 ? ["voice1", "voice2"] : ["real", "ai"]).map((ch) => {
                            let bg = c.card, bd = c.border, cl = c.text;
                            if (show) {
                                if (r.answer === "both") {
                                    // For "both" answer, both choices are wrong (red)
                                    if (ch === sel) { bg = c.redDim; bd = c.red; cl = c.red; }
                                } else {
                                    if (ch === r.answer) { bg = c.greenDim; bd = c.green; cl = c.green; }
                                    else if (ch === sel && ch !== r.answer) { bg = c.redDim; bd = c.red; cl = c.red; }
                                }
                            }
                            return (
                                <button
                                    key={ch}
                                    onClick={() => pick(ch)}
                                    style={{ flex: 1, padding: "16px 0", fontSize: 16, fontFamily: sans, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, background: bg, color: cl, border: `2px solid ${bd}`, cursor: show ? "default" : "pointer", transition: "all 0.2s", borderRadius: 4 }}
                                    onMouseDown={(e) => !show && (e.currentTarget.style.transform = "scale(0.97)")}
                                    onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                >
                                    {ch === "real" ? "Real" : ch === "ai" ? "AI Generated" : ch === "voice1" ? "Voice 1" : "Voice 2"}
                                </button>
                            );
                        })}
                    </div>
                    {show && (
                        <div style={{ background: c.card, border: `1px solid ${c.border}`, padding: 20, borderRadius: 4, marginBottom: 24 }}>
                            <div style={{ fontSize: 13, fontFamily: sans, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: sel === r.answer ? c.green : c.red, marginBottom: 10 }}>
                                {r.answer === "both" ? "✗ Trick Question!" : sel === r.answer ? "✓ Correct" : "✗ Wrong"}
                            </div>
                            <p style={{ fontSize: 15, lineHeight: 1.65, color: c.dim, margin: 0 }}>{r.explanation}</p>
                        </div>
                    )}
                    {show && (
                        <div style={{ textAlign: "center" }}>
                            <button onClick={next} style={{ background: c.accent, color: "#fff", border: "none", padding: "12px 48px", fontSize: 15, fontFamily: sans, fontWeight: 600, cursor: "pointer", letterSpacing: 0.5, transition: "transform 0.15s ease", borderRadius: 4 }} onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.95)"} onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
                                {cur + 1 < n ? "NEXT ROUND" : "SEE RESULTS"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}