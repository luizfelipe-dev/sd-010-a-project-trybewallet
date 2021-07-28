import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { decreaseTotalExpenseAction } from '../actions';

class Expenses extends Component {
  constructor() {
    super();

    this.handleDeleteColumn = this.handleDeleteColumn.bind(this);
  }

  convertCurrency(expense) {
    return (parseFloat(expense.exchangeRates[expense.currency].ask)
    * parseFloat(expense.value)).toFixed(2);
  }

  handleDeleteColumn(ev, id, tableItem) {
    const { decreaseExpense } = this.props;

    const tdValue = document.getElementById(tableItem).innerHTML;
    decreaseExpense(tdValue);

    const getRow = document.getElementById(`row${id}`);
    getRow.remove(ev.target);
  }

  render() {
    const { getExpenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio</th>
            <th>Semi-Total</th>
            <th>Moeda de Conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {getExpenses.map((expense) => (
            <tr key={ expense.id } id={ `row${expense.id}` }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>{expense.exchangeRates[expense.currency].name.split('/')[0]}</td>
              <td>
                {parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}
              </td>
              <td id={ `totalvalue${expense.id}` }>
                {
                  (Number(expense.value)
                * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)
                }
              </td>
              <td>Real</td>
              <td>
                <button type="button" data-testid="edit-btn">Editar</button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ (ev) => this.handleDeleteColumn(ev, expense.id, `totalvalue${expense.id}`) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  getExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  decreaseExpense: (state) => dispatch(decreaseTotalExpenseAction(state)),
});

Expenses.propTypes = {
  getExpenses: PropTypes.func.isRequired,
  decreaseExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
