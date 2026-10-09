export interface SidebarItem {
  label: string;
  image: string;
  route: string;
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: 'Dashboard',
    image: 'ex.svg',
    route: '/dashboard',
  },
  {
    label: 'Projects',
    image: 'tasks.svg',
    route: '/project',
  },
  {
    label: 'Calendar',
    image: 'list.svg',
    route: '/calendar',
  },
  {
    label: 'Settings',
    image: 'ex.svg',
    route: '/settings',
  },
];
