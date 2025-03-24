import React, { ReactNode } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useFavorites } from '../context/FavoritesContext';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #f4f4f4;
  padding: 2rem;
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
`;

const Layout = ({ children }: { children: ReactNode }) => {
  const { favorites } = useFavorites();

  return (
    <Container>
      <Sidebar>
        <h1 className='mb-6 text-xl'>Favorite Projects</h1>
        <ul>
          {favorites.length > 0 ? (
            favorites.map((proj) => (
              <li key={proj.id} className='mb-2'>
                <Link href={`/projects/${proj.id}`}>{proj.name}</Link>
              </li>
            ))
          ) : (
            <li>No favorite projects.</li>
          )}
        </ul>
      </Sidebar>
      <Content>{children}</Content>
    </Container>
  );
};

export default Layout;
