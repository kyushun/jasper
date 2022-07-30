import React, {CSSProperties} from 'react';
import styled from 'styled-components';
import {ClickView} from './ClickView';
import {Text} from './Text';
import {appTheme} from '../Style/appTheme';
import {ShellUtil} from '../Util/ShellUtil';

type Props = {
  url?: string | (() => string);
  onClick?: (defaultOnClick: () => void) => void;
  style?: CSSProperties;
  className?: string;
}

type State = {
}

export class Link extends React.Component<Props, State> {
  private handleClick() {
    const defaultOnClick = () => {
      if (typeof this.props.url === 'function') {
        ShellUtil.openExternal(this.props.url());
      } else {
        ShellUtil.openExternal(this.props.url);
      }
    }

    if (this.props.onClick) {
      this.props.onClick(defaultOnClick);
    } else if (this.props.url) {
      defaultOnClick();
    }
  }

  render() {
    return (
      <ClickView onClick={() => this.handleClick()} style={{display: 'inline'}}>
        <LinkText className={this.props.className} style={this.props.style}>{this.props.children}</LinkText>
      </ClickView>
    );
  }
}
const LinkText = styled(Text)`
  font-size: inherit;
  color: ${() => appTheme().text.link};
  text-decoration: underline;
`;
