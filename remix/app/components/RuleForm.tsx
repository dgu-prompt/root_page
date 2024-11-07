import { Card, Stack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import ConfigFilter from "./config/ConfigFilter";
import ConfigGeneral from "./config/ConfigGeneral";
import AlertConfiguration from "./config/alert/ConfigAlert";
import SlackSettings from "./config/alert/ConfigAlertSlack";
import AlertForm from "./config/alert/ConfigAlertMigration";
import AlertField from "./AlertField";

type YamlPreviewProps = {
  content: string;
};

const RuleForm = ({ content }: YamlPreviewProps) => {
  const { t } = useTranslation();

  return (
    <Stack gap="8">
      <Card.Root size={{ base: "sm", md: "md", lg: "lg" }}>
        <Card.Header>
          <Card.Title>{t("ruleForm.generalTitle")}</Card.Title>
        </Card.Header>
        <Card.Body>
          <ConfigGeneral formData={undefined} setFormData={undefined} />
        </Card.Body>
      </Card.Root>

      <ConfigFilter />

      <Card.Root size={{ base: "sm", md: "md", lg: "lg" }}>
        <Card.Header>
          <Card.Title>{t("ruleForm.alertTitle")}</Card.Title>
        </Card.Header>
        <Card.Body>
          <AlertConfiguration />
        </Card.Body>
      </Card.Root>

      <Card.Root size={{ base: "sm", md: "md", lg: "lg" }}>
        <Card.Header>
          <Card.Title>{t("ruleForm.slackTitle")}</Card.Title>
        </Card.Header>
        <Card.Body>
          <SlackSettings />
        </Card.Body>
      </Card.Root>

      <Card.Root size={{ base: "sm", md: "md", lg: "lg" }}>
        <Card.Header>
          <Card.Title>{t("ruleForm.jiraTitle")}</Card.Title>
        </Card.Header>
        <Card.Body>
          <SlackSettings />
        </Card.Body>
      </Card.Root>

      <Card.Root size={{ base: "sm", md: "md", lg: "lg" }}>
        <Card.Header>
          <Card.Title>{t("ruleForm.test")}</Card.Title>
        </Card.Header>
        <Card.Body>
          <AlertField
            label={""}
            value={""}
            setValue={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Card.Body>
      </Card.Root>
    </Stack>
  );
};

export default RuleForm;
