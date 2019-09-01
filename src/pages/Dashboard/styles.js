import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const DateSelector = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  margin-left: 31px;
  margin-right: 31px;
`;

export const MeetupsIsEmpty = styled.Text`
  font-size: 14px;
  color: #fff;
  font-weight: normal;
  align-self: center;
  margin-top: 30px;
`;

export const MeetupList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-bottom: 20px;
`;

export const Spinner = styled.ActivityIndicator.attrs({
  size: 50,
  color: '#fff',
})`
  margin-top: 60px;
`;
