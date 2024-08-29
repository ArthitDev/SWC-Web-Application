import { useWebSocket } from 'contexts/WebSocketProvider';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';

const useRefetchWebSocket = (queryKey: string, eventType: string) => {
  const queryClient = useQueryClient();
  const socket = useWebSocket();

  useEffect(() => {
    if (!socket) {
      //
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.eventType === eventType) {
        queryClient.invalidateQueries(queryKey);
      }
    };

    socket.addEventListener('message', handleMessage);

    // eslint-disable-next-line consistent-return
    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket, queryClient, queryKey, eventType]);
};

export default useRefetchWebSocket;
