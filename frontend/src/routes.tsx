import { lazy } from 'react';
import { UserRole } from '@/types/user';
import { RouteConfig } from '@/types/route';

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));
const SellerView = lazy(() => import('@/pages/SellerView'));
const InventoryList = lazy(() => import('@/pages/Inventory/InventoryList'));
const CreateProduct = lazy(() => import('@/pages/Inventory/CreateProduct'));

const publicRoutes: RouteConfig[] = [
  { path: '/login', element: Login, isPublic: true },
  { path: '/', element: Home, isPublic: true },
  { path: '/vendedor', element: SellerView, isPublic: true },
];

const sellerRoutes: RouteConfig[] = [
  { path: '/inventory', element: InventoryList, roles: [UserRole.VENDEDOR] },
  { path: '/inventory/create', element: CreateProduct, roles: [UserRole.VENDEDOR] },
];

const adminRoutes: RouteConfig[] = [
  { path: '/admin', element: AdminDashboard, roles: [UserRole.ADMINISTRADOR] },
];

export const routes: RouteConfig[] = [
  ...publicRoutes,
  ...sellerRoutes,
  ...adminRoutes,
];