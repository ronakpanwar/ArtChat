import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Toaster} from 'sonner'
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from 'react-redux'
import store from './Redux/store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
<Provider store={store}>
    <ThemeProvider>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
      <Toaster/>
    </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
