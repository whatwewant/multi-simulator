import { observable, action } from "mobx";
import nanoid from 'nanoid';
import Debounce from 'lodash-decorators/debounce';

export default class SimulatorModel {
  id = nanoid();

  @observable title;
  @observable site;
  @observable options;
  @observable hover = 0;

  constructor(title, site, options) {
    this.title = title;
    this.site = site;
    this.options = options;
  }

  @Debounce(250)
  @action
  toggleHover = (maxHover) => {
    this.hover = (maxHover + 10) % 1000;
  }
}
