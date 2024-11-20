import { Button } from "@/components/ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Flex, Separator, Text } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";

import type { Assignee } from "@features/rules/services/types";

type AssigneeListProps = {
  assignees: Assignee[];
};

export default function AssigneeList({ assignees }: AssigneeListProps) {
  const { t } = useTranslation();
  return (
    <>
      {assignees.map((assignee, index) => (
        <Flex direction="column" key={assignee.assigneeId}>
          <Flex align="center" justifyContent="space-between" my="2">
            <Flex gap="1.5">
              <Text as="span" fontWeight="600">
                {assignee.assigneeName}
              </Text>
              <Text as="span">({assignee.assigneeId})</Text>
              {!assignee.hasRuleFile && <Text as="span">(규칙 없음)</Text>}
            </Flex>

            <Flex>
              {assignee.hasRuleFile ? (
                <>
                  <Button asChild variant="ghost">
                    <Link
                      to={`/alerts/jira/regions/ap-northeast-2/assignees/${assignee.assigneeId}/edit`}
                    >
                      편집
                    </Link>
                  </Button>

                  <DialogRoot>
                    <DialogTrigger asChild>
                      <Button colorPalette="red" variant="ghost">
                        {t("assignee.deleteButton")}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {t("assignee.deleteDialogTitle")}
                        </DialogTitle>
                      </DialogHeader>
                      <DialogBody>
                        <Text>{t("assignee.deleteDialogDescription")}</Text>
                      </DialogBody>
                      <DialogFooter>
                        <DialogActionTrigger asChild>
                          <Button variant="outline">
                            {t("common.cancel")}
                          </Button>
                        </DialogActionTrigger>
                        <Button colorPalette="red">{t("common.delete")}</Button>
                      </DialogFooter>
                      <DialogCloseTrigger />
                    </DialogContent>
                  </DialogRoot>
                </>
              ) : (
                <Button asChild variant="ghost">
                  <Link
                    to={`/alerts/jira/regions/ap-northeast-2/assignees/${assignee.assigneeId}/edit`}
                  >
                    새 규칙
                  </Link>
                </Button>
              )}
            </Flex>
          </Flex>
          {index < assignees.length - 1 && <Separator />}
        </Flex>
      ))}
    </>
  );
}
