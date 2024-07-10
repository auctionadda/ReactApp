import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ClusterControl from "./components/dev/ClusterControl";
import InstrumentCluster from "./components/instrumentcluster/InstrumentCluster";
import { useEventManager } from "./components/Hooks/useEventManager";
const Root = () => {
  useEventManager();
  return (
    <Router>
      <Switch>
        <Route path="/cluster-control">
          <ClusterControl />
        </Route>
        <Route path="/">
          <InstrumentCluster />
        </Route>
      </Switch>
    </Router>
  );
};

export default Root;
