import React from 'react';
import { Sheet, List, ListItem, ListItemButton, ListItemContent } from '@mui/joy';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { title: 'Dashboard', path: '/' },
  { title: 'Cotizaciones', path: '/cotizaciones' },
  { title: 'Ordenes', path: '/ordenes' },
  { title: 'Inventario', path: '/inventario' },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sheet
      sx={{
        width: 240,
        flexShrink: 0,
        borderRight: '1px solid',
        borderColor: 'divider',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.title}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemContent>{item.title}</ListItemContent>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Sheet>
  );
};

export default Sidebar;