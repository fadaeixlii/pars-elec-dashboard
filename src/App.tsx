import { RouteHandler } from "./RouteHandle";
import "./App.css";
import { Provider as ReduxStoreProvider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import localStorageHelper from "./Helpers/localStorageHelper";
import "@mdxeditor/editor/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  useEffect(() => {
    const localHttp = localStorageHelper.getLocalHttp() ?? "product";

    localStorageHelper.setLocalHttp(localHttp);
  }, []);

  return (
    <ReduxStoreProvider store={store}>
      <RouteHandler />
      <ToastContainer />
    </ReduxStoreProvider>
  );
}

export default App;
