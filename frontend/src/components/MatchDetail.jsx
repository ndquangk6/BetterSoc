import React, { useEffect, useState } from 'react';
import { getMatchDetail } from '../services/api';
import OddsTable from './OddsTable';
import PredictionBox from './PredictionBox';

const MatchDetail = ({ matchId }) => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getMatchDetail(matchId);
        setDetail(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    if (matchId) fetchDetail();
  }, [matchId]);

  if (loading) return <div>Loading chi tiết...</div>;
  if (!detail) return <div>Không có dữ liệu</div>;

  const { match, odds, prediction } = detail;

  return (
    <div className="match-detail">
      <h2>{match.home_team} vs {match.away_team}</h2>
      <div className="score-big">{match.home_score} - {match.away_score}</div>
      <div className="status">{match.status}</div>
      
      <h3>📊 Tỷ lệ kèo</h3>
      <OddsTable odds={odds} />

      <h3>🤖 Dự đoán AI</h3>
      <PredictionBox prediction={prediction} />
    </div>
  );
};

export default MatchDetail;