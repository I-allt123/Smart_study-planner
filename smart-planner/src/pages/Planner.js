import { useState, useEffect } from "react";

function Planner() {
  const [input, setInput] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [examDate, setExamDate] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [plan, setPlan] = useState([]);
  const [completed, setCompleted] = useState([]);

  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    });
  }, []);

  const installApp = () => {
    if (installPrompt) {
      installPrompt.prompt();
    } else {
      alert("Install not available yet");
    }
  };

  const addSubject = () => {
    if (!input) return;

    setSubjects([...subjects, { name: input, difficulty, examDate }]);
    setInput("");
    setExamDate("");
  };

  const generatePlan = () => {
    const today = new Date();

    const newPlan = subjects.map((sub) => {
      let hours = 1;

      if (sub.difficulty === "Hard") hours = 2;
      else if (sub.difficulty === "Medium") hours = 1.5;

      if (sub.examDate) {
        const diff =
          (new Date(sub.examDate) - today) / (1000 * 60 * 60 * 24);
        if (diff <= 3) hours += 1;
      }

      return `${sub.name} - ${hours} hrs`;
    });

    setPlan(newPlan);
  };

  const markAsDone = (name) => {
    setCompleted((prev) => {
      if (prev.includes(name)) return prev;
      return [...prev, name];
    });
  };

  const progress =
    subjects.length > 0
      ? Math.round((completed.length / subjects.length) * 100)
      : 0;

  return (
    <div style={bg}>
      <div style={card}>
        <h1 style={title}>Smart Study AI Planner</h1>

        {/* Input */}
        <input
          placeholder="Enter Subject"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={inputStyle}
        />

        {/* Row */}
        <div style={{ display: "flex", gap: "10px" }}>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            style={inputStyle}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Buttons */}
        <button style={btn} onClick={addSubject}>
          + Add Subject
        </button>

        <button style={btn2} onClick={generatePlan}>
          Generate Plan ✨
        </button>

        <button style={btn3} onClick={installApp}>
          Install App 📱
        </button>

        {/* Subjects */}
        <h3>Subjects</h3>
        <ul>
          {subjects.map((s, i) => (
            <li key={i} style={list}>
              {s.name}
              <button
                style={doneBtn}
                onClick={() => markAsDone(s.name)}
              >
                ✓
              </button>
            </li>
          ))}
        </ul>

        {/* ✅ FINAL VISIBLE PROGRESS BAR */}
        <h3>Progress</h3>

        <div
          style={{
            width: "100%",
            height: "25px",
            backgroundColor: "white",
            border: "2px solid black",
            borderRadius: "10px",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              width: progress + "%",
              height: "100%",
              backgroundColor: "red",
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              lineHeight: "25px"
            }}
          >
            {progress > 0 ? progress + "%" : ""}
          </div>
        </div>

        <p>{progress}% Completed</p>

        {/* Plan */}
        <h3>Study Plan</h3>
        <ul>
          {plan.map((p, i) => (
            <li key={i} style={planCard}>{p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Planner;

/* STYLES */

const bg = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background:
    "linear-gradient(135deg, #0f172a, #1e293b, #6d28d9)",
};

const card = {
  width: "420px",
  padding: "30px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 0 50px rgba(0,0,0,0.7)",
  color: "white",
};

const title = {
  textAlign: "center",
  marginBottom: "20px",
  background: "linear-gradient(90deg,#a855f7,#ec4899)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "10px",
  border: "none",
  background: "rgba(255,255,255,0.1)",
  color: "white",
};

const btn = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  borderRadius: "10px",
  border: "none",
  background: "#22c55e",
  color: "white",
};

const btn2 = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(90deg,#7c3aed,#ec4899)",
  color: "white",
};

const btn3 = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "10px",
  border: "none",
  background: "#0ea5e9",
  color: "white",
};

const list = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "8px",
};

const doneBtn = {
  background: "#22c55e",
  border: "none",
  color: "white",
  borderRadius: "6px",
  padding: "5px",
};

const planCard = {
  background: "rgba(255,255,255,0.1)",
  padding: "8px",
  borderRadius: "8px",
  marginBottom: "6px",
};