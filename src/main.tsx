import { createRoot } from "react-dom/client";
import App from "@src/App.tsx";
import { store } from "@src/store/store.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
