import React from 'react';

export const BuildingInterior = ({ type, peopleCount = 0 }) => {
  return (
    <svg width="100%" height="300" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" style={{ imageRendering: 'pixelated' }}>
      <rect x="0" y="0" width="400" height="300" fill="#8B7355" />
      {[...Array(15)].map((_, i) => (
        <rect key={`floor-${i}`} x="0" y={i * 20} width="400" height="2" fill="#A0826D" />
      ))}
      <rect x="0" y="0" width="400" height="80" fill="#D2B48C" />
      {[0, 1, 2].map((i) => {
        const wx = 100 + i * 100;
        return (
          <g key={`window-${i}`}>
            <rect x={wx - 30} y="15" width="60" height="50" fill="#87CEEB" stroke="#654321" strokeWidth="3" />
            <line x1={wx} y1="15" x2={wx} y2="65" stroke="#654321" strokeWidth="2" />
            <line x1={wx - 30} y1="40" x2={wx + 30} y2="40" stroke="#654321" strokeWidth="2" />
          </g>
        );
      })}
      {(type === 'temple' || type === 'church' || type === 'cathedral') && (
        <>
          <rect x="170" y="100" width="60" height="40" fill="#D4AF37" stroke="#8B7500" strokeWidth="2" />
          <rect x="192" y="105" width="16" height="50" fill="#FFD700" />
          <rect x="175" y="120" width="50" height="16" fill="#FFD700" />
        </>
      )}
      {[...Array(Math.min(peopleCount, 8))].map((_, i) => (
        <g key={`person-${i}`} transform={`translate(${50 + i * 40}, 200)`}>
          <rect x="0" y="0" width="6" height="6" fill="#FFE0BD" />
          <rect x="-1" y="6" width="8" height="8" fill="#8B4513" />
        </g>
      ))}
    </svg>
  );
};
