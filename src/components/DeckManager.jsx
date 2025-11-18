import { useEffect, useMemo, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function DeckManager({ onSelectDeck }) {
  const [decks, setDecks] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchDecks = async () => {
    const res = await fetch(`${API_BASE}/api/decks`)
    const data = await res.json()
    setDecks(data)
  }

  useEffect(() => { fetchDecks() }, [])

  const createDeck = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    await fetch(`${API_BASE}/api/decks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description })
    })
    setName('')
    setDescription('')
    setLoading(false)
    fetchDecks()
  }

  return (
    <div className="space-y-4">
      <form onSubmit={createDeck} className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4 space-y-3">
        <div className="flex gap-2">
          <input className="flex-1 bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="New deck name" value={name} onChange={e=>setName(e.target.value)} />
          <button disabled={loading} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-60 px-4 py-2 rounded-lg text-white">Add</button>
        </div>
        <input className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Description (optional)" value={description} onChange={e=>setDescription(e.target.value)} />
      </form>

      <div className="grid sm:grid-cols-2 gap-3">
        {decks.map(d => (
          <button key={d.id} onClick={()=>onSelectDeck(d)} className="text-left bg-slate-800/60 hover:bg-slate-800 border border-slate-700 rounded-xl p-4 transition">
            <div className="font-semibold text-white">{d.name}</div>
            <div className="text-sm text-slate-300">{d.description || 'No description'}</div>
          </button>
        ))}
        {decks.length === 0 && (
          <div className="text-slate-400 text-sm">No decks yet. Create your first one above.</div>
        )}
      </div>
    </div>
  )
}
