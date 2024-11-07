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

function Footer() {
  const { t } = useTranslation();

  return (
    <Box as="footer" pb="8" pt="40" w="full">
      <Container>
        <Flex
          align="center"
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          gap="4"
        >
          <Text color="gray.600" fontSize="sm">
            {t("footerCopyright")}
          </Text>
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
      </Container>
    </Box>
  );
}

export default Footer;
