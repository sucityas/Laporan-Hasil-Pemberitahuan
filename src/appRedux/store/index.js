import { applyMiddleware, compose, createStore } from "redux";
import reducers from "../reducers/index";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import storage from 'redux-persist/lib/storage/session';
import { persistStore, persistReducer } from 'redux-persist'
import { CookieStorage } from 'redux-persist-cookie-storage'
import Cookies from 'cookies-js'
import expireReducer from "redux-persist-expire";
const log = createLogger({ diff: false, collapsed: true });
const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  thunk,
  sagaMiddleware,
  log
];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'ceisa4',
  storage: new CookieStorage(Cookies),
  transforms: [
    expireReducer('rkc', {
      //reset state jika tidak ada update selama 1 Hari
      expireSeconds: parseInt(process.env.REACT_APP_USER_SESSION_EXPIRE_TIME),
      autoExpire: true
    })
  ],
  whitelist: ['rkc'],
  timeout: 0
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  undefined,
  composeEnhancers(applyMiddleware(...middlewares))
);

let persistor = persistStore(store, window.PRELOADED_STATE)

export {
  store,
  persistor
};
