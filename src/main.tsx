import { Provider } from 'react-redux'

import { store } from '@/store/store'
import { createRoot } from 'react-dom/client'

import './styles/index.scss'

import { App } from './App'

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
