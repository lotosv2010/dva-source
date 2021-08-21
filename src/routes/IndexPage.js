import React from 'react';
import { connect } from '../lib/dva';
import styles from './IndexPage.css';

function IndexPage(props) {
  const {counter: {number}, dispatch} = props
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Counter</h1>
      <div className={styles.welcome}>number: {number}</div>
      <p><button onClick={() => dispatch({type: 'counter/add'})}>+</button></p>
      <p><button onClick={() => dispatch({type: 'counter/minus'})}>-</button></p>
      <p><button onClick={() => dispatch({type: 'counter/asyncAdd'})}>+(async)</button></p>
      <p><button onClick={() => dispatch({type: 'counter/asyncMinus'})}>-(async)</button></p>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect((state) => ({...state}))(IndexPage);
