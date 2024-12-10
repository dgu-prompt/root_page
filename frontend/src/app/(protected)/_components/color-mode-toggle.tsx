"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { IconButton } from "@chakra-ui/react";

export default function ColorModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const toggleColorMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <IconButton
      aria-label="toggle color mode"
      onClick={toggleColorMode}
      rounded="full"
      variant="surface"
      bg="bg"
      _hover={{ bg: "bg.emphasized" }}
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </IconButton>
  );
}
