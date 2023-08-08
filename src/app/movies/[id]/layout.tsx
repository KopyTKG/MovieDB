export default function MovieLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
          <nav> 
            <a href="/movies">Back</a>
          </nav>
          {children}
        </>
    )
  }