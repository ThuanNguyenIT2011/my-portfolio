export default function LoadingSpinner() {
  return (
    <div className="flex justify-center py-16" aria-label="Đang tải...">
      <div className="w-8 h-8 border-4 border-accent-200 dark:border-accent-800 border-t-accent-500 rounded-full animate-spin" />
    </div>
  )
}
