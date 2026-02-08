import Link from 'next/link'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-left">
            <h1 className="text-2xl font-bold" style={{ color: '#5B8DD6' }}>
              Epsilon House
            </h1>
          </div>
        </Link>
        
        {/* Navigation optionnelle */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/quartiers" className="text-gray-600 hover:text-[#5B8DD6] transition-colors">
            Quartiers
          </Link>
        </nav>
      </div>
    </header>
  )
}