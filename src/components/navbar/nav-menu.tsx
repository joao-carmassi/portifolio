import { NavigationMenuProps } from '@radix-ui/react-navigation-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../../../navigation-menu';
import { useAppContext } from '@/context/appContext';
import scrowToContainer from '@/utils/scrowToContainer';

type NavMenuProps = NavigationMenuProps & {
  onItemClick?: () => void;
};

export const NavMenu = ({ onItemClick, ...props }: NavMenuProps) => {
  const { containers } = useAppContext();

  const handleClick = (id: string) => {
    scrowToContainer(id, 'center');
    onItemClick?.();
  };

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className='gap-5 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start'>
        {containers.map((item) => (
          <NavigationMenuItem key={item.nome}>
            <NavigationMenuLink
              className='text-primary hover:bg-accent hover:text-accent-foreground rounded-none cursor-pointer'
              asChild
            >
              <button onClick={() => handleClick(item.id)}>{item.nome}</button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
