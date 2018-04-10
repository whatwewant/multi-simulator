import React from "react";
import { render } from "react-dom";
import { Provider, inject, observer } from 'mobx-react';
import Loadable from 'react-loadable';
// import DevTools from "mobx-react-devtools";

// import Panel from './components/Panel';
// import Simulator from './components/Simulator';

import AppModel from "./models/app";

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}

const SiteForm = Loadable({
  loader: () => import('./components/ModalForm'),
  loading: () => null,
});

const Panel = Loadable({
  loader: () => import('./components/Panel'),
  loading: () => null,
});

const Simulator = Loadable({
  loader: () => import('./components/Simulator'),
  loading: () => null,
});

const store = new AppModel();

@inject('store')
@observer
class App extends React.PureComponent {
  state = {
    visible: true,
  };

  onOk = ({ site }) => {
    this.props.store.updateSite(site);
    
    this.setState({ visible: false });
  };

  render() {
    const { site, simulators } = this.props.store;
    const maxHover = this.props.store.maxHover;
    const { visible } = this.state;
    console.log(site);

    return (
      <Panel>
        <SiteForm
          visible={visible}
          title="请输入WebSite"
          onOk={this.onOk}
        />
        {site && simulators.map(simulator => (
          <Simulator
            key={simulator.id}
            x={simulator.options.x}
            y={simulator.options.y}
            width={simulator.options.width}
            height={simulator.options.height}
            title={simulator.title}
            site={site}
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
