import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function StudyView({ deck }) {
  const [queue, setQueue] = useState([])
  const [current, setCurrent] = useState(null)
  const [showBack, setShowBack] = useState(false)

  const loadDue = async () => {
    const res = await fetch(`${API_BASE}/api/cards?deck_id=${deck.id}&due_only=true`)
    const data = await res.json()
    setQueue(data)
    setCurrent(data[0] || null)
    setShowBack(false)
  }

  useEffect(() => { if(deck) loadDue() }, [deck])

  const grade = async (q) => {
    if (!current) return
    await fetch(`${API_BASE}/api/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ card_id: current.id, quality: q })
    })
    const next = queue.slice(1)
    setQueue(next)
    setCurrent(next[0] || null)
    setShowBack(false)
  }

  if (!current) {
    return <div className="text-slate-300">No cards due. Great job! 🎉</div>
  }

  return (
    <div className="space-y-4">
      <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6">
        <div className="text-sm text-slate-400 mb-2">Card</div>
        <div className="text-white text-xl font-semibold">{showBack ? current.back : current.front}</div>
      </div>
      {!showBack ? (
        <button onClick={() => setShowBack(true)} className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-white">Show Answer</button>
      ) : (
        <div className="grid grid-cols-5 gap-2">
          {[0,1,2,3,4].map((q) => (
            <button key={q} onClick={() => grade(q)} className="bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg text-white text-sm">{q}</button>
          ))}
        </div>
      )}
    </div>
  )
}
