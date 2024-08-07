import React from 'react';
import './RatingMeter.css'; // Ensure this file exists and is correctly styled

const getBarColor = (rating) => {
  if (rating < 50) return '#f44336'; // Red
  if (rating <= 75) return '#2196F3'; // Blue
  return '#4CAF50'; // Green
};

const RatingMeter = ({ rating }) => {
  const barColor = getBarColor(rating);

  return (
    <div className="rating-meter">
      <div
        className="rating-meter-bar"
        style={{ width: `${rating}%`, backgroundColor: barColor }}
      >
        <span className="rating-meter-text">{rating}%</span>
      </div>
    </div>
  );
};

export default RatingMeter;
