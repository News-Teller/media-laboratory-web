import React from 'react';
import { Container } from '@material-ui/core';
import { HeroContainer } from '../Components'

export default function NotFound() {
  return (
    <Container>
      <HeroContainer
        title="404"
        subtitle="Oops. We can&apos;t seems to find the page you&apos;re looking for."
        backgroundColor="#2618B1"
        backgroundElementsFill="%230b5fa4"
      />
    </Container>
  );
}
