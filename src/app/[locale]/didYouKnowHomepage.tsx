'use client';

import Divider from '@/components/divider';
import { H2 } from '@/components/ui/h2';
import { P } from '@/components/ui/p';
import { useMessages } from '@/context/messages';
import { IFatos } from '@/types/IFatos';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://uselessfacts.jsph.pl/api/v2/facts/random';

const DidYouKnowHomepage = () => {
  const t = useMessages('homepage');
  const { title } = t('didYouKnow');

  const { data: fatos, isFetched } = useQuery<IFatos>({
    queryKey: ['fato-aleatorio'],
    queryFn: async () =>
      await axios
        .get(API_URL)
        .then((res) => {
          if (res.status !== 200) {
            throw new Error(`${res.status} - ${res.statusText}`);
          }
          return res.data;
        })
        .catch((error) => {
          console.error(`Erro ao baixar dados da api. ${error}`);
        }),
  });

  if (!fatos && isFetched) return null;

  return (
    <section>
      <div className='p-6 md:p-12 text-center space-y-1.5 md:space-y-3 mx-auto max-w-7xl gap-5'>
        <H2>{title}</H2>
        <P className='text-center md:text-lg h-[1.75rem]'>{fatos?.text}</P>
      </div>
      <Divider />
    </section>
  );
};

export default DidYouKnowHomepage;
