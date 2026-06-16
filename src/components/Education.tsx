import type { Education as EducationType, DegreeType } from '../types'
import SectionTitle from './SectionTitle'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'
import { useFetch } from '../hooks/useFetch'
import { GraduationCap } from 'lucide-react'

const DEGREE_STYLES: Record<DegreeType, string> = {
  Bachelor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  Master: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  PhD: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
}

const DEGREE_LABEL: Record<DegreeType, string> = {
  Bachelor: 'Đại học',
  Master: 'Thạc sĩ',
  PhD: 'Tiến sĩ',
}

export default function Education() {
  const { data, loading, error } = useFetch<EducationType[]>('data/education.json')

  return (
    <section id="education" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <SectionTitle title="Học vấn" subtitle="Quá trình học tập và bằng cấp" />
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {data && (
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 hidden sm:block" />
          <div className="flex flex-col gap-8">
            {data.map((edu) => (
              <div key={edu.id} className="flex gap-6 animate-slide-up">
                {/* Dot */}
                <div className="hidden sm:flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-accent-50 dark:bg-accent-900/30 border-2 border-accent-200 dark:border-accent-700 flex items-center justify-center flex-shrink-0 z-10">
                    <GraduationCap size={20} className="text-accent-600 dark:text-accent-400" />
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-gray-400 dark:text-gray-500 font-mono">
                      {edu.period}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${DEGREE_STYLES[edu.degree]}`}
                    >
                      {DEGREE_LABEL[edu.degree]}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                    {edu.school}
                  </h3>
                  <p className="text-sm text-accent-600 dark:text-accent-400 font-medium mb-2">
                    {edu.major}
                  </p>
                  {edu.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">{edu.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
