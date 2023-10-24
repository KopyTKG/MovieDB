import { UserProvider } from "@auth0/nextjs-auth0/client"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="nav">
        <a className="btn-nav btn-secondary-outline" href="/">
          home
        </a>
        <a className="btn-nav btn-secondary-outline" href="/api/auth/logout">
          logout
        </a>
      </div>
      {children}
    </>
  );
}

