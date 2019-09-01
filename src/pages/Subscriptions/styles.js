import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const SubscriptionList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-bottom: 20px;
`;

export const SubscriptionsIsEmpty = styled.Text`
  font-size: 14px;
  color: #fff;
  font-weight: normal;
  align-self: center;
  margin-top: 30px;
`;

export const Spinner = styled.ActivityIndicator.attrs({
  size: 50,
  color: '#fff',
})`
  margin-top: 60px;
`;
