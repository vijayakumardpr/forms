import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Create from "../components/Create";
import View from "../components/View";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/create", element: <Create /> },
  { path: "/view/:id", element: <View /> },
  { path: "/edit/:id", element: <Create /> },
]);
