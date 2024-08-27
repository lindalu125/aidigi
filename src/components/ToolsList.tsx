// components/ResourceList.tsx
import React from 'react'; // 确保导入 React
import { Link } from "@/lib/i18n";
import { ExternalLink, ArrowRightIcon } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge";

import { getDataList } from '@/lib/data';
import { useTranslations } from 'next-intl';

// type toolProps = {
//   name: string;
//   description: string;
//   url: string;
//   tags: string[]
// }

type categoryProps = {
  name: string,
  src: string,
  description: string,
  link: string
}

type categoryListProps = {
  categories: categoryProps[]
}


type toolsListProps = {
  category: categoryProps,
  locale: string,
  showMoreLink?: boolean
}

type toolProps = {
  name: string,
  description: string,
  url: string,
  icon_url?: string,
  tags?: string[],
  featured?: boolean
}





const ToolsList: React.FC<toolsListProps> = ({ category, locale, showMoreLink = true }) => {
  const t = useTranslations('ToolsList');
  const srcList = getDataList(category.src, locale);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {srcList.map((resource: toolProps, index) => (
          <Card key={index} className='max-w-sm overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105'>
            <CardHeader>
              {resource.featured && (
                <Badge variant="secondary" className="absolute top-2 right-2">
                  Featured
                </Badge>
              )}
              <a 
                href={`${resource.url}?utm_source=devtoolset.net`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
              >
                <div className='border border-gray-200 p-1 rounded-md mr-1 bg-white'>
                  { resource.icon_url ?
                    <img width="20" height="20" src={resource.icon_url}  alt={`${resource.name} favicon`} />
                    :
                    <img width="20" height="20" src={`https://favicon.im/${resource.url}?larger=true`} alt={`${resource.name} favicon`} />
                  }
                </div>
                <CardTitle className='capitalize tracking-tighter'>{resource.name}</CardTitle>
                <ExternalLink size={16} className='ml-1' />
              </a>
              <CardDescription className='flex flex-col justify-between '>
                <div className='h-[60px] line-clamp-3 mt-1 tracking-tight text-start'>
                  {resource.description}
                </div>
                { resource.tags ? 
                  <div className='mt-3'>
                    {resource.tags.slice(0,3).map((tag, i) => (
                      <Badge key={i} variant="secondary" className='text-xs pb-1 mr-1 mt-2 tracking-tighter'>{tag}</Badge>
                    ))}
                  </div> :
                 null
                }     
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      {showMoreLink && (
        <div className="mt-4">
          <Link href={`/tools/${category.link}`} className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center">
            {t('more')} <ArrowRightIcon size={16} className='ml-1' />
          </Link>
        </div>
      )}
    </div>
  );
};

const ToolsPage = ({ category, locale }: { category: categoryProps, locale: string }) => {
  const srcList = getDataList(category.src, locale);

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {/* @ts-ignore */}
        {srcList.map((resource: toolProps, index) => (
          <Card key={index} className='max-w-sm overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105'>
            <CardHeader>
              <a 
                href={`${resource.url}?utm_source=devtoolset.net`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
              >
                {resource.featured && (
                  <Badge variant="secondary" className="absolute top-2 right-2">
                    Featured
                  </Badge>
                )}
                <div className='border border-gray-200 p-1 rounded-md mr-1 bg-white'>
                  {/* <img width="20" height="20" src={`https://favicon.im/${resource.url}?larger=true`} alt={`${resource.name} favicon`} /> */}
                  { resource.icon_url ?
                    <img width="20" height="20" src={resource.icon_url}  alt={`${resource.name} favicon`} />
                    :
                    <img width="20" height="20" src={`https://favicon.im/${resource.url}?larger=true`} alt={`${resource.name} favicon`} />
                  }
                </div>
                <CardTitle className='capitalize tracking-tighter'>{resource.name}</CardTitle>
                <ExternalLink size={16} className='ml-1' />
              </a>
              <CardDescription className='flex flex-col justify-between '>
                <div className='h-[60px] line-clamp-3 mt-1 tracking-tight text-start'>
                  {resource.description}
                </div>
                { resource.tags ? 
                  <div className='mt-3'>
                  {resource.tags.slice(0,3).map((tag, i) => (
                    <Badge key={i} variant="secondary" className='text-xs pb-1 mr-1 mt-2 tracking-tighter'>{tag}</Badge>
                  ))}
                </div> :
                 null
                }     
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}

type searchPageProps = {
  searchData: toolProps[]
}

const SearchPage = ({ searchData }: searchPageProps) => {

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {/* @ts-ignore */}
        {searchData.map((resource: toolProps, index) => (
          <Card key={index} className='max-w-sm overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105'>
            <CardHeader>
              <a 
                href={`${resource.url}?utm_source=devtoolset.net`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
              >
                {resource.featured && (
                  <Badge variant="secondary" className="absolute top-2 right-2">
                    Featured
                  </Badge>
                )}
                <div className='border border-gray-200 p-1 rounded-md mr-1 bg-white'>
                  {/* <img width="20" height="20" src={`https://favicon.im/${resource.url}?larger=true`} alt={`${resource.name} favicon`} /> */}
                  { resource.icon_url ?
                    <img width="20" height="20" src={resource.icon_url}  alt={`${resource.name} favicon`} />
                    :
                    <img width="20" height="20" src={`https://favicon.im/${resource.url}?larger=true`} alt={`${resource.name} favicon`} />
                  }
                </div>
                <CardTitle className='capitalize tracking-tighter'>{resource.name}</CardTitle>
                <ExternalLink size={16} className='ml-1' />
              </a>
              <CardDescription className='flex flex-col justify-between '>
                <div className='h-[60px] line-clamp-3 mt-1 tracking-tight text-start'>
                  {resource.description}
                </div>
                { resource.tags ? 
                  <div className='mt-3'>
                  {resource.tags.slice(0,3).map((tag, i) => (
                    <Badge key={i} variant="secondary" className='text-xs pb-1 mr-1 mt-2 tracking-tighter'>{tag}</Badge>
                  ))}
                </div> :
                 null
                }     
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}


const CategoryList = ({ categories }: categoryListProps) => {

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* @ts-ignore */}
        {categories.map((category: categoryProps, index) => (
          <Card key={index} className='max-w-sm overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105'>
            <CardHeader>
              <a 
                href={`/category/${category.link}`}
                className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
              >
                <CardTitle className='capitalize'>{category.name}</CardTitle>
                <ArrowRightIcon size={16} className='ml-2'/>
              </a>
              <CardDescription className='flex flex-col justify-between'>
                <div className='h-[40px] line-clamp-2 mt-4 tracking-tight text-start'>
                {category.description}
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}

export { ToolsList, ToolsPage, CategoryList, SearchPage };