import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Sheet from './Sheet'

export const App = props => {
  return (
    <Router>
      <Route exact path="/" component={Sheet} />
    </Router>
  )
}

export default App