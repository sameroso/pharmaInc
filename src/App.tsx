// Packages
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ErrorModule } from "components";

// Pages
import { DashBoard } from "pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <ErrorModule.ErrorContainerProvider>
          <Route path="/" component={DashBoard} />
        </ErrorModule.ErrorContainerProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
