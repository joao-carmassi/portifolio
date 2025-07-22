'use client';

import Divider from '@/components/divider';
import { H2 } from '@/components/ui/h2';
import { P } from '@/components/ui/p';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IFatos } from '@/types/IFatos';

const API_KEY = 'https://uselessfacts.jsph.pl/api/v2/facts/random';

const DidYouKnow = () => {
  const [fatos, setFatos] = useState<undefined | IFatos>(undefined);

  useEffect(() => {
    axios
      .get(API_KEY)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`${res.status} - ${res.statusText}`);
        }
        return res.data;
      })
      .then((data) => {
        data.text = `"${data.text}"`;
        setFatos(data);
      })
      .catch((error) => {
        console.error(`Erro ao baixar dados da api. ${error}`);
      });
  }, []);

  return (
    <section>
      <div className='p-6 md:p-12 flex flex-col items-center justify-center mx-auto max-w-7xl gap-5'>
        <H2>Did you know that:</H2>
        <P className='text-center md:text-lg'>{fatos?.text}</P>
      </div>
      <Divider />
    </section>
  );
};

export default DidYouKnow;
