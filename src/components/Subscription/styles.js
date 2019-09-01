import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  display: flex;
  align-self: center;
  background: #fff;
  width: 335px;
  border-radius: 4px;
  margin-top: 20px;
`;

export const MeetupTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  margin: 20px 0 11px 18px;
`;

export const Banner = styled.Image`
  width: 335px;
  height: 150px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const WraperInfo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 18px;
`;

export const MeetupInfo = styled.Text`
  font-size: 13px;
  font-weight: normal;
  color: #999999;
  margin-left: 12px;
  margin-bottom: 9px;
`;

export const SubmitButton = styled(Button)`
  margin-bottom: 20px;
  margin-top: 14px;
  width: 295px;
  align-self: center;
`;
