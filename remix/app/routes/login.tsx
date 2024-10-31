import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { Card, Center, Fieldset, Input, Stack, Text } from "@chakra-ui/react";
import { Form, useLoaderData } from "@remix-run/react";
import { commitSession, getSession } from "~/sessions";
import { Button } from "~/components/ui/button";
import { Field } from "~/components/ui/field";
import { PasswordInput } from "~/components/ui/password-input";
import { validateCredentials } from "~/utils/auth.server";

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

  return (
    <Center flex="1" bg="bg.subtle">
      <Card.Root size="lg" variant="elevated">
        <Card.Header>
          <Text fontWeight="medium" textStyle="sm" color="fg">
            SecurityCircle
          </Text>
          <Card.Title>Log in to your account</Card.Title>
          <Card.Description>
            Enter your credentials to access your account
          </Card.Description>
        </Card.Header>
        <Form method="post">
          <Card.Body>
            <Stack gap="4">
              <Fieldset.Root invalid={!!error}>
                <Fieldset.Content>
                  <Field label="Username" invalid={!!error}>
                    <Input name="username" placeholder="Enter your username" />
                  </Field>
                  <Field label="Password" invalid={!!error}>
                    <PasswordInput
                      name="password"
                      placeholder="Enter your password"
                    />
                  </Field>
                </Fieldset.Content>
                <Fieldset.ErrorText>{error}</Fieldset.ErrorText>
              </Fieldset.Root>
            </Stack>
          </Card.Body>
          <Card.Footer>
            <Button type="submit" flex="1">
              Login
            </Button>
          </Card.Footer>
        </Form>
      </Card.Root>
    </Center>
  );
}
