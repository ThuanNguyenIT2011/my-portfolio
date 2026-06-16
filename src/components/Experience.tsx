import { useState, useEffect, useCallback } from 'react'
import { X, Briefcase, ChevronRight, Calendar } from 'lucide-react'
import type { Experience as ExperienceType, Project } from '../types'
import SectionTitle from './SectionTitle'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'
import { useFetch } from '../hooks/useFetch'

interface ProjectModalProps {
  company: string
  projects: Project[]
  onClose: () => void
}

function ProjectModal({ company, projects, onClose }: ProjectModalProps) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={`Dự án tại ${company}`}
    >
      <div className="w-full max-w-2xl max-h-[85vh] flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Dự án tại <span className="text-accent-600 dark:text-accent-400">{company}</span>
          </h3>
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Projects list */}
        <div className="overflow-y-auto px-6 py-4 flex flex-col gap-5">
          {projects.map((prj) => (
            <div
              key={prj.id}
              className="rounded-xl border border-gray-100 dark:border-gray-700 p-5 bg-gray-50 dark:bg-gray-800/50"
            >
              <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 font-mono mb-2">
                <Calendar size={12} />
                <span>{prj.period}</span>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{prj.name}</h4>
              <p className="text-xs text-accent-600 dark:text-accent-400 font-medium mb-3">
                Vai trò: {prj.role}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {prj.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {prj.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-full bg-accent-50 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const { data, loading, error } = useFetch<ExperienceType[]>('data/experience.json')
  const [selected, setSelected] = useState<ExperienceType | null>(null)

  const openModal = useCallback((exp: ExperienceType) => setSelected(exp), [])
  const closeModal = useCallback(() => setSelected(null), [])

  return (
    <section id="experience" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 bg-gray-50 dark:bg-gray-900/50 rounded-3xl">
      <SectionTitle title="Kinh nghiệm" subtitle="Công ty và dự án đã tham gia" />
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {data && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((exp) => (
            <button
              key={exp.id}
              onClick={() => openModal(exp)}
              className="text-left group rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 hover:border-accent-400 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-accent-500"
              aria-label={`Xem dự án tại ${exp.company}`}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                  {exp.logo ? (
                    <img
                      src={`${import.meta.env.BASE_URL}${exp.logo.replace(/^\//, '')}`}
                      alt={exp.company}
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  ) : (
                    <Briefcase size={20} className="text-gray-400" />
                  )}
                </div>
                <ChevronRight
                  size={16}
                  className="text-gray-300 dark:text-gray-600 group-hover:text-accent-500 transition-colors flex-shrink-0 mt-1"
                />
              </div>

              <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                {exp.period}
              </span>
              <h3 className="font-semibold text-gray-900 dark:text-white mt-1 mb-1">
                {exp.company}
              </h3>
              <p className="text-sm text-accent-600 dark:text-accent-400 font-medium mb-1">
                {exp.position}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">{exp.field}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {exp.projects.length} dự án
                <span className="ml-1 text-accent-500 group-hover:underline">→ xem chi tiết</span>
              </p>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <ProjectModal
          company={selected.company}
          projects={selected.projects}
          onClose={closeModal}
        />
      )}
    </section>
  )
}
