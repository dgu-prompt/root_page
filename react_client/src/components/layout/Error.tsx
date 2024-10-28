import { Button, Card, Center, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <Center flex="1" bg="bg.subtle">
      <Card.Root size="lg" variant="elevated">
        <Card.Header>
          <Link to={"/"}>
            <Text fontWeight="medium" textStyle="sm" color="fg">
              SecurityCircle
            </Text>
          </Link>
        </Card.Header>
        <Card.Body>
          <Card.Title>404</Card.Title>
          <Card.Description>페이지를 찾을 수 없습니다.</Card.Description>
        </Card.Body>
        <Card.Footer>
          <Button as={Link} to={"/"}>
            홈으로 돌아가기
          </Button>
        </Card.Footer>
      </Card.Root>
    </Center>
  );
}

export default Error;
