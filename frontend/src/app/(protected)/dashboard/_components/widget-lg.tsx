import { Card } from "@chakra-ui/react";

export default function WidgetLg({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <Card.Root height="full" size={{ base: "sm", md: "md", lg: "lg" }}>
      <Card.Header flex="0">
        <Card.Title fontSize={{ base: "md", md: "lg" }}>{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
      </Card.Header>
      <Card.Body flex="1">{children}</Card.Body>
    </Card.Root>
  );
}
