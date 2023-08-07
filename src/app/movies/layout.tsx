export default function MovieLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
          <nav> 
            <a href="/"><div className="home"/></a>
            <a href="/series"> Series</a>
          </nav>
          {children}
        </>
    )
  }