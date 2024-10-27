import { useState, useEffect } from 'react';
import { Container, Stack } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react"
import { Field } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

function SlackNotificationSettings() {
  const [isSlackEnabled, setIsSlackEnabled] = useState(false);

  useEffect(() => {
    const dummyData = {
      isEnabled: true,
    };
    setIsSlackEnabled(dummyData.isEnabled);
  }, []);

  const handleSlackToggle = () => setIsSlackEnabled(!isSlackEnabled);

  return (
    <>
      <Container>
        <Switch checked={isSlackEnabled} onCheckedChange={handleSlackToggle}>Slack 알림 활성화</Switch>

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

export default SlackNotificationSettings;