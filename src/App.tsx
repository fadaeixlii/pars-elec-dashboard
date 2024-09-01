import { RouteHandler } from "./RouteHandle";
import "./App.css";
import { Provider as ReduxStoreProvider } from "react-redux";
import { store } from "./store";
import "@mdxeditor/editor/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <ReduxStoreProvider store={store}>
      <RouteHandler />
      <ToastContainer />
    </ReduxStoreProvider>
  );
}

export default App;
