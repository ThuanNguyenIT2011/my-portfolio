import { Github, Linkedin, Twitter, Globe, Mail, MapPin } from 'lucide-react'
import type { Profile } from '../types'
import { useReveal } from '../hooks/useReveal'

const ICON_MAP = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  website: Globe,
  email: Mail,
}

interface HeroProps {
  profile: Profile
}

export default function Hero({ profile }: HeroProps) {
  const textRef = useReveal<HTMLDivElement>()

  return (
    <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
        {/* Avatar with float animation */}
        <div className="flex-shrink-0 avatar-float">
          <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden ring-4 ring-accent-100 dark:ring-accent-900 shadow-xl">
            <img
              src={`${import.meta.env.BASE_URL}${profile.avatar.replace(/^\//, '')}`}
              alt={`Ảnh đại diện của ${profile.name}`}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                const t = e.currentTarget
                t.style.display = 'none'
                const parent = t.parentElement
                if (parent) {
                  parent.classList.add('bg-gradient-to-br', 'from-accent-400', 'to-accent-600', 'flex', 'items-center', 'justify-center')
                  parent.innerHTML = `<span class="text-white text-5xl font-bold select-none">${profile.name.charAt(0)}</span>`
                }
              }}
            />
          </div>
        </div>

        {/* Info with scroll reveal */}
        <div ref={textRef} className="reveal flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2 text-sm text-gray-500 dark:text-gray-400">
            <MapPin size={14} />
            <span>{profile.location}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {profile.name}
          </h1>

          <p className="text-accent-600 dark:text-accent-400 font-medium mb-4 text-lg">
            {profile.title}
          </p>

          <p className="text-gray-500 dark:text-gray-400 italic mb-6">
            "{profile.tagline}"
          </p>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mb-8">
            {profile.bio}
          </p>

          {/* Social links + Contact */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            {profile.socials.map((s) => {
              const Icon = ICON_MAP[s.icon] ?? Globe
              return (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:border-accent-400 hover:text-accent-600 dark:hover:text-accent-400 transition-all hover:-translate-y-0.5"
                >
                  <Icon size={16} />
                  <span>{s.label}</span>
                </a>
              )
            })}
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-700 text-white text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-500/30"
            >
              <Mail size={16} />
              <span>Liên hệ</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
