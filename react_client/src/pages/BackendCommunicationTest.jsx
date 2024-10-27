import { useState } from "react";
import { Container, Input, Button, Box, Text, Textarea } from "@chakra-ui/react";
import axios from "axios";

function BackendCommunicationTest() {
  // 입력 필드 상태와 전송 상태 메시지
  const [inputValue, setInputValue] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // 요청 보내기 함수
  const sendRequest = async () => {
    try {
      // Flask 백엔드로 POST 요청
      await axios.post("http://localhost:5000/test", { input_value: inputValue });
      setStatusMessage("요청을 보냈습니다.");
    } catch (error) {
      setStatusMessage("요청에 실패했습니다.");
      console.error("요청 오류:", error);
    }
  };

  return (
    <Container maxW="container.md" mt={4}>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Backend Communication Test
      </Text>

      <Box display="flex" alignItems="center">
        <Textarea
          placeholder="값을 입력하세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          mr={2}
        />
        <Button colorScheme="teal" onClick={sendRequest}>
          요청 보내기
        </Button>
      </Box>

      {statusMessage && (
        <Text mt={4} color="green.500" fontWeight="bold">
          {statusMessage}
        </Text>
      )}
    </Container>
  );
}

export default BackendCommunicationTest;