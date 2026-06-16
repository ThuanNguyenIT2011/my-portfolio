import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Education from './components/Education'
import Experience from './components/Experience'
import Papers from './components/Papers'
import Achievements from './components/Achievements'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import { useTheme } from './hooks/useTheme'
import { useFetch } from './hooks/useFetch'
import type { Profile } from './types'

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const { data: profile, loading, error } = useFetch<Profile>('data/profile.json')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar theme={theme} onToggleTheme={toggleTheme} name={profile?.name} />

      <main>
        {loading && (
          <div className="max-w-6xl mx-auto px-4 py-28">
            <LoadingSpinner />
          </div>
        )}
        {error && (
          <div className="max-w-6xl mx-auto px-4 py-16">
            <ErrorMessage message={error} />
          </div>
        )}
        {profile && (
          <>
            <Hero profile={profile} />
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <hr className="border-gray-200 dark:border-gray-800" />
            </div>
            <Education />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
              <Experience />
            </div>
            <Papers />
            <Achievements />
          </>
        )}
      </main>

      <Footer profile={profile} />
    </div>
  )
}
