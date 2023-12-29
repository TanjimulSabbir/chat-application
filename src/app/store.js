import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/Api/apiSlice';
import authSlice from '../features/auth/authSlice';
import conversationsSlice from '../features/conversations/conversationsSlice';
import messagesSlice from '../features/messages/messagesSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    coversations: conversationsSlice,
    messages: messagesSlice
  },
});
