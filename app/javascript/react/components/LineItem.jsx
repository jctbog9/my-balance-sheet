import React, { useState } from 'react'

function LineItem({ reason, type, amount }) {
  const lineStyle = type === '-' ? 'expenseOption' : 'incomeOption'

  return (
    <div className={lineStyle}>
      {reason}: ${type}{amount}
    </div>
  )
}

export default LineItem