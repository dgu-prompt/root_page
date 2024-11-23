import { toaster } from "@/components/ui/toaster";

import type {
  ToggleControlStatusError,
  ToggleControlStatusOk,
  ToggleControlStatusPayload,
  ToggleControlStatusResponse,
} from "../types/controls-types";

const mockToggleControlStatusOk = async (
  controlId: string
): Promise<ToggleControlStatusOk> => {
  const mockToggleControlStatusOk: ToggleControlStatusOk = {
    ok: true,
    updatedControlId: controlId,
  };

  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockToggleControlStatusOk;
};

const mockToggleControlStatusError =
  async (): Promise<ToggleControlStatusError> => {
    const mockToggleControlStatusError: ToggleControlStatusError = {
      ok: false,
      errorMessage: "Failed to toggle control status",
    };

    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      throw new Error(mockToggleControlStatusError.errorMessage);
    } catch (error) {
      toaster.create({
        title: "Error",
        type: "error",
        description: (error as Error).message || "Unknown error occurred",
      });
      throw mockToggleControlStatusError;
    }
  };

const mockToggleControlStatus = async (
  controlId: string
): Promise<ToggleControlStatusResponse> => {
  if (Math.random() < 0.001) {
    return mockToggleControlStatusError();
  } else {
    return mockToggleControlStatusOk(controlId);
  }
};

export const toggleControlStatus = async ({
  controlId,
}: ToggleControlStatusPayload) => {
  return mockToggleControlStatus(controlId);
};
