import { Github, Linkedin, Twitter, Globe, Mail } from 'lucide-react'
import type { Profile } from '../types'

const ICON_MAP = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  website: Globe,
  email: Mail,
}

interface FooterProps {
  profile: Profile | null
}

export default function Footer({ profile }: FooterProps) {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400 dark:text-gray-500">
          © {year} {profile?.name ?? 'Portfolio'}. Built with Vite + React + TypeScript.
        </p>
        {profile && (
          <div className="flex items-center gap-3">
            {profile.socials.map((s) => {
              const Icon = ICON_MAP[s.icon] ?? Globe
              return (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-gray-400 dark:text-gray-500 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
        )}
      </div>
    </footer>
  )
}
