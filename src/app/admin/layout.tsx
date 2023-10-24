import { UserProvider } from "@auth0/nextjs-auth0/client"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
