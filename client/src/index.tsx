import { ColorModeScript, ChakraProvider } from '@chakra-ui/react';
import React, { createContext } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import theme from './Theme';
import io from 'socket.io-client';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);

// Socket.ioのインスタンスを作成
const socket = io('http://localhost:3001',{
  transportOptions: {
    polling: {
      extraHeaders: {
        'pingInterval': 25000, // pingメッセージの送信間隔（ミリ秒）を設定
      },
    },
  },
});

// Contextを作成
export const SocketContext = createContext(socket);

root.render(
  <SocketContext.Provider value={socket}>
    <ChakraProvider theme={theme}>
        <ColorModeScript />
        <App />
    </ChakraProvider>
  </SocketContext.Provider>
);

serviceWorker.unregister();
reportWebVitals();
