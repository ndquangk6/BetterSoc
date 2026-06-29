import React, { useEffect, useState } from 'react';
import { getLiveMatches } from './services/api';
import MatchList from './components/MatchList';
import MatchDetail from './components/MatchDetail';
import './styles/index.css';

function App() {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMatches = async () => {
    try {
      const data = await getLiveMatches();
      setMatches(data.matches || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
    const interval = setInterval(fetchMatches, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>⚽ BetterSoc</h1>
        <div className="live-badge">● LIVE</div>
      </header>
      <div className="container">
        <aside className="sidebar">
          <h3>Trận đấu</h3>
          {loading ? <p>Đang tải...</p> : (
            <MatchList matches={matches} onSelect={setSelectedMatch} />
          )}
        </aside>
        <main className="main-content">
          {selectedMatch ? (
            <MatchDetail matchId={selectedMatch.id} />
          ) : (
            <div className="placeholder">Chọn một trận để xem chi tiết</div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;