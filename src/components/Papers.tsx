import { useState, useMemo } from 'react'
import { ExternalLink, BookOpen, FileText, FlaskConical } from 'lucide-react'
import type { Paper, PaperType } from '../types'
import SectionTitle from './SectionTitle'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'
import { useFetch } from '../hooks/useFetch'

const TYPE_STYLES: Record<PaperType, { className: string; Icon: React.ElementType }> = {
  Journal: {
    className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    Icon: BookOpen,
  },
  Conference: {
    className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
    Icon: FileText,
  },
  Preprint: {
    className: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400',
    Icon: FlaskConical,
  },
}

export default function Papers() {
  const { data, loading, error } = useFetch<Paper[]>('data/papers.json')
  const [activeType, setActiveType] = useState<PaperType | 'All'>('All')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = useMemo(() => {
    if (!data) return []
    return Array.from(new Set(data.flatMap((p) => p.tags))).sort()
  }, [data])

  const filtered = useMemo(() => {
    if (!data) return []
    return data.filter((p) => {
      if (activeType !== 'All' && p.type !== activeType) return false
      if (activeTag && !p.tags.includes(activeTag)) return false
      return true
    })
  }, [data, activeType, activeTag])

  const types: (PaperType | 'All')[] = ['All', 'Journal', 'Conference', 'Preprint']

  return (
    <section id="papers" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <SectionTitle title="Bài báo & Nghiên cứu" subtitle="Công trình khoa học đã công bố" />
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {data && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeType === t
                    ? 'bg-accent-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {t === 'All' ? 'Tất cả' : t}
              </button>
            ))}
            {allTags.length > 0 && (
              <div className="w-px bg-gray-200 dark:bg-gray-700 mx-1 self-stretch" />
            )}
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeTag === tag
                    ? 'bg-accent-100 text-accent-700 dark:bg-accent-900/50 dark:text-accent-300'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Paper cards */}
          <div className="flex flex-col gap-4">
            {filtered.length === 0 && (
              <p className="text-gray-400 dark:text-gray-500 text-sm py-8 text-center">
                Không có bài báo phù hợp với bộ lọc.
              </p>
            )}
            {filtered.map((paper) => {
              const { className, Icon } = TYPE_STYLES[paper.type]
              const link = paper.doi ? `https://doi.org/${paper.doi}` : paper.url
              return (
                <div
                  key={paper.id}
                  className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 hover:shadow-md transition-shadow animate-slide-up"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${className}`}>
                      <Icon size={11} />
                      {paper.type}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                      {paper.year}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {paper.venue}
                    </span>
                  </div>

                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 leading-snug">
                    {link ? (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                      >
                        {paper.title}
                      </a>
                    ) : (
                      paper.title
                    )}
                  </h3>

                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
                    {paper.authors.join(', ')}
                  </p>

                  {paper.abstract && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-3">
                      {paper.abstract}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2">
                    {paper.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                    {link && (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto flex items-center gap-1 text-xs text-accent-600 dark:text-accent-400 hover:underline"
                      >
                        <ExternalLink size={12} />
                        {paper.doi ? 'DOI' : 'Link'}
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </section>
  )
}
