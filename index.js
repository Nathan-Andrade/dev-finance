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

const Transaction = {
  all: [
    {
      description: 'Água',
      amount: -20000,
      date: '21/01/2021'
    },
    {
      description: 'Projeto de site',
      amount: 600000,
      date: '21/01/2021'
    },
    {
      description: 'Luz',
      amount: -50000,
      date: '21/01/2021'
    },
  ],

  add(transaction){
    Transaction.all.push(transaction)

    App.reload()
  },

  remove(index){
    Transaction.all.splice(index, 1)

    App.reload()
  },

  //somar as entradas
  incomes(){
    let income = 0;
    //pegar todas as transacoes
    Transaction.all.forEach(transaction => {
      if (transaction.amount > 0){
        income += transaction.amount;
      }
    })
    return income;
  },
  //somar as saídas
  expenses(){
    let expense = 0;
    //pegar todas as transacoes
    Transaction.all.forEach(transaction => {
      if (transaction.amount < 0){
        expense += transaction.amount;
      }
    })
    return expense;
  },
  //soma das entradas - saídas
  total(){
    return Transaction.incomes() + Transaction.expenses();
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

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
          <img src="./assets/minus.svg" alt="Remover transação">
        </td>
    `

    return html
  },

  updateBalance() {
    document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes());
    document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses());
    document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total());
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = ""
  }
}

const Utils = {
  formatAmount(value){
    
  },

  formatCurrency(value){
    const signal = Number(value) < 0 ? "-" : ""

    value = String(value).replace(/\D/g, "")

    value = Number(value) / 100

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

    return signal + value
  }
}

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues(){
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },

  validateFields(){
    const { description, amount, date } = Form.getValues()
   
    if(description.trim() === "" || amount.trim() === "" || date.trim() === ""){
      throw new Error("Por favor, preencha todos os campos")
    }
  },

  formatValues(){
    let { description, amount, date } = Form.getValues()

    amount = Utils.formatAmount()
  },
  submit(event){
    event.preventDefault()

    try{
      Form.validateFields()
      //verificar se todas as informações foram preenchidas
      Form.formatValues()

    } catch (error){
      alert(error.message)
    }

   

  }
}

const App = {
  init(){

    Transaction.all.forEach(function (transaction) {
      DOM.addTransaction(transaction)
    })
    
    DOM.updateBalance();
    
    
  },

  reload() {
    DOM.clearTransactions()
    App.init()
  },
}

App.init();
