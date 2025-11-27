import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/home'
import Products from './pages/product';
import {Toaster} from "sonner";
import ProductDetails from './components/ProductDetails';
import store from './redux/store'
import { Provider } from 'react-redux'
import CategoryDetails from './components/CategoryDetails';

const App = () => {
  return (
    <Provider store={store}>
     <BrowserRouter>
     <Toaster position="top-right"/>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
         <Route path='products' element={<Products/>}/>
         <Route path='products/:id' element={<ProductDetails/>}/>
         <Route path='category/:name' element={<CategoryDetails/>}/>
        </Route>
      </Routes>
     </BrowserRouter>
     </Provider>
  )
}

export default App