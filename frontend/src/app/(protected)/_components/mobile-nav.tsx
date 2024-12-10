import Link from "next/link";
import { Stack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

export default function MobileNav({
  navItems,
  pathname,
  onClose,
}: {
  navItems: { label: string; href: string }[];
  pathname: string;
  onClose: () => void;
}) {
  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <Stack display={{ base: "flex", md: "none" }} pb="3">
      {navItems.map((item) => (
        <Button
          asChild
          key={item.href}
          onClick={onClose}
          variant={isActive(item.href) ? "subtle" : "ghost"}
        >
          <Link href={item.href}>{item.label}</Link>
        </Button>
      ))}
    </Stack>
  );
}
