import React, { createContext, useContext, useEffect, useState } from 'react';

const WebSocketContext = createContext<WebSocket | null>(null);

const WEBSOCKET_URL = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL?.replace(
  /^http/,
  'ws'
)}/ws`;

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null); // ใช้ useState แทน useRef เพื่อบังคับให้ component รีเรนเดอร์เมื่อมีการเปลี่ยนแปลงค่า

  useEffect(() => {
    const newSocket = new WebSocket(WEBSOCKET_URL);

    newSocket.onopen = () => {
      // console.log('WebSocketProvider - WebSocket connection established');
    };

    newSocket.onclose = () => {
      // console.log('WebSocketProvider - WebSocket connection closed');
    };

    newSocket.onerror = () => {
      // console.error('WebSocketProvider - WebSocket error:', error);
    };

    newSocket.onmessage = () => {
      // console.log(
      //   'WebSocketProvider - WebSocket received message:',
      //   event.data
      // );
    };

    setSocket(newSocket); // อัพเดต WebSocket instance

    // Cleanup function เมื่อ component ถูก unmount
    return () => {
      if (newSocket) {
        newSocket.close();
        // console.log('WebSocketProvider - WebSocket connection cleaned up');
      }
    };
  }, []); // Empty dependency array เพื่อให้ effect นี้รันแค่ครั้งเดียวเมื่อ component mount

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Hook สำหรับใช้ WebSocket ใน Components
export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  // console.log('useWebSocket - Context value:', context);
  return context;
};
