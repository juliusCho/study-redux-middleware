import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import rootReducer, { rootSaga } from "./modules";
// import myLogger from "./middlewares/myLogger";
import logger from 'redux-logger';
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from 'redux-thunk';
import { BrowserRouter, Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
import axios from 'axios';
import createSagaMiddleware from 'redux-saga';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : 'http://127.0.0.1/';

const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
    context: {
        history: customHistory
    }
});

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            ReduxThunk.withExtraArgument({ history: customHistory }),
            sagaMiddleware,
            logger
        )
    )
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Router history={customHistory}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
