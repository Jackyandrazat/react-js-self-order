import React, { useEffect, useState } from 'react';

const Notifications = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // For simulation: trigger a notification after a delay.
    const timeout = setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        message: "Bahan baku 'Beras' hampir habis.",
        type: 'warning'
      }]);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  const dismissNotification = (id) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  return (
    <div className="fixed top-20 left-0 w-full flex flex-col items-center z-40 pointer-events-none">
      {messages.map((notification) => (
        <div
          key={notification.id}
          className="pointer-events-auto bg-yellow-50 dark:bg-yellow-900/80 border-l-4 border-yellow-400 text-yellow-900 dark:text-yellow-100 px-4 py-3 rounded-lg shadow-lg mb-3 flex items-center gap-3 animate-fade-in"
        >
          <span className="text-xl">⚠️</span>
          <div>
            <p className="font-semibold">Stock Alert</p>
            <p className="text-sm">{notification.message}</p>
          </div>
          <button
            onClick={() => dismissNotification(notification.id)}
            className="ml-4 text-yellow-600 hover:text-yellow-900 transition-colors duration-200"
          >
            <span className="sr-only">Dismiss</span>✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
