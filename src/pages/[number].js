import { useState, useEffect } from "react";
import { Questions } from "../data/questions";
import Link from "next/link";
import { useRouter } from "next/router";
import { getUsedQuestions, addUsedQuestion } from "../lib/usedQuestions";
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

const Option = ({ action, option, content }) => (
  <Box as="button" onClick={action} role="group">
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
      _groupHover={{
        background: "blue.500",
      }}
      _groupActive={{
        background: "blue.600",
      }}
    >
      {option}
    </Box>
    <Box
      borderColor="#ccc"
      fontSize="2xl"
      px="4"
      py="2"
      className="option-box"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </Box>
);

const Index = ({ questiondata }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chosenAnswer, setChosenAnswer] = useState(null);

  function selectAnswer(ans) {
    setChosenAnswer(ans);
    onOpen();
  }

  useEffect(() => {
    addUsedQuestion(`${router.query.number}`);
    console.log("added");
  }, []);

  return (
    <Box width="1200px" mx="auto">
      <Box mx="auto" minH="120px">
        <Box
          my="16"
          w="full"
          textAlign="center"
          className="option-box"
          fontSize="4xl"
          dangerouslySetInnerHTML={{ __html: questiondata.question }}
        />
      </Box>
      <Box
        maxW="40"
        borderTop="1px solid"
        borderColor="gray.400"
        my="8"
        mx="auto"
      ></Box>
      <SimpleGrid columns={2} spacingX={8} spacingY={16}>
        <Option
          action={() => selectAnswer("A")}
          option="A"
          content={questiondata.optiona}
        />
        <Option
          action={() => selectAnswer("B")}
          option="B"
          content={questiondata.optionb}
        />
        <Option
          action={() => selectAnswer("C")}
          option="C"
          content={questiondata.optionc}
        />
        <Option
          action={() => selectAnswer("D")}
          option="D"
          content={questiondata.optiond}
        />
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box textAlign="center" fontSize="4xl">
              {chosenAnswer == questiondata.answer ? (
                <Box>
                  <Box fontSize="6xl">????</Box>Correct
                </Box>
              ) : (
                <Box>
                  <Box fontSize="6xl">????</Box>Incorrect
                </Box>
              )}
              <Text fontSize="lg">Correct Answer: {questiondata.answer}</Text>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Box
              bg="blue.500"
              color="white"
              borderRadius="4"
              px="4"
              py="2"
              _hover={{ background: "blue.600" }}
              _active={{ background: "blue.700" }}
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
  let paths = [];
  const questionCount = Questions.length;
  for (let i = 1; i <= questionCount; i++) {
    paths.push({ params: { number: `${i}` } });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const number = parseInt(params.number);
  let questiondata = Questions[number - 1];

  return {
    props: {
      questiondata,
    },
  };
}
