import React from 'react';

export const Notification = ({ notification }) => {
  if (!notification) return null;

  return (
    <div className="fixed top-20 right-4 bg-amber-100 border-4 border-amber-800 rounded-xl p-4 shadow-xl z-50 animate-slide-in max-w-xs">
      <div className="font-bold text-amber-900 mb-1">{notification.title}</div>
      <div className="text-sm text-amber-700">{notification.message}</div>
    </div>
  );
};
