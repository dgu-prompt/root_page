import { useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Container, Text, Link, Flex, Stack, List, Box } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"

function RuleManagement() {
  // 상태로 rule 데이터를 관리합니다.
  const [rules, setRules] = useState([]);

  // 더미 데이터를 불러오는 useEffect 훅
  useEffect(() => {
    // 백엔드 완성 전까지 사용할 더미 데이터
    const dummyData = [
      { id: 1, name: "Rule 1", description: "This is the first rule." },
      { id: 2, name: "Rule 2", description: "This is the second rule." },
      { id: 3, name: "Rule 3", description: "This is the third rule." },
      { id: 4, name: "Rule 4", description: "This is the fourth rule." },
    ];

    // 더미 데이터를 상태로 설정
    setRules(dummyData);
  }, []);

  // 새 규칙 추가 함수 (예시)
  const addNewRule = () => {
    const newRule = { id: rules.length + 1, name: `Rule ${rules.length + 1}`, description: "Newly added rule." };
    setRules([...rules, newRule]);
  };

  // 규칙 편집 함수 (예시)
  const editRule = (id) => {
    alert(`Edit rule with id: ${id}`);
  };

  // 규칙 삭제 함수
  const deleteRule = (id) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  return (
    <>
      <Container mt={4}>
        <Flex justify="space-between" mb={4}>
          <Text fontSize="2xl" fontWeight="bold">Rule Management</Text>
          <Button colorPalette="teal" onClick={addNewRule}>새 규칙 추가</Button>
          <Link as={RouterLink} to={`new`}>
            <Text fontSize="lg" fontWeight="bold">새규칙페이지</Text>
          </Link>
        </Flex>
        <List.Root spacing={3}>
          {rules.map((rule) => (
            <List.Item
              key={rule.id}
              p={4}
              borderBottomWidth="1px"
            >
              <Flex align="center" justify="space-between">
                <Box>
                  <Link as={RouterLink} to={`${rule.id}`}>
                    <Text fontSize="lg" fontWeight="bold">{rule.name}</Text>
                  </Link>
                  <Text fontSize="sm" color="gray.500">{rule.description}</Text>
                </Box>
                <Stack direction="row" spacing={2}>
                  <Button size="sm" colorPalette="red" as={RouterLink} to={`${rule.id}/delete`}>삭제</Button>
                </Stack>
              </Flex>
            </List.Item>
          ))}
        </List.Root>
      </Container>
    </>
  );
}

export default RuleManagement