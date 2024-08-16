import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/user.slice';
import lootReducer from './loot/loot.slice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        loot: lootReducer
    },
});

