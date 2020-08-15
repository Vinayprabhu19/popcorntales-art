import React, { Suspense, lazy } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  const reload = () => window.location.reload();
  const Home = lazy(() => import('./components/Home'));
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
    </Suspense>
    </Router>
  );
}

export default App;
