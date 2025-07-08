import React, { useEffect, useState } from 'react';

const Notifications = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // For simulation: trigger a notification after a delay.
    const timeout = setTimeout(() => {
      setMessages(prev => [...prev, "Bahan baku 'Beras' hampir habis."]);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {messages.map((msg, idx) => (
        <div key={idx} className="bg-yellow-300 text-yellow-900 p-2 rounded shadow">
          {msg}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
