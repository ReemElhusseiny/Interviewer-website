import StreamClientProvider from "../../components/Providers/StreamClientProvider";

function Layout({ children }: { children: React.ReactNode }) {
  const Provider = StreamClientProvider as unknown as React.ComponentType<{
    children: React.ReactNode;
  }>;
  return <Provider>{children}</Provider>;
}
export default Layout;