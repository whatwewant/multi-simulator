import React from "react";
import { render } from "react-dom";
import { Provider, inject, observer } from 'mobx-react';
// import DevTools from "mobx-react-devtools";

import Panel from './components/Panel';
import Simulator from './components/Simulator';

import AppModel from "./models/app";

const store = new AppModel();


@inject('store')
@observer
class App extends React.PureComponent {
  render() {
    const simulators = this.props.store.simulators;
    const maxHover = this.props.store.maxHover;

    return (
      <Panel>
        {simulators.map(simulator => (
          <Simulator
            key={simulator.id}
            x={simulator.options.x}
            y={simulator.options.y}
            width={simulator.options.width}
            height={simulator.options.height}
            title={simulator.title}
            site={simulator.site}
            simulator={simulator}
            maxHover={maxHover}
          />
        ))}
      </Panel>
    );
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// playing around in the console
// window.store = store;
