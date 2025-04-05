import React from 'react';
import { Container } from 'react-bootstrap';
import AppToolbar from '../UI/AppToolbar/AppToolbar.tsx';

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
      <AppToolbar/>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
