import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './components/Home';
import ShopPage from './components/ShopPage';
import ProductPageContainer from './components/ProductPageContainer';
import About from './components/About';
import Cart from './components/Cart';
import ErrorPage from './components/ErrorPage';
import Checkout from './components/Checkout';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'shop',
          element: <ShopPage />
        },
        {
          path: 'about',
          element: <About />
        },
        {
          path: 'shop/:productId',
          element: <ProductPageContainer />
        },
        {
          path: 'cart',
          element: <Cart />
        },
        {
          path: 'checkout',
          element: <Checkout />
        },
        {
          path: '*',
          element: <ErrorPage />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
