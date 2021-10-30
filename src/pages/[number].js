import { useState } from "react";
import sanity from "../lib/sanity";
import Link from "next/link";
import {
  Link as ChakraLink,
  Text,
  Box,
  Flex,
  SimpleGrid,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";

const Option = ({ action, option }) => (
  <Box as="button" onClick={action}>
    <Box
      px="4"
      py="2"
      fontSize="xl"
      fontWeight="semibold"
      color="white"
      bg="blue.400"
      w="max-content"
      borderRadius="8"
      mx="auto"
    >
      {option}
    </Box>
    <Box borderColor="#ccc" fontSize="2xl" px="4" py="2">
      Sample option content will come here
    </Box>
  </Box>
);

const Index = ({ questiondata }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chosenAnswer, setChosenAnswer] = useState(null);

  function selectAnswer(ans) {
    setChosenAnswer(ans);
    onOpen();
  }

  return (
    <Box width="1200px" mx="auto">
      <Box mx="auto" minH="120px">
        <Box my="16" w="full" textAlign="center" fontSize="4xl">
          At which of the following organelles is food produced in plants?
        </Box>
      </Box>
      <Box
        maxW="40"
        borderTop="1px solid"
        borderColor="gray.400"
        my="8"
        mx="auto"
      ></Box>
      <SimpleGrid columns={2} spacingX={8} spacingY={16}>
        <Option action={() => selectAnswer("A")} option="A" />
        <Option action={() => selectAnswer("B")} option="B" />
        <Option action={() => selectAnswer("C")} option="C" />
        <Option action={() => selectAnswer("D")} option="D" />
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box textAlign="center" fontSize="4xl">
              {chosenAnswer == "A" ? (
                <Box>
                  <Box fontSize="6xl">🎉</Box>Correct
                </Box>
              ) : (
                <Box>
                  <Box fontSize="6xl">🥱</Box>Incorrect
                </Box>
              )}
              <Text fontSize="lg">
                Correct Answer: {"A" /*DO NOT FORGET TO REPLACE */}
              </Text>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Box
              bg="blue.500"
              color="white"
              borderRadius="4"
              px="4"
              py="2"
              _hover={{ background: "blue.400" }}
              mr={3}
              onClick={onClose}
            >
              <Link href="/">Proceed</Link>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;

export async function getStaticPaths() {
  const query = `*[_type == "question" && !(_id in path('drafts.**'))]{
		_id,
		number,
	}`;
  let questiondata = await sanity.fetch(query);
  let paths = [];
  questiondata.forEach((question) =>
    paths.push({ params: { number: `${question.number}` } })
  );

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const number = parseInt(params.number);
  const query = `*[_type == "question" && number == $number && !(_id in path('drafts.**'))]`;

  let questiondata = await sanity.fetch(query, { number: number });

  return {
    props: {
      questiondata,
    },
  };
}
