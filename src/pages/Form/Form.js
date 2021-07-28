import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Valor from './Valor';
import Moeda from './Moeda';
import MetodoPagamento from './MetodoPagamento';
import Tag from './Tag';
import Descricao from './Descricao';

import {
  addExpenseAction,
  fetchApiExchangeThunk,
  increaseCounterAction,
  increaseTotalExpenseAction } from '../../actions';

class Form extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.generateExpense = this.generateExpense.bind(this);
  }

  async generateExpense() {
    const {
      addExpense,
      getMetodoPagamento,
      getMoeda,
      getTag,
      getValor,
      getDescricao,
      getExchangeRates,
      getCounter,
      increaseCounter,
      increaseTotalExpense } = this.props;

    const typedExpense = {
      id: getCounter,
      value: getValor,
      currency: getMoeda,
      method: getMetodoPagamento,
      tag: getTag,
      description: getDescricao,
      exchangeRates: getExchangeRates,
    };

    increaseCounter(); // Incrementa id da despesa
    await addExpense(typedExpense);
    await increaseTotalExpense();
  }

  async handleClick(e) {
    e.preventDefault();

    const { fetchExpense } = this.props; // Salva os dados da cotação
    await fetchExpense();

    await this.generateExpense(); // Inclui em Expenses
  }

  render() {
    return (
      <>
        <Valor />
        <Moeda />
        <MetodoPagamento />
        <Tag />
        <Descricao />
        <button type="submit" onClick={ this.handleClick }>Adicionar Despesa</button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  getValor: state.form.valor,
  getMoeda: state.form.moeda,
  getMetodoPagamento: state.form.metodo,
  getTag: state.form.tag,
  getDescricao: state.form.descricao,
  getExchangeRates: state.wallet.exchangeRates,
  getCounter: state.wallet.counter,
  totalValue: state.wallet.totalValue,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (state) => dispatch(addExpenseAction(state)),
  fetchExpense: (state) => dispatch(fetchApiExchangeThunk(state)),
  increaseCounter: (state) => dispatch(increaseCounterAction(state)),
  increaseTotalExpense: (state) => dispatch(increaseTotalExpenseAction(state)),
});

Form.propTypes = {
  increaseTotalExpense: PropTypes.func.isRequired,
  getExchangeRates: PropTypes.func.isRequired,
  getCounter: PropTypes.number.isRequired,
  increaseCounter: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  fetchExpense: PropTypes.func.isRequired,
  getValor: PropTypes.number.isRequired,
  getMoeda: PropTypes.string.isRequired,
  getMetodoPagamento: PropTypes.string.isRequired,
  getTag: PropTypes.string.isRequired,
  getDescricao: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
