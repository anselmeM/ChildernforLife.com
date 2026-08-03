import { useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import PageSEO from '../../components/PageSEO';
import useContentItems from '../../hooks/useContentItems';
import { getNewsBySlug } from '../../data/news';
import { getStoryBySlug } from '../../data/impactStories';

export default function ArticleDetail({ kind, backPath, backLabel, pathPrefix }) {
  const navigate = useNavigate();
  const { slug } = useParams();

  const { items } = useContentItems(kind);
  const localArticle = kind === 'news' ? getNewsBySlug(slug) : getStoryBySlug(slug);
  // CMS items (when configured) take precedence; local data covers slugs that
  // only exist in the repo.
  const article = items.find((item) => item.slug === slug) || localArticle;

  if (!article) {
    return (
      <div className="min-h-[70vh] bg-white flex items-center justify-center px-4">
        <PageSEO title="Article Not Found" description="This article could not be found." path={`${backPath}/${slug || ''}`} />
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-black text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-500 font-semibold text-sm mb-8">This article may have been moved or removed.</p>
          <button onClick={() => navigate(backPath)} className="bg-[#005c7a] text-white px-8 py-3 rounded-full font-bold hover:bg-[#004a63] text-xs uppercase tracking-widest">
            Back to {backLabel}
          </button>
        </div>
      </div>
    );
  }

  const related = items
    .filter((item) => item.slug !== article.slug && item.tag === article.tag)
    .slice(0, 3);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://childrenforlife.com/' },
      { '@type': 'ListItem', position: 2, name: backLabel, item: `https://childrenforlife.com${backPath}` },
      { '@type': 'ListItem', position: 3, name: article.title, item: `https://childrenforlife.com/${pathPrefix}/${article.slug}` },
    ],
  };

  return (
    <div className="bg-white min-h-screen">
      <PageSEO
        title={article.title}
        description={article.excerpt}
        path={`/${pathPrefix}/${article.slug}`}
        image={article.img}
        schema={breadcrumbSchema}
      />
      <div className="relative h-[300px] sm:h-[360px] lg:h-[420px] bg-cover bg-center bg-local md:bg-fixed flex items-end" style={{ backgroundImage: `url(${article.img})` }}>
        <div className="absolute inset-0 bg-[#005c7a]/70 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white pb-10">
          <button onClick={() => navigate(backPath)} className="inline-flex items-center text-white/80 hover:text-white font-black text-xs uppercase tracking-widest mb-4 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> {backLabel}
          </button>
          <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest mb-3">
            <span className="bg-[#ffc72c] text-black px-2.5 py-1 rounded">{article.tag}</span>
            {article.date && <span className="text-white/85">{article.date}</span>}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight drop-shadow-md leading-tight">{article.title}</h1>
          {article.excerpt && <p className="mt-4 text-base text-gray-100 font-bold max-w-2xl leading-relaxed">{article.excerpt}</p>}
        </div>
      </div>

      <article className="py-12 sm:py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {article.body.map((paragraph, i) => (
          <p key={i} className="text-gray-600 leading-relaxed text-base mb-6">{paragraph}</p>
        ))}

        {related.length > 0 && (
          <section className="mt-14 border-t border-gray-100 pt-10">
            <h2 className="text-xs font-black text-[#005c7a] uppercase tracking-widest mb-6">Related {backLabel}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link key={item.slug} to={`/${pathPrefix}/${item.slug}`} className="group block">
                  <picture>
                    <source srcSet={item.imgCard} type="image/webp" />
                    <img loading="lazy" src={item.img} alt={item.title} className="w-full h-32 object-cover rounded-xl mb-3 group-hover:opacity-90 transition-opacity" />
                  </picture>
                  <h3 className="text-sm font-black text-gray-900 group-hover:text-[#005c7a] transition-colors leading-snug">{item.title}</h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
