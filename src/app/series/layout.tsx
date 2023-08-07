export default function SeriesLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
        
          <nav> 
            <a href="/"><div className="home"/></a>
            <a href="/movies"> Movies</a>
          </nav>
          {children}
          </>
    )
  }