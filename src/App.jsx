// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "./pages/Home";

const route = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="/:tab" element={<Home />} />
      {/* <Route index element={<Home />} /> */}
    </Route>,
  ])
);

function App() {
  return <RouterProvider router={route}></RouterProvider>;
}

export default App;
