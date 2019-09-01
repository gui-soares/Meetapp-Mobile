import React from 'react';
import { Image, StatusBar } from 'react-native';

import logoHeader from '~/assets/logoHeader.png';
import { Container } from './styles';

export default function Header() {
  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="rgb(0, 0, 0)" />
      <Image source={logoHeader} />
    </Container>
  );
}
