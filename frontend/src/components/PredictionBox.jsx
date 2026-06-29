import React from 'react';

const PredictionBox = ({ prediction }) => {
  if (!prediction) return <p>Chưa có dự đoán</p>;
  
  return (
    <div className="prediction-box">
      <div className="prediction-result">
        <strong>Dự đoán:</strong> {prediction.predicted_outcome} 
        <span className="confidence"> (Độ tin cậy: {prediction.confidence}%)</span>
      </div>
      <div className="probabilities">
        <span>1: {prediction.prob_home}%</span>
        <span>X: {prediction.prob_draw}%</span>
        <span>2: {prediction.prob_away}%</span>
      </div>
    </div>
  );
};

export default PredictionBox;