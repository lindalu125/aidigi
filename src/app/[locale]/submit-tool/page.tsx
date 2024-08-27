import React from 'react';
import { getTranslations, getLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export async function generateMetadata() {
  const t = await getTranslations('submitTool');
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function SubmitTool() {
  const locale = await getLocale();
  const t = await getTranslations('submitTool');

  return (
    <div className="container mx-auto py-12 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{t('description')}</p>
      </div>
      <Card className="max-w-2xl mx-auto">
        <CardContent className="space-y-4 pt-6">
          <div>
            <label htmlFor="toolName" className="block text-sm font-medium mb-1">{t('toolName')}</label>
            <Input id="toolName" placeholder={t('toolNamePlaceholder')} />
          </div>
          <div>
            <label htmlFor="toolUrl" className="block text-sm font-medium mb-1">{t('toolUrl')}</label>
            <Input id="toolUrl" placeholder={t('toolUrlPlaceholder')} />
          </div>
          <div>
            <label htmlFor="toolDescription" className="block text-sm font-medium mb-1">{t('toolDescription')}</label>
            <Textarea id="toolDescription" placeholder={t('toolDescriptionPlaceholder')} />
          </div>
          <div>
            <label htmlFor="toolCategory" className="block text-sm font-medium mb-1">{t('toolCategory')}</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t('selectCategory')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ai">AI Tools</SelectItem>
                <SelectItem value="digital-marketing">Digital Marketing Tools</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full">{t('submit')}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
