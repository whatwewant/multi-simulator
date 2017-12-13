import { observable, action } from "mobx";
import nanoid from 'nanoid';

export default class SimulatorModel {
  id = nanoid();

  @observable title;
  @observable site;
  @observable options;
  @observable hover = false;

  constructor(title, site, options) {
    this.title = title;
    this.site = site;
    this.options = options;
  }

  @action
  toggleHover = () => {
    this.hover = !this.hover;
  }
}
