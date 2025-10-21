import React from 'react';

export const PixelPerson = ({ isBelievers = false, size = 32 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
      <rect x="12" y="8" width="8" height="8" fill="#FFE0BD" />
      <rect x="14" y="11" width="1" height="1" fill="#000000" />
      <rect x="17" y="11" width="1" height="1" fill="#000000" />
      <rect x="10" y="16" width="12" height="10" fill={isBelievers ? "#8B4513" : "#696969"} />
      <rect x="8" y="18" width="2" height="6" fill={isBelievers ? "#8B4513" : "#696969"} />
      <rect x="22" y="18" width="2" height="6" fill={isBelievers ? "#8B4513" : "#696969"} />
      <rect x="12" y="26" width="3" height="6" fill="#654321" />
      <rect x="17" y="26" width="3" height="6" fill="#654321" />
      {isBelievers && (
        <>
          <rect x="15" y="19" width="2" height="3" fill="#FFD700" />
          <rect x="14" y="20" width="4" height="1" fill="#FFD700" />
        </>
      )}
    </svg>
  );
};
