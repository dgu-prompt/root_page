import {
  Box,
  Container,
  Flex,
  IconButton,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { LuGithub } from "react-icons/lu";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import ToastButton from "@/components/ToastButton";

function Footer() {
  const { t } = useTranslation();

  return (
    <Box as="footer" pb="8" pt="40" width="full">
      <Container>
        <Flex
          align="center"
          direction={{ base: "column", md: "row" }}
          gap="4"
          justifyContent="space-between"
        >
          <Text color="gray.600" fontSize="sm">
            {t("footerCopyright")}
          </Text>
          <Flex align="center" gap="4">
            <ToastButton />
            <LanguageSwitcher />
            <ChakraLink href="https://github.com/dgu-prompt/root_page">
              <IconButton
                aria-label={t("footerGitHub")}
                rounded="full"
                variant="surface"
              >
                <LuGithub />
              </IconButton>
            </ChakraLink>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default Footer;
