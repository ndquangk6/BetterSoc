import React from 'react';

const OddsTable = ({ odds }) => {
  if (!odds || odds.length === 0) return <p>Chưa có kèo</p>;
  
  return (
    <table className="odds-table">
      <thead>
        <tr>
          <th>Nhà cái</th>
          <th>1 (Home)</th>
          <th>X (Draw)</th>
          <th>2 (Away)</th>
          <th>Over</th>
          <th>Under</th>
        </tr>
      </thead>
      <tbody>
        {odds.map((odd, idx) => (
          <tr key={idx}>
            <td>{odd.bookmaker}</td>
            <td>{odd.home_odds}</td>
            <td>{odd.draw_odds}</td>
            <td>{odd.away_odds}</td>
            <td>{odd.over}</td>
            <td>{odd.under}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OddsTable;