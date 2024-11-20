import { Button } from "@/components/ui/button";
import { toaster } from "@/components/ui/toaster";

export default function ToastButton() {
  return (
    <Button
      onClick={() =>
        toaster.create({
          description: "test",
          type: "info",
        })
      }
      size="sm"
      variant="outline"
    >
      Show Toast test
    </Button>
  );
}
