import { useState, useEffect } from "react";
import { Container, Stack } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

function AlertContent() {
  const [isSlackEnabled, setIsSlackEnabled] = useState(false);

  useEffect(() => {
    const dummyData = {
      isEnabled: true,
    };
    setIsSlackEnabled(dummyData.isEnabled);
  }, []);

  return (
    <>
      <Container>
        <Heading>알림 내용</Heading>
        {isSlackEnabled && (
          <Stack spacing={4} mt={4}>
            <Field label="Webhook URL (전역 규칙)" disabled>
              <Input></Input>
            </Field>
          </Stack>
        )}
      </Container>
    </>
  );
}

export default AlertContent;
