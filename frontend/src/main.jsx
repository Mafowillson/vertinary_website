import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './i18n'
import App from './App.jsx'
import FullPageSpinner from './components/FullPageSpinner.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<FullPageSpinner />}>
      <App />
    </Suspense>
  </React.StrictMode>,
)

