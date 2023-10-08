
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <>
    <nav>
        <a href="/"> home </a>
    </nav>
    {children}
   </>
  )
}
