import React from 'react';

const MatchList = ({ matches, onSelect }) => {
  return (
    <ul className="match-list">
      {matches.map(match => (
        <li key={match.id} onClick={() => onSelect(match)} className="match-item">
          <div className="teams">
            <span>{match.home_team}</span>
            <span className="score">{match.home_score} - {match.away_score}</span>
            <span>{match.away_team}</span>
          </div>
          <div className="match-time">{match.time || 'Đang diễn ra'}</div>
        </li>
      ))}
    </ul>
  );
};

export default MatchList;