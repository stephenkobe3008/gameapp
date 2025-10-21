import React from 'react';

export const PixelBuilding = ({ type, size = 80 }) => {
  const buildingColors = {
    temple: { main: "#D2691E", roof: "#8B0000" },
    church: { main: "#8B4513", roof: "#8B0000" },
    cathedral: { main: "#654321", roof: "#8B0000" },
    school: { main: "#4682B4", roof: "#8B0000" },
    hospital: { main: "#DC143C", roof: "#8B0000" },
    orphanage: { main: "#FFD700", roof: "#8B0000" }
  };

  const colors = buildingColors[type] || buildingColors.temple;

  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ imageRendering: 'pixelated' }}>
      <rect x="5" y="75" width="70" height="5" fill="rgba(0,0,0,0.2)" />
      <rect x="10" y="30" width="60" height="45" fill={colors.main} />
      <rect x="10" y="30" width="60" height="45" stroke="#654321" strokeWidth="2" fill="none" />
      <polygon points="5,30 40,10 75,30" fill={colors.roof} />
      <polygon points="5,30 40,10 75,30" stroke="#654321" strokeWidth="2" fill="none" />
      <rect x="32" y="50" width="16" height="25" fill="#654321" />
      <rect x="15" y="40" width="12" height="12" fill="#87CEEB" stroke="#654321" strokeWidth="1" />
      <rect x="53" y="40" width="12" height="12" fill="#87CEEB" stroke="#654321" strokeWidth="1" />
      {(type === 'temple' || type === 'church' || type === 'cathedral') && (
        <>
          <rect x="38" y="5" width="4" height="10" fill="#FFD700" />
          <rect x="33" y="8" width="14" height="4" fill="#FFD700" />
        </>
      )}
      {type === 'hospital' && (
        <>
          <rect x="38" y="58" width="4" height="12" fill="#FFFFFF" />
          <rect x="34" y="62" width="12" height="4" fill="#FFFFFF" />
        </>
      )}
    </svg>
  );
};
