import Link from "next/link";
import { HStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

export default function DesktopNav({
  navItems,
  pathname,
}: {
  navItems: { label: string; href: string }[];
  pathname: string;
}) {
  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <HStack
      hideBelow="md"
      left="50%"
      position="absolute"
      transform="translateX(-50%)"
    >
      {navItems.map((item) => (
        <Button
          asChild
          color={isActive(item.href) ? "fg" : "fg.muted"}
          fontWeight={isActive(item.href) ? "semibold" : "normal"}
          key={item.href}
          variant="plain"
        >
          <Link href={item.href}>{item.label}</Link>
        </Button>
      ))}
    </HStack>
  );
}
