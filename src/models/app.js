import { observable, computed, action } from "mobx";
import { parse, stringify } from 'easy-query-string';
import Debounce from 'lodash-decorators/debounce'; 

import Simulator from './simulator';

const SITE = parse(location.search).site || 'http://music.moeover.com';

export default class AppModel {
  @observable simulators = [
    new Simulator('IPhone 5', SITE, { x: 10, y: 10, width: 320, height: 568 }),
    new Simulator('IPhone 6', SITE, { x: 340, y: 10, width: 375, height: 667 }),
    new Simulator('IPhone 6 Plus', SITE, { x: 725, y: 10, width: 414, height: 736 }),
    new Simulator('Desktop', SITE, { x: 1149, y: 10, width: 500, height: 450 }),
  ];

  @observable site = null;

  @Debounce(250)
  @computed
  get maxHover() {
    const value = this.simulators.reduce((a, b) => a > b.hover ? a : b.hover, 0);
    return value;
  }

  @action
  addSimulator(title, site, options = { width: 375, height: 667 }) {
    this.simulators.push(new Simulator(title, site, options));
  }

  @action
  removeSimulator = (simulator) => {
    this.simulators.remove(simulator);
  }

  @action
  updateSite = site => {
    this.site = site;
  }
}
