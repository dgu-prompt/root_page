import { useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Flex,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { SegmentedControl } from "@/components/ui/segmented-control";

function BackendTest() {
  const [apiPath, setApiPath] = useState("http://localhost:5101/insights");
  const [requestMethod, setRequestMethod] = useState("POST");
  const [inputValue, setInputValue] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);

    try {
      // 요청 데이터 설정
      const config = {
        method: requestMethod.toLowerCase(),
        url: apiPath,
        data:
          requestMethod === "POST"
            ? { input_value: inputValue || "{}" }
            : undefined,
      };

      // 요청 보내기
      const response = await axios(config);
      setResponseMessage(JSON.stringify(response.data, null, 2)); // JSON 포맷으로 응답 표시
    } catch (error) {
      setIsError(true);
      setResponseMessage("요청에 실패했습니다. 다시 시도해 주세요.");
      console.error("요청 오류:", error);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Flex px="4" gap="4" direction="column">
        <Heading size="3xl">백엔드 통신 테스트</Heading>

        <form onSubmit={handleSubmit}>
          <Flex gap="6" direction="column">
            <Field label="요청 방식">
              <SegmentedControl
                value={requestMethod}
                onValueChange={(e) => setRequestMethod(e.value)}
                items={["GET", "POST", "PUT", "DELETE"]}
              />
            </Field>
            <Field label="API 경로">
              <Input
                placeholder="API 경로를 입력하세요"
                value={apiPath}
                onChange={(e) => setApiPath(e.target.value)}
              />
            </Field>
            <Field
              label="요청 데이터"
              helperText={!isError && responseMessage && "요청에 성공했습니다."}
              invalid={!!isError}
              errorText={responseMessage}
            >
              <Textarea
                placeholder="전송할 데이터를 입력하세요"
                value={inputValue}
                onChange={handleInputChange}
              />
            </Field>
            <Box>
              <Button type="submit" loading={isLoading}>
                요청 보내기
              </Button>
            </Box>
          </Flex>
        </form>
        {!isError && responseMessage && (
          <Field label="응답">
            <Textarea
              value={responseMessage}
              readOnly
              height="200px"
              placeholder="응답이 여기에 표시됩니다"
            />
          </Field>
        )}
      </Flex>
    </Container>
  );
}

export default BackendTest;
