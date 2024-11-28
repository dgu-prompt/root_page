import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { Card, Fieldset, Input, Stack, Text } from "@chakra-ui/react";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

import { validateCredentials } from "@/services/auth.server";
import { commitSession, getSession } from "@/services/sessions";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/");
  }

  const data = { error: session.get("error") };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();
  const username = form.get("username") as string;
  const password = form.get("password") as string;

  const userId = await validateCredentials(username, password);

  if (userId == null) {
    session.flash("error", "Invalid username/password");

    // Redirect back to the login page with errors.
    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  session.set("userId", userId);

  // Login succeeded, send them to the home page.
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login() {
  const { error } = useLoaderData<typeof loader>();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Card.Root size="lg" variant="elevated" width="sm">
      <Card.Header>
        <Text color="fg" fontWeight="medium" textStyle="sm">
          SecurityCircle
        </Text>
        <Card.Title>로그인</Card.Title>
        <Card.Description>
          계정에 접근하기 위해 인증 정보를 입력하세요.
        </Card.Description>
      </Card.Header>
      <Form method="post">
        <Card.Body>
          <Stack gap="4">
            <Fieldset.Root invalid={!!error}>
              <Fieldset.Content>
                <Field invalid={!!error} label="사용자 이름">
                  <Input
                    name="username"
                    placeholder="사용자 이름을 입력하세요"
                  />
                </Field>
                <Field invalid={!!error} label="암호">
                  <PasswordInput
                    name="password"
                    placeholder="암호를 입력하세요"
                  />
                </Field>
              </Fieldset.Content>
              <Fieldset.ErrorText>{error}</Fieldset.ErrorText>
            </Fieldset.Root>
          </Stack>
        </Card.Body>
        <Card.Footer>
          <Button flex="1" type="submit">
            로그인
          </Button>
        </Card.Footer>
      </Form>
    </Card.Root>
  );
}
