import { Suspense } from 'react'
import { CreatorsContent } from './creators-content'

function CreatorsPageLoading() {
  return (
    <main className="relative bg-background text-foreground py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="text-muted-foreground">Loading creators...</p>
      </div>
    </main>
  )
}

export default function CreatorsPage() {
  return (
    <Suspense fallback={<CreatorsPageLoading />}>
      <CreatorsContent />
    </Suspense>
  )
}
