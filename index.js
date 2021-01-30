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
  transactionsContainer: document.querySelector('#data-table tbody'),
  
  addTransaction(transaction, index){
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)

    DOM.transactionsContainer.appendChild(tr)
  },

  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    const amount = Utils.formatCurrency(transaction)

    const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${transaction.amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
          <img src="./assets/minus.svg" alt="Remover transação">
        </td>
    `

    return html
  }
}

const Utils = {
  formatCurrency(value){
    const signal = Number(value) < 0 ? "-" : ""
  }
}

transactions.forEach(function (transaction) {
  DOM.addTransaction(transaction)
})