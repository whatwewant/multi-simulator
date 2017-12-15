import React, { PureComponent } from "react";
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import Spin from 'elfen-component-spinner/lib/components/beat';
import Draggable from 'react-draggable';

import Frame from './Frame';

const Wrapper = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: ${props => props.width}px;
  border: 0px solid #f6f6f6;
  border-radius: 6px;
  box-shadow: 0px 0px 4px #ccc;
  overflow: hidden;
  z-index: ${props => props.hover};
  pointer-events: auto;
  background-color: #fff;
`;

const Header = styled.div`
  position: relative;
  background-color: #F6F6F6;
  width: 100%;
  height: 20px;
  cursor: all-scroll;
`;

const Body = styled.div`
  position: relative;
  border: none;
  width: 100%;
  height: ${props => props.height}px;
`;

const Title = styled.div`
  color: #3B393B;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  font-weight: 400;
  background-color: #F6F6F6;
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
`;

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => !props.loaded ? 1 : 0};
  background-color: #F6F6F6;
  display: ${props => props.show ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  transition: opacity .5s;
`;

const Action = styled.li`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 6px;
  background-color: ${props => props.color};
`;

const ActionsWrapper = styled.ul`
  cursor: pointer;
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  position: absolute;
  top: 0;
  left: 0;
  margin-left: 4px;
  height: 100%;
  list-style: none;
  display: flex;
  align-items: center;
`;

const Loading = ({ show, loaded, ...props }) => (
  <LoadingWrapper show={show} loaded={loaded} {...props}>
    <Spin size={3} />
  </LoadingWrapper>
);

const Actions = ({ onClose }) => (
  <ActionsWrapper>
    <Action color="#FE605C" onClick={onClose}/>
    <Action color="#FDBC3C" />
    <Action color="#2ECB4A" />
  </ActionsWrapper>
); 

const Site = styled(Frame)`
  position: relative;
  border: none;
  width: 100%;
  height: 100%;
`;

@inject(stores => ({
  onClose: stores.store.removeSimulator,
}))
@observer
export default class Simulator extends PureComponent {
  static defaultProps = {
    width: 375,
    height: 667,
  };

  state = {
    loading: true,
    loaded: false,
  }

  onSiteLoad = () => setTimeout(() => this.setState({ loaded: true }), 2000);

  onLoadingRemove = () => setTimeout(() => this.setState({ loading: false }), 3000);

  onClose = () => this.props.onClose(this.props.simulator);

  onHover = () => this.props.simulator.toggleHover(this.props.maxHover);

  render() {
    const { x, y, title, site, width, height, simulator } = this.props;
    const { loaded, loading } = this.state;

    return (
      <Draggable
        handle=".handle"
        defaultPosition={{ x, y }}
      >
        <Wrapper width={width} hover={simulator.hover}>
          <Header className="handle" onMouseEnter={this.onHover}>
            <Actions onClose={this.onClose} />
            <Title>{title} - {width} x {height}</Title>
          </Header>
          <Body height={height}>
            {loading ? (
              <Loading
                show={loading}
                loaded={loaded}
                onTransitionEnd={this.onLoadingRemove}
              />
            ) : null}
            <Site
              src={site}
              onLoad={this.onSiteLoad}
            />
          </Body>
        </Wrapper>
      </Draggable>
    );
  }
}
