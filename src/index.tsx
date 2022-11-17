import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from 'store';
// import reportWebVitals from './reportWebVitals';
import './index.css';

function App() {
  return (
    <div>
      <header className="text-white">bb-fc-17112022</header>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('bb-fc-17112022') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
