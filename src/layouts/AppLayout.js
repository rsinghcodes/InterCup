import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
// components
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function AppLayout() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}
