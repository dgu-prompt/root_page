import { Card } from "@chakra-ui/react";

export default function DashboardCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card.Root height="full" size={{ base: "sm", md: "md", lg: "lg" }}>
      <Card.Header>
        <Card.Title fontSize={{ base: "md", md: "lg" }}>{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
      </Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card.Root>
  );
}
