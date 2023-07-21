import Layout from "@/page_components/layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Layout>{children}</Layout>
    </section>
  );
}
