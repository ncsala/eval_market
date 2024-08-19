import React from 'react';
import { Sheet, List, ListItem, ListItemButton, ListItemContent } from '@mui/joy';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';
import { UserRole } from '@/types/user';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  const menuItems = [
    { title: 'Home', path: '/', roles: null },
    { title: 'Dashboard', path: '/admin', roles: [UserRole.ADMINISTRADOR] },
    { title: 'Cotizaciones', path: '#', roles: null },
    { title: 'Órdenes', path: '#', roles: null },
    { title: 'Inventario', path: '/inventory', roles: null },
    { title: 'Crear Producto', path: '/inventory/create', roles: [UserRole.VENDEDOR] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles === null || (user && item.roles.includes(user.role as UserRole))
  );

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
        {filteredMenuItems.map((item) => (
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