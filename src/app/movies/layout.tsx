export default function MovieLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
          <nav> 
            <a href="/movies">Movies</a>
            <a href="/series"> Series</a>
          </nav>
          {children}
        </>
    )
  }