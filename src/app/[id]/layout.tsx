export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav>
        <a className="btn-nav btn-secondary-outline" href="/">
          home
        </a>
        <a className="btn-nav btn-secondary-outline" href="/admin">
          admin
        </a>
      </nav>
      {children}
    </>
  );
}
