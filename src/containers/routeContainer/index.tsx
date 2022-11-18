import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from 'pages';

export default function RouteContainer() {
  return (
    <Router>
      <Switch>
        <Route path="/:id?">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
