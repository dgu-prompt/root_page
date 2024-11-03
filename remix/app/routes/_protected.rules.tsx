import {
  Box,
  Flex,
  Heading,
  Input,
  Table,
  useDisclosure,
} from "@chakra-ui/react";
import { LuFile, LuFolderPlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { useNavigate } from "@remix-run/react";

// 임시 데이터 (나중에 API 또는 DB 연결 가능)
const mockRules = [
  { val: "Sample Rule 1" },
  { val: "Sample Rule 2" },
  { val: "Sample Rule 3" },
];

export default function Rules() {
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
    <>
      <Heading mb="4">Rules</Heading>

      <Flex gap="4" mb="4">
        <Button colorScheme="blue" onClick={() => navigate("add")}>
          <LuFile style={{ marginRight: "8px" }} />
          Add Rule
        </Button>

        <Button colorScheme="teal" onClick={onOpen}>
          <LuFolderPlus style={{ marginRight: "8px" }} />
          Add Folder
        </Button>
      </Flex>

      {/* 규칙 테이블 */}
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Rules</Table.ColumnHeader>
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
                    onClick={() => navigate(`/rules/${rule.val}`)}
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
        <Box p="4" bg="gray.50" rounded="md" shadow="sm">
          <Heading size="md" mb="4">
            Add Folder
          </Heading>
          <Input
            placeholder="Enter folder name"
            value={newFolder}
            onChange={(e) => setNewFolder(e.target.value)}
            mb="4"
          />
          <Button colorScheme="teal" mr="4" onClick={handleAddFolder}>
            OK
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Box>
      )}
    </>
  );
}
