import { ComponentType } from 'react';
import { UserRole } from './user';

export interface RouteConfig {
  path: string;
  element: ComponentType;
  roles?: UserRole[];
  isPublic?: boolean;
}