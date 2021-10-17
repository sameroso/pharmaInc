// Packages
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { ErrorModule, Header, GlobalLoaderModule } from "components";

// Pages
import { DashBoard } from "pages/dashboard";
import { Login } from "pages/login";

function App() {
  return (
    <BrowserRouter>
      <GlobalLoaderModule.GlobalLoaderProvider>
      <Route exact path="/dashboard" component={Header} />
        <GlobalLoaderModule.GlobalLoader />
        <Switch>
          <Route exact path="/" component={Login} />
          <ErrorModule.ErrorContainerProvider>
            <Route exact path="/dashboard" component={DashBoard} />
          </ErrorModule.ErrorContainerProvider>
        </Switch>
      </GlobalLoaderModule.GlobalLoaderProvider>
    </BrowserRouter>
  );
}

export default App;
