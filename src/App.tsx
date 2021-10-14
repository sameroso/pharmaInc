// Packages
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Pages
import { DashBoard } from "pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={DashBoard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
