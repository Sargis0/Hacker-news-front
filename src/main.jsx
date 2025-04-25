import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import {App} from "./App.jsx";
import { Provider } from 'react-redux';

import "./index.css";

import {store} from "./app/store/store.js";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </StrictMode>,
)
