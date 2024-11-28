import { Switch } from "@/components/ui/switch";
import { useState } from "react";

import { useToggleControlStatus } from "../contexts/toggle-control-status-context";
import { ToggleControlStatusFunction } from "../types/controls-types";
import { toaster } from "@/components/ui/toaster";

type ControlStatusSwitchProps = {
  controlId: string;
  controlStatus: "enabled" | "disabled";
};

export default function ControlStatusSwitch(props: ControlStatusSwitchProps) {
  const { controlId, controlStatus } = props;

  const [currentStatus, setCurrentStatus] = useState(controlStatus);
  const [loading, setLoading] = useState(false);

  const toggleControlStatus: ToggleControlStatusFunction =
    useToggleControlStatus();

  const toggleStatus = async () => {
    if (loading) return; // Prevent redundant toggles
    setLoading(true);

    const nextStatus = currentStatus === "enabled" ? "disabled" : "enabled";
    const previousStatus = currentStatus;
    setCurrentStatus(nextStatus); // Optimistic update

    try {
      await toggleControlStatus({
        controlId: controlId,
        newControlStatus: nextStatus,
      });
    } catch {
      setCurrentStatus(previousStatus);
    } finally {
      setLoading(false);
      toaster.create({
        description: `제어 항목 ${controlId}이/가 ${nextStatus}되었습니다.`,
        type: "info",
      });
    }
  };

  return (
    <Switch checked={currentStatus === "enabled"} onChange={toggleStatus} />
  );
}
