import { useClientStatus } from "@/hooks/useClientStatus";
import { IconButton } from "@chakra-ui/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ColorModeToggle() {
  const isClient = useClientStatus();
  const { theme, setTheme } = useTheme();
  const toggleColorMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!isClient) return null;

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
