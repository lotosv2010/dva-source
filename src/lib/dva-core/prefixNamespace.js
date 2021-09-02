import {NAMESPACE_SEP} from './constant';

// 将reducers对象的属性名从add变为counter/add
function prefix(obj, namespace) {
  return Object.keys(obj).reduce((memo, key) => {
    const newKey = `${namespace}${NAMESPACE_SEP}${key}`;
    memo[newKey] = obj[key];
    return memo;
  }, {})
}

function prefixNamespace(model) {
  if(model.reducers) {
    model.reducers = prefix(model.reducers, model.namespace);
  }
  if(model.effects) {
    model.effects = prefix(model.effects, model.namespace);
  }
  return model;
}

export default prefixNamespace;