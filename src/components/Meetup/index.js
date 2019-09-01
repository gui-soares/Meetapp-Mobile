import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  MeetupInfo,
  MeetupTitle,
  Banner,
  SubmitButton,
  WraperInfo,
  PastInfo,
} from './styles';

export default function Meetup({ data, onSubmit }) {
  const dateFormatted = useMemo(() => {
    return format(parseISO(data.date), "dd 'de' MMMM', às' H:mm'h", {
      locale: ptBR,
    });
  }, [data.date]);

  return (
    <Container>
      <Banner source={{ uri: data.banner.url }} />
      <MeetupTitle>{data.title}</MeetupTitle>
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
        <MeetupInfo>{data.location}</MeetupInfo>
      </WraperInfo>
      <WraperInfo>
        <Icon
          name="person"
          color="#999999"
          size={14}
          style={{ marginBottom: 9 }}
        />
        <MeetupInfo>Organizador: {data.creator.name}</MeetupInfo>
      </WraperInfo>
      {data.past ? (
        <PastInfo>Este meetup já aconteceu</PastInfo>
      ) : (
        <SubmitButton onPress={onSubmit}>Realizar inscrição</SubmitButton>
      )}
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
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
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
