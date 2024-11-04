import { HStack, Input, VStack } from "@chakra-ui/react";
import { Field } from "~/components/ui/field";
import { Radio, RadioGroup } from "~/components/ui/radio";
import { InfoTip } from "~/components/ui/toggle-tip";

const ConfigGeneral = ({ formData, setFormData }) => (
  <VStack gap={6} align="start">
    {/* name */}
    <Field label="이름" helperText="규칙의 이름으로, 고유해야 합니다.">
      <Input placeholder="Sample Rule" value="Sample Rule"></Input>
    </Field>
    {/* <Field label="Type">
      <Input placeholder="Sample Rule" value="frequency"></Input>
    </Field> */}

    {/* Index Input with Suggestions (TODO)
    <Field label="Index" helperText="e.g. logstash-* or logstash-%Y.%m.%d">
      <Input placeholder="Sample Rule" value="security-events"></Input>
    </Field> */}

    {/* num_events */}
    <Field label="이벤트 수" helperText="알림을 발생시키는 이벤트 수입니다.">
      <Input placeholder="1" value="1"></Input>
    </Field>

    {/* timeframe */}
    <Field
      label="시간 범위"
      helperText="이벤트 수가 발생해야 하는 시간 범위입니다."
    >
      <Input placeholder="4" value="4" mb="2"></Input>
      <RadioGroup defaultValue="hours">
        <HStack gap="6">
          <Radio value="minutes">분</Radio>
          <Radio value="hours">시간</Radio>
          <Radio value="days">일</Radio>
        </HStack>
      </RadioGroup>
    </Field>

    {/* <FormControl>
      <FormLabel>Name</FormLabel>
      <Input
        placeholder="Sample Rule"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
    </FormControl>
    <FormControl>
      <FormLabel>Type</FormLabel>
      <Input
        placeholder="frequency"
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
      />
    </FormControl>
    <FormControl>
      <FormLabel>Index</FormLabel>
      <Input
        placeholder="security-events"
        value={formData.index}
        onChange={(e) => setFormData({ ...formData, index: e.target.value })}
      />
    </FormControl>
    <FormControl>
      <FormLabel>Threshold</FormLabel>
      <Input
        type="number"
        placeholder="5"
        value={formData.threshold}
        onChange={(e) =>
          setFormData({ ...formData, threshold: e.target.value })
        }
      />
    </FormControl> */}
  </VStack>
);

export default ConfigGeneral;
