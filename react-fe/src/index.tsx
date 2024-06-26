import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import { NextUIProvider } from "@nextui-org/react";
import { MainContextProvider } from './contexts/main_context';
import { LeaderboardContextProvider } from './contexts/leaderboard_context';
import { GameContextProvider } from './contexts/game_context';

axios.defaults.baseURL = process.env.REACT_APP_API_ORIGIN

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <MainContextProvider>
        <LeaderboardContextProvider>
          <GameContextProvider>
            <App />
          </GameContextProvider>
        </LeaderboardContextProvider>
      </MainContextProvider>
    </NextUIProvider>
  </React.StrictMode>
);
