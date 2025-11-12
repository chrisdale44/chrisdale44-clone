import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import InvoicesList from './components/InvoicesList'
import InvoiceShow from './components/InvoiceShow'

import 'react-datepicker/dist/react-datepicker.css'
import './styles.css'
// import GettingStarted from './GettingStarted'

function App() {
  return (
    <div className="px-5">
      {/* <GettingStarted /> */}
      <Router>
        <Routes>
          <Route path="/invoice/:id" Component={InvoiceShow} />
          <Route path="/invoice" Component={InvoiceShow} />
          <Route path="/" Component={InvoicesList} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
