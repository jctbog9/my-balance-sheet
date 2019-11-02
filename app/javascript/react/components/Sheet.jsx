import React, { useState } from 'react'
import LineItem from './LineItem'

function Sheet() {
  const [lineItems, setLineItems] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [expenseAmount, setExpenseAmount] = useState(0)
  const [selectedValue, setSelectedValue] = useState('expense')
  const [totalBudget, setTotalBudget] = useState(0)
  const [totalExpenses, setTotalExpenses] = useState(0)
  const [reason, setReason] = useState('')
  const [total, setTotal] = useState(0)

  const showAddItemForm = () => {
    setShowForm(!showForm)
  }

  const handleExpenseChange = (event) => {
    setExpenseAmount(event.target.value)
  }

  const handleOptionSelect = (event) => {
    setSelectedValue(event.target.value)
  }

  const handleReasonChange = (event) => {
    setReason(event.target.value)
  }

  const handleSubmitExpense = (event) => {
    event.preventDefault()
    const formPayload = {
      type: (selectedValue === 'expense' ? '-' : '+'),
      amount: expenseAmount,
      reason: reason
    }
    setLineItems([lineItems, <LineItem key={formPayload.amount} reason={reason} type={formPayload.type} amount={formPayload.amount} />])

    let totalAmount = total
    if (selectedValue === 'expense') {
      const expenses = parseInt(expenseAmount)
      setTotalExpenses(totalExpenses + expenses)
      totalAmount -= expenses
    } else {
      const newAmount = (totalBudget + parseInt(expenseAmount))
      setTotalBudget(newAmount)
      totalAmount += newAmount
    }
    setTotal(totalAmount)
    setExpenseAmount(0)
  }

  return (
    <div className="sheet">
      Balance Sheet:
      {lineItems}
      {showForm ? (
        <div>
          <form onSubmit={handleSubmitExpense}>
            <div className="balanceSheetForm">
              <label>Reason:</label>
              <input type="text" value={reason} onChange={handleReasonChange} className="formOption" />
              <label>Type:</label>
              <select className="formOption" onChange={handleOptionSelect}>
                <option value="expense">Expense</option>
                <option value="addition">Additional Income</option>
              </select>
              <label>Amount:</label>
              <input type="number" value={expenseAmount} onChange={handleExpenseChange} className="formOption" />
            </div>
            <button className="addButton formOption" type="submit">Submit</button>
          </form>
          <div className="addButton formOption" onClick={showAddItemForm}>X</div>
        </div>
      ) : (
          <div className="addButton" onClick={showAddItemForm}>Add Line Item</div>
        )}
      {total < 0 ? (
        <div>
          Total Monthly Expenses: ${total}
        </div>
      ) : (
          <div>
            Total Monthly Expenses: ${totalExpenses}
            Total Budget Left: ${total}
          </div>
        )}
    </div>
  )
}

export default Sheet