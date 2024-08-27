// pages/index.js
import React from 'react'; // 确保导入 React
import { getCategories } from '@/lib/data'
import { getTranslations, getLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import { ToolsList } from '@/components/ToolsList';
import { Search } from '@/components/Search';

export async function generateMetadata() {
  const t = await getTranslations('aiTools');
  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

export default async function AITools() {
  const locale = await getLocale();
  const t = await getTranslations('aiTools');
  const categories = getCategories(locale, 'ai-tools.jsonc');

  return (
    <div className="container mx-auto py-12 space-y-16 ">
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
      
      {categories.map((category, index) => (
        <ToolsList key={index} category={category} locale={locale} />
      ))}
    </div>
  )
}