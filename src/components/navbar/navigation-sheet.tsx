'use client';

import { Menu } from 'lucide-react';
import { NavMenu } from './nav-menu';
import { Sheet, SheetContent, SheetTrigger } from '../../../sheet';
import { Button } from '../ui/button';
import { DialogTitle } from '../ui/dialog';
import { useState } from 'react';

export const NavigationSheet = () => {
  const [aberto, setAberto] = useState(false);

  return (
    <Sheet onOpenChange={setAberto} open={aberto}>
      <SheetTrigger asChild>
        <Button onClick={() => setAberto(true)} variant='outline' size='icon'>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className='p-3 w-3/5'>
        <DialogTitle hidden>Menu Celular</DialogTitle>
        <img className='rounded-full w-12' src='./icons/icon-preto.webp' />
        <NavMenu
          orientation='vertical'
          className='mt-3 flex items-start gap-5'
          onItemClick={() => setAberto(false)}
        />
      </SheetContent>
    </Sheet>
  );
};
