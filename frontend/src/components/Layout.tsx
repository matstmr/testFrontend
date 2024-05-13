import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
          <Header />
          <main className="main-content">{children}</main>
        </>
      )
}