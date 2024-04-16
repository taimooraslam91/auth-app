import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import Home from './screens/Home.jsx';
import Login from './screens/Login.jsx';
import Signup from './screens/Signup.jsx';
import Dashboard from './screens/Dashboard.jsx';

import AdminRoute from '@/components/Router/AdminRoute.tsx';

import store from './store.js';
import { Provider } from 'react-redux';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Signup />} />
      <Route path='' element={<AdminRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
