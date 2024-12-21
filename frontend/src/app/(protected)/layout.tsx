import { Container, Flex } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./_components/footer";
import Nav from "./_components/nav";
import { RegionProvider } from "./_contexts/region-context";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [regionsData, defaultRegionData] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/available-regions`),
    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/default-region`),
  ]);
  const regions = await regionsData.json();
  const defaultRegion = await defaultRegionData.json();

  return (
    <>
      <Nav />
      <Flex as="main" flexGrow="1">
        <Container
          py={{ base: "8", md: "10", lg: "12" }}
          maxWidth="breakpoint-xl"
        >
          <RegionProvider regions={regions} initialRegion={defaultRegion}>
            {children}
          </RegionProvider>
        </Container>
      </Flex>
      <Footer />
      <Toaster />
    </>
  );
}
