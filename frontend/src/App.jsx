import React, { useState } from 'react'
import axios from 'axios'

export default function App() {
  const [resume, setResume] = useState('')
  const [jd, setJd] = useState('')
  const [result, setResult] = useState(null)

  const handleSubmit = async () => {
    const response = await axios.post('http://localhost:8000/screen/', {
      job_description: jd,
      resume_text: resume,
    })
    setResult(response.data)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: 'auto' }}>
      <h1>AI Resume Screener</h1>
      <textarea
        rows="6"
        placeholder="Paste your resume here"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <textarea
        rows="4"
        placeholder="Paste job description here"
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <button onClick={handleSubmit}>Analyze</button>
      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Score: {result.score}</h3>
          <ul>
            {result.suggestions.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}