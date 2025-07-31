import { useEffect, useState } from 'react';
import './index.css';

const words = ['apple', 'zebra', 'quantum', 'crypto', 'wallet', 'chain', 'delta', 'neon', 'future', 'moon', 'hash', 'token', 'web3', 'block', 'metamask', 'airdrop', 'satoshi', 'miner'];

function generateSeedPhrase(prevUsed) {
  let phrase;
  do {
    phrase = Array.from({ length: 12 }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
  } while (prevUsed.has(phrase));
  return phrase;
}

export default function App() {
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [usedPhrases, setUsedPhrases] = useState(new Set());

  useEffect(() => {
    const stored = localStorage.getItem('usedPhrases');
    const used = stored ? new Set(JSON.parse(stored)) : new Set();
    const newPhrase = generateSeedPhrase(used);
    used.add(newPhrase);
    localStorage.setItem('usedPhrases', JSON.stringify([...used]));
    setUsedPhrases(used);
    setCurrentPhrase(newPhrase);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-neon">🔐 BruteForce Simulator</h1>
        <p className="mb-2 text-sm text-gray-300">🚫 Not real — for educational use only</p>
        <div className="bg-black text-neon font-mono p-4 rounded-lg border border-neon text-sm break-words">
          {currentPhrase}
        </div>
      </div>
    </div>
  );
}
