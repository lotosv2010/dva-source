import keymaster from 'keymaster'
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
export default {
  namespace: 'counter',
  state: {
    number: 0
  },
  reducers: {
    add(state, action) {
      // return { ...state, number: state.number + 1, ...action.payload };
      state.number += 1;
    },
    minus(state, action) {
      // return { ...state, number: state.number - 1, ...action.payload };
      state.number -= 1;
    }
  },
  subscriptions: {
    keyboard({ dispatch }) {
      keymaster('space', () => { // todo: 监听空格键
        dispatch({type: 'add'})
      })
    },
    changeTitle({ history }, done) {
      history.listen(({pathname}) => { // todo: 监听路由变化
        document.title = pathname
      })
      done('测试 counter subscriptions done error');
    }
  },
  effects: {
    // 监听counter/asyncAdd的动作，监听到了之后执行这个saga， takeEvery('counter/asyncAdd', *asyncAdd(action, effects){})
    *asyncAdd({ payload }, { call, put }) {  // eslint-disable-line
      yield call(delay, 1000)
      throw new Error('测试 counter effects error');
      yield put({ type: 'add' });
    },
    *asyncMinus({ payload }, { call, put }) {  // eslint-disable-line
      yield call(delay, 1000)
      yield put({ type: 'minus' });
    }
  }
};
