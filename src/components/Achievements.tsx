import { Trophy } from 'lucide-react'
import type { Achievement } from '../types'
import SectionTitle from './SectionTitle'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'
import { useFetch } from '../hooks/useFetch'

export default function Achievements() {
  const { data, loading, error } = useFetch<Achievement[]>('data/achievements.json')

  return (
    <section id="achievements" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <SectionTitle title="Thành tích" subtitle="Chứng chỉ, giải thưởng và các thành tựu" />
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {data && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((ach) => (
            <div
              key={ach.id}
              className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 hover:shadow-md hover:border-accent-200 dark:hover:border-accent-800 transition-all animate-slide-up"
            >
              <div className="w-10 h-10 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center mb-4">
                <Trophy size={18} className="text-yellow-500 dark:text-yellow-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1 leading-snug">
                {ach.title}
              </h3>
              <p className="text-xs font-medium text-accent-600 dark:text-accent-400 mb-1">
                {ach.issuer}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 font-mono mb-3">{ach.date}</p>
              {ach.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {ach.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
