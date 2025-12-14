import StreamClientProvider from "../../components/Providers/StreamClientProvider";

function Layout({ children }: { children: React.ReactNode }) {
  return <StreamClientProvider>{children}</StreamClientProvider>;
}
export default Layout;