import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import Background from '~/components/Background';
import Subscription from '~/components/Subscription';
import Header from '~/components/Header';

import api from '~/services/api';

import {
  Container,
  SubscriptionList,
  Spinner,
  SubscriptionsIsEmpty,
} from './styles';

function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadSubscriptions() {
    const response = await api.get('subscriptions');

    setSubscriptions(response.data);
    setLoading(false);
  }

  async function handleSubscriptionCancel(id) {
    try {
      await api.delete(`subscriptions/${id}`);

      loadSubscriptions();

      Alert.alert(
        'Inscrição cancelada',
        'Sua inscrição foi cancelada com sucesso'
      );
    } catch (error) {
      Alert.alert(
        'Erro no cancelamento',
        'Houve um erro ao cancelar sua incrição'
      );
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadSubscriptions();
    }
  }, [isFocused]);

  function renderSubscriptions() {
    if (subscriptions.length === 0) {
      return (
        <SubscriptionsIsEmpty>Você não possui inscrições</SubscriptionsIsEmpty>
      );
    }
    return (
      <SubscriptionList
        data={subscriptions}
        keyExtractor={subscription => String(subscription.id)}
        renderItem={({ item }) => (
          <Subscription
            data={item}
            onCancel={() => handleSubscriptionCancel(item.id)}
          />
        )}
      />
    );
  }

  return (
    <Background>
      <Header />
      <Container>{loading ? <Spinner /> : renderSubscriptions()}</Container>
    </Background>
  );
}

const SubscriptionTabBarIcon = ({ tintColor }) => (
  <Icon name="local-offer" size={30} color={tintColor} />
);

SubscriptionTabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: SubscriptionTabBarIcon,
};

export default withNavigationFocus(Subscriptions);
