import React from 'react';
import { getCategories } from '@/lib/data';
import { Search } from '@/components/Search';
import { getTranslations, getLocale } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('digiTools');
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function DigiTools() {
  const locale = await getLocale();
  const t = await getTranslations('digiTools');
  const categories = getCategories(locale, 'digi-tools.jsonc');

  return (
    <div className="container mx-auto py-12 space-y-16">
      <section className="flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="mx-auto max-w-3xl text-3xl font-bold lg:text-7xl tracking-tighter">
          <span className="">{t('h1')}</span>
        </h1>
        <h2 className="text-2xl tracking-tight sm:text-3xl md:text-3xl lg:text-3xl">{t('h2')}</h2>
        <p className="mx-auto max-w-[700px] md:text-xl tracking-tight">
          {t('description')}
        </p>
        <div className='w-full px-2 pt-10 lg:w-1/2'>
          <Search />
        </div>
      </section>
    </div>
  )
}