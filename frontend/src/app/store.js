import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import challengeReducer from '../features/challenges/challengeSlice'
import participantReducer from '../features/participants/participantSlice'
import leaderboardReducer from '../features/leaderboard/leaderboardSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    challenge: challengeReducer,
    participants: participantReducer,
    leaderboard: leaderboardReducer
  },
});
