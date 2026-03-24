import { Toaster } from "@/components/ui/sonner";
import { Layout } from "@/components/layout/Layout";
import { DevReviewPage } from "@/pages/DevReviewPage";
import { DesignSystemPage } from "@/pages/DesignSystemPage";

export default function App() {
  const path = window.location.pathname;

  return (
    <>
      <Toaster />
      {path === '/design-system' ? (
        <DesignSystemPage />
      ) : (
        <Layout>
          <DevReviewPage />
        </Layout>
      )}
    </>
  );
}
