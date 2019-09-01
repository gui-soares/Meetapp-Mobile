/* eslint-disable no-shadow */
import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format, subDays, addDays } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { TouchableOpacity, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';
import Header from '~/components/Header';

import {
  Container,
  DateSelector,
  Title,
  MeetupList,
  Spinner,
  MeetupsIsEmpty,
} from './styles';
import api from '~/services/api';

function Dashboard({ isFocused }) {
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [refreshing, setRefresing] = useState(false);

  const dateFormatted = useMemo(() =>
    format(date, "d 'de' MMMM", { locale: ptBR })
  );

  async function loadMeetups(page = 1) {
    const response = await api.get('meetups', {
      params: { date, page },
    });

    setMeetups(page >= 2 ? [...meetups, ...response.data] : response.data);
    setPage(page);
    setLoading(false);
    setRefresing(false);
  }

  function loadMore() {
    const nextPage = page + 1;
    loadMeetups(nextPage);
  }

  function refreshList() {
    setRefresing(true);
    setMeetups([]);
    loadMeetups();
  }

  useEffect(() => {
    if (isFocused) {
      loadMeetups();
    }
  }, [isFocused, date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
    setPage(1);
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
    setPage(1);
  }

  async function handleSubscription(id) {
    try {
      await api.post(`/meetups/${id}/subscription`);

      Alert.alert(
        'Inscrição realizada',
        'Sua inscrição foi realizada com sucesso!'
      );
    } catch (error) {
      Alert.alert('Inscrição negada', error.response.data.error);
    }
  }

  function renderMeetups() {
    if (meetups.length === 0) {
      return <MeetupsIsEmpty>Não existem meetups nessa data</MeetupsIsEmpty>;
    }
    return (
      <MeetupList
        data={meetups}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
        onRefresh={refreshList}
        refreshing={refreshing}
        keyExtractor={meetup => String(meetup.id)}
        renderItem={({ item }) => (
          <Meetup data={item} onSubmit={() => handleSubscription(item.id)} />
        )}
      />
    );
  }

  return (
    <Background>
      <Header />
      <Container>
        <DateSelector>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>
          <Title>{dateFormatted}</Title>
          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </TouchableOpacity>
        </DateSelector>
        {loading ? <Spinner /> : renderMeetups()}
      </Container>
    </Background>
  );
}

const DashboardTabBarIcon = ({ tintColor }) => (
  <Icon name="format-list-bulleted" size={30} color={tintColor} />
);

DashboardTabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: DashboardTabBarIcon,
};

export default withNavigationFocus(Dashboard);
