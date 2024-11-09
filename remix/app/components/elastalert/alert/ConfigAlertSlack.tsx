import { Box, Button, Flex, Input, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Field } from "~/components/ui/field";
import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Radio, RadioGroup } from "~/components/ui/radio";
import { Switch } from "~/components/ui/switch";

function SlackSettings() {
  const [isMounted, setIsMounted] = useState(false);
  const [slackWebhookUrls, setSlackWebhookUrls] = useState<string[]>([]);
  const [slackChannels, setSlackChannels] = useState<string[]>([]);
  const [slackUsername, setSlackUsername] = useState("");
  const [slackMsgColor, setSlackMsgColor] = useState("good");
  const [slackTextString, setSlackTextString] = useState("");
  const [slackIgnoreSslErrors, setSlackIgnoreSslErrors] = useState(false);
  const [slackAttachKibanaDiscoverUrl, setSlackAttachKibanaDiscoverUrl] =
    useState(false);

  //  const { open, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // 클라이언트 렌더링이 완료될 때까지 기다림

  const handleAddWebhook = () => setSlackWebhookUrls([...slackWebhookUrls, ""]);
  const handleAddChannel = () => setSlackChannels([...slackChannels, ""]);
  const handleRemoveWebhook = (index: number) => {
    setSlackWebhookUrls(slackWebhookUrls.filter((_, i) => i !== index));
  };
  const handleRemoveChannel = (index: number) => {
    setSlackChannels(slackChannels.filter((_, i) => i !== index));
  };

  return (
    <>
      <Stack gap={6}>
        <Box>
          <PopoverRoot>
            <PopoverTrigger asChild>
              <Button>Slack Webhook URLs ({slackWebhookUrls.length})</Button>
            </PopoverTrigger>
            <PopoverContent p={4}>
              {slackWebhookUrls.map((url, index) => (
                <Flex align="center" key={index} mb={2}>
                  <Input
                    onChange={(e) => {
                      const updatedUrls = [...slackWebhookUrls];
                      updatedUrls[index] = e.target.value;
                      setSlackWebhookUrls(updatedUrls);
                    }}
                    placeholder="Webhook URL"
                    value={url}
                  />
                  <Button
                    colorScheme="red"
                    ml={2}
                    onClick={() => handleRemoveWebhook(index)}
                  >
                    Delete
                  </Button>
                </Flex>
              ))}
              <Button onClick={handleAddWebhook}>Add Webhook URL</Button>
            </PopoverContent>
          </PopoverRoot>
        </Box>

        <Box>
          <PopoverRoot>
            <PopoverTrigger asChild>
              <Button>Slack Channel Overrides ({slackChannels.length})</Button>
            </PopoverTrigger>
            <PopoverContent p={4}>
              {slackChannels.map((channel, index) => (
                <Flex align="center" key={index} mb={2}>
                  <Input
                    onChange={(e) => {
                      const updatedChannels = [...slackChannels];
                      updatedChannels[index] = e.target.value;
                      setSlackChannels(updatedChannels);
                    }}
                    placeholder="Channel Override"
                    value={channel}
                  />
                  <Button
                    colorScheme="red"
                    ml={2}
                    onClick={() => handleRemoveChannel(index)}
                  >
                    Delete
                  </Button>
                </Flex>
              ))}
              <Button onClick={handleAddChannel}>Add Channel Override</Button>
            </PopoverContent>
          </PopoverRoot>
        </Box>

        <Field
          helperText="This is the username that will appear in Slack."
          label="Post as"
        >
          <Input
            onChange={(e) => setSlackUsername(e.target.value)}
            placeholder="Username"
            value={slackUsername}
          />
        </Field>

        <Field label="Message Color">
          <RadioGroup onValueChange={() => setSlackMsgColor(slackMsgColor)}>
            <Stack direction="row">
              <Radio value="danger">Danger</Radio>
              <Radio value="warning">Warning</Radio>
              <Radio value="good">Good</Radio>
            </Stack>
          </RadioGroup>
        </Field>

        <Field label="Notification Message">
          <Input
            onChange={(e) => setSlackTextString(e.target.value)}
            placeholder="Notification message"
            value={slackTextString}
          />
        </Field>

        <Switch
          checked={slackIgnoreSslErrors}
          onChange={() => setSlackIgnoreSslErrors(!slackIgnoreSslErrors)}
        >
          Ignore SSL Errors
        </Switch>

        <Switch
          checked={slackAttachKibanaDiscoverUrl}
          onChange={() =>
            setSlackAttachKibanaDiscoverUrl(!slackAttachKibanaDiscoverUrl)
          }
        >
          Attach Kibana Discover URL
        </Switch>

        {/* <FormControl>
          <FormLabel>Kibana Discover URL Color</FormLabel>
          <ColorPicker
            colorScheme="blue"
            onChange={setSlackMsgColor}
            value={slackMsgColor}
          />
          <FormHelperText>
            Choose color for Kibana Discover link in message.
          </FormHelperText>
        </FormControl> */}
      </Stack>
    </>
  );
}

export default SlackSettings;
