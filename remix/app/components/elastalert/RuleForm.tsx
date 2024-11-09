import { Card, Stack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import ConfigFilter from "./ConfigFilter";
import ConfigGeneral from "./ConfigGeneral";
import AlertField from "./alert/AlertField";
import AlertConfiguration from "./alert/ConfigAlert";
import AlertForm from "./alert/ConfigAlertMigration";
import SlackSettings from "./alert/ConfigAlertSlack";

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
            setValue={function (): void {
              throw new Error("Function not implemented.");
            }}
            value={""}
          />
        </Card.Body>
      </Card.Root>
    </Stack>
  );
};

export default RuleForm;
