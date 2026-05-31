'use client'

// Controlled search input. Fuse.js indexing/searching lives in the parent so
// the index is built once and reused (performance requirement).
export function SearchBar({
  value,
  onChange,
  placeholder = 'Search tools…',
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <div className="relative">
      <label htmlFor="tool-search" className="sr-only">
        Search tools
      </label>
      <input
        id="tool-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-text placeholder:text-muted focus:border-accent focus:outline-none"
      />
    </div>
  )
}
