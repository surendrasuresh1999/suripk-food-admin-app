import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CommonPage from './Pages/CommonPage';
import FoodItemsPage from './Pages/FoodItemsPage';
import OrdersPage from './Pages/OrdersPage';
import ServicesPage from './Pages/ServicesPage';

const App = () => {
  return (
    <Routes>
      <Route path='' element={<CommonPage />}/>
      <Route path='/food-items' element={<FoodItemsPage />}/>
      <Route path='/orders' element={<OrdersPage />}/>
      <Route path='/services' element={<ServicesPage />}/>
      <Route path='' element={<CommonPage />}/>
    </Routes>
  )
}

export default App