import React from 'react';

import Header from './Header';
import Form from './Form/Form';
import Expenses from './Expenses';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Form />
        <Expenses />
      </>
    );
  }
}

export default Wallet;
