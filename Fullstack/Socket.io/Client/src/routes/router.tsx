import { createBrowserRouter } from 'react-router-dom';
import Layout from './_layout';
import Index from './index';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      // Add more routes here as needed
      // {
      //   path: '/about',
      //   element: <About />,
      // },
      // {
      //   path: '/contact',
      //   element: <Contact />,
      // },
    ],
  },
]); 