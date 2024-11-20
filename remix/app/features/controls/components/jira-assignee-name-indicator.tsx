import { Flex, Icon, Text } from "@chakra-ui/react";
import { TriangleAlert } from "lucide-react";
import { useTranslation } from "react-i18next";

function getJiraAssigneeNameConfig(
  t: (key: string) => string,
  jiraAssigneeName?: string
) {
  return jiraAssigneeName
    ? {
        color: "fg",
        icon: undefined,
        label: jiraAssigneeName,
      }
    : {
        color: "fg.muted",
        icon: TriangleAlert,
        label: t("controls.fields.jiraAssigneeName.empty"),
      };
}

type JiraAssigneeNameIndicatorProps = {
  jiraAssigneeName?: string;
};

export default function JiraAssigneeNameIndicator(
  props: JiraAssigneeNameIndicatorProps
) {
  const { jiraAssigneeName } = props;
  const { t } = useTranslation();

  const config = getJiraAssigneeNameConfig(t, jiraAssigneeName);
  const StatusIcon = config.icon;

  return (
    <Flex align="center" gap="1">
      {StatusIcon && (
        <Icon color={config.color}>
          <StatusIcon />
        </Icon>
      )}
      <Text color={config.color}>{config.label}</Text>
    </Flex>
  );
}
