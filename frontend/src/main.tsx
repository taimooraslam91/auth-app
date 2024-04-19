import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.scss';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Dashboard from './screens/Dashboard';
import AdminRoute from '@/components/Router/AdminRoute';
import PrivateRoute from './components/Router/PrivateRoute';
import Products from '@/components/dashboard/product-table';
import Users from '@/components/dashboard/user-table';
import Heading from './components/dashboard/Heading';

import store from './store.ts';
import { Provider } from 'react-redux';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Signup />} />
      <Route path='' element={<AdminRoute />}>
        <Route
          path='users'
          element={
            <Dashboard>
              <Users />
            </Dashboard>
          }
        />
      </Route>
      <Route path='' element={<PrivateRoute />}>
        <Route
          path='dashboard'
          element={
            <Dashboard>
              <Heading text='Dashboard' />
            </Dashboard>
          }
        />
        <Route
          path='product'
          element={
            <Dashboard>
              <Products />
            </Dashboard>
          }
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
