import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Stack,
  Badge,
  Container,
} from "@chakra-ui/react";
import { Switch } from "@/components/ui/switch";

// 샘플 데이터
const sampleControls = [
  {
    id: "EC2.19",
    title:
      "Security groups should not allow unrestricted access to ports with high risk",
    guideline: `[EC2.19] This control checks whether unrestricted incoming traffic for an Amazon EC2 security group is accessible to the specified ports [3389, 20, 23, 110, 143, 3306, 8080, 1433, 9200, 9300, 25, 445, 135, 21, 1434, 4333, 5432, 5500, 5601, 22, 3000, 5000, 8088, 8888] that are considered to be high risk. This control fails if any of the rules in a security group allow ingress traffic from '0.0.0.0/0' or '::/0' to those ports.`,
    enabled: true,
    status: "Success",
    severity: "High",
  },
  {
    id: "EC2.20",
    title:
      "Ensure IAM policies do not grant full access to sensitive resources",
    guideline:
      "This control checks if any IAM policies have full access permissions to sensitive resources. Policies should be scoped to grant the minimum permissions required.",
    enabled: false,
    status: "Failed",
    severity: "Critical",
  },{
    id: "EC2.20",
    title:
      "Ensure IAM policies do not grant full access to sensitive resources",
    guideline:
      "This control checks if any IAM policies have full access permissions to sensitive resources. Policies should be scoped to grant the minimum permissions required.",
    enabled: false,
    status: "Failed",
    severity: "Critical",
  },{
    id: "EC2.20",
    title:
      "Ensure IAM policies do not grant full access to sensitive resources",
    guideline:
      "This control checks if any IAM policies have full access permissions to sensitive resources. Policies should be scoped to grant the minimum permissions required.",
    enabled: false,
    status: "Failed",
    severity: "Critical",
  },{
    id: "EC2.20",
    title:
      "Ensure IAM policies do not grant full access to sensitive resources",
    guideline:
      "This control checks if any IAM policies have full access permissions to sensitive resources. Policies should be scoped to grant the minimum permissions required.",
    enabled: false,
    status: "Failed",
    severity: "Critical",
  },{
    id: "EC2.20",
    title:
      "Ensure IAM policies do not grant full access to sensitive resources",
    guideline:
      "This control checks if any IAM policies have full access permissions to sensitive resources. Policies should be scoped to grant the minimum permissions required.",
    enabled: false,
    status: "Failed",
    severity: "Critical",
  },{
    id: "EC2.20",
    title:
      "Ensure IAM policies do not grant full access to sensitive resources",
    guideline:
      "This control checks if any IAM policies have full access permissions to sensitive resources. Policies should be scoped to grant the minimum permissions required.",
    enabled: false,
    status: "Failed",
    severity: "Critical",
  },{
    id: "EC2.20",
    title:
      "Ensure IAM policies do not grant full access to sensitive resources",
    guideline:
      "This control checks if any IAM policies have full access permissions to sensitive resources. Policies should be scoped to grant the minimum permissions required.",
    enabled: false,
    status: "Failed",
    severity: "Critical",
  },
  // 추가 샘플 항목을 여기에 추가할 수 있습니다
];

function ControlManagement() {
  const [controls, setControls] = useState(sampleControls);

  // 활성화/비활성화 토글 핸들러
  const toggleControl = (id) => {
    setControls((prevControls) =>
      prevControls.map((control) =>
        control.id === id ? { ...control, enabled: !control.enabled } : control
      )
    );
  };

  return (
    <Container>
      <Heading mb={6} textAlign="center">
        Control Management
      </Heading>
      <Box maxW="container.lg" mx="auto">
        <VStack spacing={6} align="stretch">
          {controls.map((control) => (
            <Box
              key={control.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="sm"
            >
              <HStack justifyContent="space-between">
                <Text fontWeight="bold">{control.id}</Text>
                <Switch
                  isChecked={control.enabled}
                  onChange={() => toggleControl(control.id)}
                  colorScheme="teal"
                  size="lg"
                />
              </HStack>
              <Text fontSize="lg" fontWeight="semibold" mt={2}>
                {control.title}
              </Text>
              <Text fontSize="sm" color="gray.600" mt={2}>
                {control.guideline}
              </Text>

              {/* Optional 항목 */}
              <Stack direction="row" spacing={4} align="center">
                <Box>
                  <Text fontSize="sm" fontWeight="bold">
                    Status:
                  </Text>
                  <Badge
                    colorScheme={control.status === "Success" ? "green" : "red"}
                  >
                    {control.status}
                  </Badge>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="bold">
                    Severity:
                  </Text>
                  <Badge
                    colorScheme={
                      control.severity === "Critical"
                        ? "red"
                        : control.severity === "High"
                        ? "orange"
                        : control.severity === "Medium"
                        ? "yellow"
                        : "green"
                    }
                  >
                    {control.severity}
                  </Badge>
                </Box>
              </Stack>
            </Box>
          ))}
        </VStack>
      </Box>
    </Container>
  );
}

export default ControlManagement;
