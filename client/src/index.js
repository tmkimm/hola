import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import languageReducer from './store/language';
import userReducer from './store/user';
import writeReducer from './store/write';
import readReducer from './store/read';
import itFilterReducer from './store/itFilter';
import loginStepReducer from './store/loginStep';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ReactGA from 'react-ga4';

ReactGA.initialize('G-WJQH1M67X8');

const queryClient = new QueryClient();
const SentryId = process.env.REACT_APP_SENTRY_API_KEY;

Sentry.init({
  dsn: process.env.NODE_ENV === 'production' ? SentryId : false,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});

const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['user'],
};

const reducers = combineReducers({
  language: languageReducer,
  user: userReducer,
  write: writeReducer,
  read: readReducer,
  loginStep: loginStepReducer,
  itFilter: itFilterReducer,
});

const _persistedReducer = persistReducer(persistConfig, reducers);

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: _persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: customizedMiddleware,
});

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </PersistGate>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
