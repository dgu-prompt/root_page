import { useRouter } from "next/navigation";
import { Box } from "@chakra-ui/react";
import { useRegion } from "../../_contexts/region-context";

export default function NewJiraRuleButton() {
  const router = useRouter();
  const { currentRegion } = useRegion();

  const handleClick = async () => {
    const request = {
      alertType: "jira",
      region: currentRegion,
    };

    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/add_rule_yaml`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );
    const ruleID = await data.json();
    router.push(`/rules/${ruleID}/edit`);
  };

  return (
    <Box onClick={handleClick} flex="1">
      새 Jira 규칙
    </Box>
  );
}
