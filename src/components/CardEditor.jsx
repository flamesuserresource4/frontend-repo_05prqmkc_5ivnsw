import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function CardEditor({ deck }) {
  const [cards, setCards] = useState([])
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')

  const load = async () => {
    const res = await fetch(`${API_BASE}/api/cards?deck_id=${deck.id}`)
    const data = await res.json()
    setCards(data)
  }

  useEffect(() => { if(deck) load() }, [deck])

  const addCard = async (e) => {
    e.preventDefault()
    if (!front.trim() || !back.trim()) return
    await fetch(`${API_BASE}/api/cards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deck_id: deck.id, front, back })
    })
    setFront('')
    setBack('')
    load()
  }

  return (
    <div className="space-y-4">
      <form onSubmit={addCard} className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4 space-y-3">
        <div className="grid sm:grid-cols-2 gap-2">
          <textarea rows={3} className="bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Front / question" value={front} onChange={e=>setFront(e.target.value)} />
          <textarea rows={3} className="bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Back / answer" value={back} onChange={e=>setBack(e.target.value)} />
        </div>
        <div className="flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-white">Add Card</button>
        </div>
      </form>

      <div className="space-y-2">
        {cards.map(c => (
          <div key={c.id} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
            <div className="text-white font-medium">{c.front}</div>
            <div className="text-slate-300 mt-1">{c.back}</div>
          </div>
        ))}
        {cards.length === 0 && <div className="text-slate-400 text-sm">No cards yet.</div>}
      </div>
    </div>
  )
}
