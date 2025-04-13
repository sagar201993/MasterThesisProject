import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { DataProvider } from './provider/DataProvider';


import store from './store';

serviceWorker.register();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <DataProvider>
                <App />
            </DataProvider>
        </BrowserRouter>
    </Provider>
);

serviceWorker.unregister();