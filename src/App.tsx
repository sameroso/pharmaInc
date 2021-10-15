// Packages
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ErrorModule, Header } from "components";

// Pages
import { DashBoard } from "pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <ErrorModule.ErrorContainerProvider>
          <Route path="/" component={DashBoard} />
        </ErrorModule.ErrorContainerProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
