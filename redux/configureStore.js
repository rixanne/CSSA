import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

const config = {
  key: 'root',
  storage,
  debug: true
};

export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
      campsites,
      comments,
      partners,
      promotions,
      favorites
    }),
    applyMiddleware(thunk, logger)
  );

  const persistor = persistStore(store);

  return { persistor, store };
};
