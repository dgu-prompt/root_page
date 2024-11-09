import {
  Box,
  Container,
  Flex,
  Heading,
  Input,
  Table,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuFile, LuFolderPlus } from "react-icons/lu";
import { Button } from "~/components/ui/button";

// 임시 데이터 (나중에 API 또는 DB 연결 가능)
const mockRules = [
  { val: "Sample Rule 1" },
  { val: "Sample Rule 2" },
  { val: "Sample Rule 3" },
];

export default function Rules() {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();
  const { open, onOpen, onClose } = useDisclosure();
  const [newFolder, setNewFolder] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // 클라이언트 렌더링이 완료될 때까지 기다림

  const handleAddFolder = () => {
    // 여기서 폴더 추가 논리를 추가할 수 있습니다.
    console.log(`새 폴더 이름: ${newFolder}`);
    onClose();
  };

  return (
    <Container pt="16">
      <Heading mb="4" size="2xl">
        {t("rulesPage.heading")}
      </Heading>

      <Flex gap="4" mb="4">
        <Button colorScheme="blue" onClick={() => navigate("add")}>
          <LuFile style={{ marginRight: "8px" }} />
          {t("rulesPage.addRuleButton")}
        </Button>

        <Button colorScheme="teal" onClick={onOpen}>
          <LuFolderPlus style={{ marginRight: "8px" }} />
          {t("rulesPage.addFolderButton")}
        </Button>
      </Flex>

      {/* 규칙 테이블 */}
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>
              {t("rulesPage.tableHeader")}
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {mockRules.map((rule, idx) => (
            <Table.Row key={idx}>
              <Table.Cell>
                <Flex align="center">
                  <LuFile style={{ marginRight: "8px" }} />
                  <Box
                    as="span"
                    color="blue.500"
                    cursor="pointer"
                    onClick={() => navigate(`/rules/${rule.val}/edit`)}
                  >
                    {rule.val}
                  </Box>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {/* 폴더 추가 모달 */}
      {open && (
        <Box bg="gray.50" p="4" rounded="md" shadow="sm">
          <Heading mb="4" size="md">
            {t("rulesPage.modalTitle")}
          </Heading>
          <Input
            mb="4"
            onChange={(e) => setNewFolder(e.target.value)}
            placeholder={t("rulesPage.inputPlaceholder")}
            value={newFolder}
          />
          <Button colorScheme="teal" mr="4" onClick={handleAddFolder}>
            {t("rulesPage.okButton")}
          </Button>
          <Button onClick={onClose}>{t("rulesPage.cancelButton")}</Button>
        </Box>
      )}
    </Container>
  );
}
