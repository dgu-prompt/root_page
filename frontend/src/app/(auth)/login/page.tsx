"use client";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { Card, Fieldset, Input, Stack, Text } from "@chakra-ui/react";
import { useActionState } from "react";
import { login } from "@/app/(auth)/_actions/auth";

export default function Page() {
  const [message, loginAction] = useActionState(login, null);

  return (
    <Card.Root variant="elevated" width="sm">
      <Card.Header>
        <Text color="fg" fontWeight="medium" textStyle="sm">
          SecurityCircle
        </Text>
        <Card.Title>로그인</Card.Title>
        <Card.Description>
          계정에 접근하기 위해 인증 정보를 입력하세요.
        </Card.Description>
      </Card.Header>
      <form action={loginAction}>
        <Card.Body>
          <Stack gap="4">
            <Fieldset.Root invalid={!!message}>
              <Fieldset.Content>
                <Field label="사용자 이름" invalid={!!message}>
                  <Input
                    name="username"
                    placeholder="사용자 이름을 입력하세요"
                  />
                </Field>
                <Field label="암호" invalid={!!message}>
                  <PasswordInput
                    name="password"
                    placeholder="암호를 입력하세요"
                  />
                </Field>
              </Fieldset.Content>
              <Fieldset.ErrorText>{message?.message}</Fieldset.ErrorText>
            </Fieldset.Root>
          </Stack>
        </Card.Body>
        <Card.Footer>
          <Button flex="1" type="submit">
            로그인
          </Button>
        </Card.Footer>
      </form>
    </Card.Root>
  );
}
