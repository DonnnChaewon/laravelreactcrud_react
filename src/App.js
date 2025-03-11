import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './Header'
import Add from './Add'
import List from './List'
import Edit from './Edit'

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/addtopic' element={<Add />} />
          <Route exact path='/topicslist' element={<List />} />
          <Route path='edittopic/:id/edit' element={<Edit />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App