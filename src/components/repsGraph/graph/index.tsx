'use client';

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
  Cell,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import axios from 'axios';

type GitHubColors = {
  [key: string]: {
    color: string;
  };
};

type Ireps = {
  language: string;
};

const URL_API = 'https://api.github.com/users/joao-carmassi/repos';

function baixaRepsGithub(): Promise<{ [key: string]: number }> {
  return axios.get(URL_API).then((res) => {
    const reps: Ireps[] = res.data;
    const linguagens = reps.map((rep) => rep.language).filter(Boolean);
    const contagem = linguagens.reduce((acc, lang) => {
      if (lang in acc) {
        acc[lang]++;
      } else {
        acc[lang] = 1;
      }
      return acc;
    }, {} as { [key: string]: number });
    return contagem;
  });
}

export function ChartLanguages() {
  const [colors, setColors] = useState<GitHubColors>({});
  const [languages, setLanguages] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    baixaRepsGithub().then(setLanguages);
    fetch(
      'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json'
    )
      .then((res) => res.json())
      .then((data) => setColors(data));
  }, []);

  const data = Object.entries(languages).map(([language, count]) => ({
    language,
    count,
  }));

  const chartConfig = Object.fromEntries(
    data.map(({ language }) => [
      language,
      {
        label: language,
        color: colors[language]?.color || '#ccc',
      },
    ])
  );

  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        data={data}
        margin={{ top: 20 }}
        barSize={30}
        width={600}
        height={400}
      >
        <CartesianGrid vertical={false} horizontal={true} stroke='#c2c2c2' />
        <XAxis
          dataKey='language'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis
          type='number'
          allowDecimals={false}
          tickLine={false}
          axisLine={false}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey='count' barSize={100}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[entry.language]?.color || '#ccc'}
            />
          ))}
          <LabelList
            dataKey='count'
            position='top'
            className='fill-foreground'
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
