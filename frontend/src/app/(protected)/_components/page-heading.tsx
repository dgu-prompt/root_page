import { Heading } from "@chakra-ui/react";

export default function PageHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Heading mb="8" size="3xl">
      {children}
    </Heading>
  );
}
