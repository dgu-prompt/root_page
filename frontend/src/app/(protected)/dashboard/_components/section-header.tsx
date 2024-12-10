import { Card, Flex, Stack } from "@chakra-ui/react";

export default function SectionHeader({
  title,
  description,
  children,
}: {
  title: string;
  description: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Card.Root size={{ base: "sm", md: "md", lg: "lg" }} variant="elevated">
      <Card.Body>
        <Flex
          align={{ base: "start", md: "center" }}
          direction={{ base: "column", md: "row" }}
          gap="4"
          justifyContent="space-between"
        >
          <Stack>
            <Card.Title fontSize={{ base: "lg", md: "xl" }}>{title}</Card.Title>
            <Card.Description>{description}</Card.Description>
          </Stack>
          {children}
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}
