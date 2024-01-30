import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Cart } from './components/Cart'
import { Products } from './components/Products'
import { Header } from './components/Header'
import './app.module.scss'
import AdminPage from './components/AdminPage'
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <main>
        <Routes>
        <Route
         path="/AdminPage"
         element={<AdminPage onAddProduct={function (): void {
           throw new Error('Function not implemented.')
         } } onRemoveProduct={function (): void {
           throw new Error('Function not implemented.')
         } } />}
         />
        <Route
            path="/"
            element={<Products />}
          />
          <Route
            path="/cart"
            element={<Cart />}
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App