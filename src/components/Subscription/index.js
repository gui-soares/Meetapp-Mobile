import React, { useMemo } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import {
  Container,
  MeetupInfo,
  MeetupTitle,
  Banner,
  SubmitButton,
  WraperInfo,
} from './styles';

export default function Subscription({ data, onCancel }) {
  const dateFormatted = useMemo(() => {
    return format(parseISO(data.meetup.date), "dd 'de' MMMM', às' H:mm'h", {
      locale: ptBR,
    });
  }, [data.meetup.date]);

  return (
    <Container>
      <Banner source={{ uri: data.meetup.banner.url }} />
      <MeetupTitle>{data.meetup.title}</MeetupTitle>
      <WraperInfo>
        <Icon
          name="event"
          color="#999999"
          size={14}
          style={{ marginBottom: 9 }}
        />
        <MeetupInfo>{dateFormatted}</MeetupInfo>
      </WraperInfo>
      <WraperInfo>
        <Icon
          name="place"
          color="#999999"
          size={14}
          style={{ marginBottom: 9 }}
        />
        <MeetupInfo>{data.meetup.location}</MeetupInfo>
      </WraperInfo>
      <WraperInfo>
        <Icon
          name="person"
          color="#999999"
          size={14}
          style={{ marginBottom: 9 }}
        />
        <MeetupInfo>Organizador: {data.meetup.creator.name}</MeetupInfo>
      </WraperInfo>
      <SubmitButton onPress={onCancel}>Cancelar inscrição</SubmitButton>
    </Container>
  );
}

Subscription.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    meetup: PropTypes.shape({
      past: PropTypes.bool,
      title: PropTypes.string,
      date: PropTypes.string,
      location: PropTypes.string,
      creator: PropTypes.shape({
        name: PropTypes.string,
      }),
      banner: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
};
