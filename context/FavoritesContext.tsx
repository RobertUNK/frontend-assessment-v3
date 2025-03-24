import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface FavoriteProject {
  id: string;
  name: string;
}

interface FavoritesContextType {
  favorites: FavoriteProject[];
  toggleFavorite: (project: FavoriteProject) => void;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
});

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteProject[]>([]);

  useEffect(() => {
    fetch('/api/favorites')
      .then(res => res.json())
      .then(setFavorites);
  }, []);
  
  const toggleFavorite = async (proj) => {
    const isFav = favorites.some(f => f.id === proj.id);
    if (isFav) {
      await fetch(`/api/favorites/${proj.id}`, { method: 'DELETE' });
      setFavorites(favorites.filter(f => f.id !== proj.id));
    } else {
      await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proj),
      });
      setFavorites([...favorites, proj]);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
