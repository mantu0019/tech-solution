import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./app/store";
 import AuthInitializer from "./components/AuthInitializer";
import AppRoutes from "./app/AppRoutes";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthInitializer>
      <RouterProvider router={AppRoutes} />
    </AuthInitializer>
  </Provider>,
);
