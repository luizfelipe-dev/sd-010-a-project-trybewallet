const FORM_INITIAL_STATE = {
  valor: '',
  moeda: 'USD',
  metodoPagamento: 'dinheiro',
  tag: 'Lazer',
  descricao: '',
};

const form = (state = FORM_INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_VALOR':
    return {
      ...state,
      valor: action.payload.valor,
    };

  case 'SET_MOEDA':
    return {
      ...state,
      moeda: action.payload.moeda,
    };

  case 'SET_METODO':
    return {
      ...state,
      metodoPagamento: action.payload.metodo,
    };

  case 'SET_TAG':
    return {
      ...state,
      tag: action.payload.tag,
    };

  case 'SET_DESCRICAO':
    return {
      ...state,
      descricao: action.payload.descricao,
    };

  default: return state;
  }
};

export default form;
