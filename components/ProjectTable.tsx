import React from 'react';
import Link from 'next/link';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import { useFavorites } from '../context/FavoritesContext';

interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  manager: string;
}

interface ProjectTableProps {
  projects: Project[];
}

const ProjectTable = ({ projects }: ProjectTableProps) => {
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = (project: Project) =>
    favorites.some((fav) => fav.id === project.id);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Project ID</TableCell>
          <TableCell>Project Name</TableCell>
          <TableCell>Start Date</TableCell>
          <TableCell>End Date</TableCell>
          <TableCell>Project Manager</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell>{project.id}</TableCell>
            <TableCell>{project.name}</TableCell>
            <TableCell>{project.startDate}</TableCell>
            <TableCell>{project.endDate}</TableCell>
            <TableCell>{project.manager}</TableCell>
            <TableCell>
              <IconButton
                onClick={() =>
                  toggleFavorite({ id: project.id, name: project.name })
                }
              >
                {isFavorite(project) ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon color="error" />
                )}
              </IconButton>
              <Link href={`/projects/${project.id}/edit`} passHref>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProjectTable;
