import React from 'react';
import ReactDOM from 'react-dom';
import {createHashHistory} from 'history';
import {createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import prefixNamespace from './prefixNamespace';

export {
  connect
}
export default function dva(opts={}) {
  const history = opts.history || createHashHistory;

  function model(m) {
    const prefixedModel = prefixNamespace(m);
    m = prefixedModel;
    app._models.push(m);
  }
  function router(router) {
    app._router = router; // 定义路由
  }
  function start(container) {
    const reducers = createReducer(app);
    app._store = createStore(reducers);

    ReactDOM.render(
      <Provider store={app._store}>
        {app._router({history: history()})}
      </Provider>,
      document.querySelector(container));
  }

  function createReducer(app) {
    const reducers = {}; // 此对象将会用来合并，会传给 combineReducers
    for (const model of app._models) {
      reducers[model.namespace] = function(state=model.state, action) {
        const model_reducers = model.reducers;
        const reducer = model_reducers[action.type];
        if(reducer) {
          return reducer(state, action);
        }
        return state;
      }
    }
    return combineReducers(reducers);
  }

  const app = {
    _models: [],
    model,
    _router: null,
    router,
    start
  }
  return app;
}