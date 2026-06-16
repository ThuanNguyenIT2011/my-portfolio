export interface Social {
  label: string
  url: string
  icon: 'github' | 'linkedin' | 'twitter' | 'email' | 'website'
}

export interface Profile {
  name: string
  title: string
  avatar: string
  tagline: string
  bio: string
  location: string
  email: string
  socials: Social[]
}

export type DegreeType = 'Bachelor' | 'Master' | 'PhD'

export interface Education {
  id: string
  period: string
  school: string
  major: string
  degree: DegreeType
  description: string
}

export interface Project {
  id: string
  period: string
  name: string
  technologies: string[]
  description: string
  role: string
}

export interface Experience {
  id: string
  period: string
  company: string
  position: string
  field: string
  logo: string
  projects: Project[]
}

export type PaperType = 'Journal' | 'Conference' | 'Preprint'

export interface Paper {
  id: string
  title: string
  authors: string[]
  venue: string
  type: PaperType
  year: number
  doi: string
  url: string
  abstract: string
  tags: string[]
}

export interface Achievement {
  id: string
  title: string
  issuer: string
  date: string
  description: string
}
