import { useParams, useNavigate } from 'react-router-dom';
import { Container, Text, Button } from "@chakra-ui/react";

function DeleteRuleConfirm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    alert(`Rule ID: ${id} has been deleted.`);
    navigate('/');
  };

  return (
    <Container maxW="container.md" mt={4}>
      <Text fontSize="2xl" fontWeight="bold">규칙 삭제</Text>
      <Text mt={2} color="red.500">Are you sure you want to delete Rule ID: {id}?</Text>
      <Button mt={4} colorScheme="red" onClick={handleDelete}>규칙 삭제</Button>
    </Container>
  );
}

export default DeleteRuleConfirm;