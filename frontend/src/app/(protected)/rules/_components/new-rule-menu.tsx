import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import NewJiraRuleButton from "./new-jira-rule-button";

export default function NewRuleMenu({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <MenuRoot positioning={{ placement: "bottom-end" }}>
      <MenuTrigger asChild>{children}</MenuTrigger>
      <MenuContent>
        <MenuItem value="new-jira-rule">
          <NewJiraRuleButton />
        </MenuItem>
        <MenuItem value="new-slack-rule" disabled>
          새 Slack 규칙
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
}
