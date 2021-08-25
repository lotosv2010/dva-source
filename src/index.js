import dva from './lib/dva';
import './index.css';
import createLogger from './lib/redux-logger';
import {createBrowserHistory} from 'history';
import createLoading from './lib/dva-loading';
import undoable from './lib/redux-undo';

// todo: 1. Initialize
const app = dva({
  onAction: createLogger,
  history: createBrowserHistory(),
  initialState: localStorage.getItem('state')?JSON.parse(localStorage.getItem('state')):undefined,
  onReducer: reducer => {
    const undoReducer = undoable(reducer);
    return function (state, action) {
      const newState = undoReducer(state, action);
      return {...newState, router: newState.present && newState.present.router || {}}
    }
  }
});
app.use(createLoading());
app.use({
  onStateChange(state) {
    localStorage.setItem('state', JSON.stringify(state));
  }
})

// todo: 2. Plugins
// app.use({});

// todo:  3. Model，注册模型 
app.model(require('./models/counter').default);
// app.model(require('./models/user').default);

// todo: 4. Router
app.router(require('./router').default);

// todo: 5. Start
app.start('#root');
