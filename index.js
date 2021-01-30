const Modal = {
  //abrir modal/ open modal
  open(){
    document.querySelector('.modal-overlay').classList.add('active')
  },
  //fechar modal/close modal
  close(){
    document.querySelector('.modal-overlay').classList.remove('active')
  }
}

const transactions = [
  {
    id: 1,
    description: 'Água',
    amount: -20000,
    date: '21/01/2021'
  },
  {
    id: 2,
    description: 'Projeto de site',
    amount: 20000,
    date: '21/01/2021'
  },
  {
    id: 3,
    description: 'Luz',
    amount: -50000,
    date: '21/01/2021'
  },
];

const Transaction = {
  //somar as entradas
  incomes(){

  },
  //somar as saídas
  expenses(){

  },
  //soma das entradas - saídas
  total(){

  }
}

const DOM = {
  addTransaction(transaction, index){
    console.log('Working...')
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction()
  },

  innerHTMLTransaction() {
    const html = `
        <td class="description">Luz</td>
        <td class="expense">- R$ 500,00</td>
        <td class="date">23/01/2021</td>
        <td>
          <img src="./assets/minus.svg" alt="Remover transação">
        </td>
    `

    return html
  }
}

DOM.addTransaction()