import styled from 'styled-components';
import {View} from '../../Library/View/View';
import {border, font, fontWeight, space} from '../../Library/Style/layout';
import {appTheme} from '../../Library/Style/appTheme';
import {CheckBox} from '../../Library/View/CheckBox';
import {Translate} from '../../Library/View/Translate';

export type ProjectProp = {
  url: string;
  title: string;
};

export const StreamSetupBody = styled(View)`
  flex: 1;
  padding: ${space.large}px;
  height: 100%;
`;

export const StreamSetupDesc = styled(Translate)`
  display: block;
  margin-bottom: ${space.medium}px;
`;

export const StreamSetupSectionLabel = styled(Translate)`
  display: block;
  border-bottom: solid ${border.medium}px ${() => appTheme().border.normal};
  font-size: ${font.large}px;
  font-weight: ${fontWeight.bold};
  margin-bottom: ${space.medium}px;
`;

export const StreamSetupCheckBox = styled(CheckBox)`
  margin-bottom: ${space.medium}px;
  padding: ${space.tiny}px ${space.small}px;
  border-radius: 4px;
  cursor: pointer;
  :hover {
    background-color: ${() => appTheme().bg.primaryHover};
  }
`;

export const StreamSetupFooter = styled(View)`
  flex-direction: row;
  align-items: center;
  min-height: 60px;
  border-top: solid ${border.medium}px ${() => appTheme().border.normal};
`;

export const StreamSetupEmpty = styled(Translate)`
  color: ${() => appTheme().text.soft};
  font-style: italic;
  margin-bottom: ${space.medium}px;
  display: block;
`;
