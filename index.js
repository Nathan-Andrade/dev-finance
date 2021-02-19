
// Light/Dark Mode
const html = document.querySelector('html')
const checkbox = document.querySelector('input[name=theme]')

const getStyle = (element, style) => 
  window.getComputedStyle(element).getPropertyValue(style)

  const initialColors = {
    lightBlue: getStyle(html, "--light-blue"),
    colorDark: getStyle(html, "--color-dark"),
    green: getStyle(html, "--green"),
    lightGreen: getStyle(html, "--light-green"),
    red: getStyle(html, "--red"),
    pessegoColor: getStyle(html, "--pessego-color")
  }

  const darkMode = {
    colorDark: "#8257E6",
    lightBlue: "#7300DA",
    pessegoColor: "#969cb3"
  }

  const transformKey = key => 
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

  const changeColors = (colors) => {
    Object.keys(colors).map(key => 
      html.style.setProperty(transformKey(key), colors[key])
    )
  }

  checkbox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors)
  })



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


const Storage = {
  get(){
    return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
  },

  set(transaction){
    localStorage.setItem("dev.finances:transactions", JSON.stringify(transaction))
  }
}

const Transaction = {
  all: Storage.get(),

  add(transaction){
    Transaction.all.push(transaction)

    App.reload();
  },

  remove(index){
    Transaction.all.splice(index, 1)

    App.reload();
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
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
    tr.dataset.index = index

    DOM.transactionsContainer.appendChild(tr)
  },

  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
          <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
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
    value = Number(value) * 100

    return value
  },

  formatDate(date){
    const splittedDate = date.split("-")

    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
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

    amount = Utils.formatAmount(amount)

    date = Utils.formatDate(date)

    return {
      description,
      amount,
      date
    }
  },

  clearFields(){
    Form.description.value = ""
    Form.amount.value = ""
    Form.date.value = ""
  },
  
  submit(event){
    event.preventDefault()

    try{
      //verificar se todas as informações foram preenchidas
      Form.validateFields()
      const transaction =  Form.formatValues()

      Transaction.add(transaction)

      Form.clearFields()
      
      Modal.close()

      App.reload();

    } catch (error){
      alert(error.message)
    }

   

  }
}


const App = {
  init(){
    
    Transaction.all.forEach(function (transaction, index) {
      DOM.addTransaction(transaction, index)
    })
    
    DOM.updateBalance();
    
    Storage.set(Transaction.all)
  },
  
  reload() {
    DOM.clearTransactions()
    App.init()
  },
}

const Message = {
  // abrir mensagem se a transacao é positiva/negativa
  message(){
    $('button').click(function(){
      $('.alert').addClass('show');
      $('.alert').removeClass('hide');
      $('.alert').addClass('showAlert');
      setTimeout(function(){
        $('.alert').removeClass('show');
        $('.alert').addClass('hide');
      }, 5000);
    })

    $('.close-btn').click(function(){
      $('.alert').removeClass('show');
      $('.alert').addCLass('hide');
    })

    const error = document.querySelector('.error-message')

    if(Form.getValues.amount > 0){
      submit(); return Message
    } else {
     submit(); return error
    }
  }   

  
}



App.init();
Message.message();