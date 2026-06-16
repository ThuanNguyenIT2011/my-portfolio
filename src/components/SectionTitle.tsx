interface SectionTitleProps {
  title: string
  subtitle?: string
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-500 dark:text-gray-400 text-sm">{subtitle}</p>
      )}
      <div className="mt-3 w-12 h-1 rounded-full bg-accent-500" />
    </div>
  )
}
