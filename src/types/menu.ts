import { LucideIcon } from 'lucide-react'; 

export interface MenuItem {
  key: string;
  path: string;
  label: string;
  icon: LucideIcon | React.ComponentType<{ size?: number; className?: string }>;
}

export interface NavButtonProps {
  item: MenuItem;
  active: boolean;
  onClick: () => void;
  label: string;
}