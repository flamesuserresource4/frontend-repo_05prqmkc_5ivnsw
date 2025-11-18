import { useState } from 'react'
import DeckManager from './components/DeckManager'
import CardEditor from './components/CardEditor'
import StudyView from './components/StudyView'

function App() {
  const [selectedDeck, setSelectedDeck] = useState(null)
  const [tab, setTab] = useState('decks')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.08),transparent_40%),radial-gradient(circle_at_80%_100%,rgba(14,165,233,0.08),transparent_40%)]"></div>

      <header className="relative z-10 border-b border-blue-500/10 bg-slate-900/60 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/flame-icon.svg" alt="logo" className="w-8 h-8" />
            <h1 className="text-white font-semibold">Study Assistant</h1>
          </div>
          <nav className="flex items-center gap-2">
            <button onClick={()=>setTab('decks')} className={`px-3 py-1.5 rounded-lg text-sm ${tab==='decks'?'bg-blue-600 text-white':'text-slate-300 hover:text-white hover:bg-slate-800'}`}>Decks</button>
            <button onClick={()=>setTab('cards')} disabled={!selectedDeck} className={`px-3 py-1.5 rounded-lg text-sm ${tab==='cards'?'bg-blue-600 text-white':'text-slate-300 hover:text-white hover:bg-slate-800'} disabled:opacity-50`}>Cards</button>
            <button onClick={()=>setTab('study')} disabled={!selectedDeck} className={`px-3 py-1.5 rounded-lg text-sm ${tab==='study'?'bg-blue-600 text-white':'text-slate-300 hover:text-white hover:bg-slate-800'} disabled:opacity-50`}>Study</button>
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-8">
        {!selectedDeck && (
          <div className="mb-6 text-slate-300 text-sm">Select or create a deck to begin.</div>
        )}
        {tab === 'decks' && <DeckManager onSelectDeck={(d)=>{ setSelectedDeck(d); setTab('cards') }} />}
        {tab === 'cards' && selectedDeck && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-lg font-semibold">{selectedDeck.name}</h2>
              <button onClick={()=>setTab('study')} className="bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 rounded-lg text-white text-sm">Start Studying</button>
            </div>
            <CardEditor deck={selectedDeck} />
          </div>
        )}
        {tab === 'study' && selectedDeck && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-lg font-semibold">Studying: {selectedDeck.name}</h2>
              <button onClick={()=>setTab('cards')} className="bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-white text-sm">Back to Cards</button>
            </div>
            <StudyView deck={selectedDeck} />
          </div>
        )}
      </main>
    </div>
  )
}

export default App
