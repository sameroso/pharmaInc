// Packages
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ErrorContainerProvider } from "components/ErrorContainerHandler";

// Pages
import { DashBoard } from "pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <ErrorContainerProvider>
          <Route path="/" component={DashBoard} />
        </ErrorContainerProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
