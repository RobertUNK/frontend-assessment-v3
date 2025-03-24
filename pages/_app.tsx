import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/global.css';
import Layout from '../components/Layout';
import { FavoritesProvider } from '../context/FavoritesContext';

const theme = createTheme({
  palette: { primary: { main: '#1976d2' } },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FavoritesProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default MyApp;
