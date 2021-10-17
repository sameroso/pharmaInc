// Packages
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ErrorModule, Header, GlobalLoaderModule } from "components";

// Pages
import { DashBoard } from "pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <GlobalLoaderModule.GlobalLoaderProvider>
        <GlobalLoaderModule.GlobalLoader />
        <Switch>
          <ErrorModule.ErrorContainerProvider>
            <Route path="/" component={DashBoard} />
          </ErrorModule.ErrorContainerProvider>
        </Switch>
      </GlobalLoaderModule.GlobalLoaderProvider>
    </BrowserRouter>
  );
}

export default App;
