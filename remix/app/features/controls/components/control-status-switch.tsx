import { Switch } from "@/components/ui/switch";
import { useState } from "react";

import { useToggleControlStatus } from "../contexts/toggle-control-status-context";
import { ToggleControlStatusFunction } from "../types/controls-types";

type ControlStatusSwitchProps = {
  controlId: string;
  controlStatus: "ENABLED" | "DISABLED";
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

    const nextStatus = currentStatus === "ENABLED" ? "DISABLED" : "ENABLED";
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
    }
  };

  return (
    <Switch checked={currentStatus === "ENABLED"} onChange={toggleStatus} />
  );
}
