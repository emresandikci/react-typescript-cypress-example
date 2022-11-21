import { RouteContainer } from 'containers';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from 'store';
import './index.css';

function App() {
  return (
    <div>
      <RouteContainer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('bb-fc-17112022') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
