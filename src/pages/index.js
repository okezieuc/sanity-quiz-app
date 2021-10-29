import Link from "next/link"
import {
  Link as ChakraLink,
  Text,
	Box,
  Flex, SimpleGrid, Center,
} from '@chakra-ui/react'

const QuestionItem = () => <Center w="full" h="16" bg="teal.4000" borderRadius="8" border="1px solid" borderColor="#aaa" fontSize="2xl" _hover={{ background: 'gray.100' }}>
<Link href="/1">99</Link>
</Center>

const Index = () => (
  <Flex height="100vh">
    
			<Box fontSize="6xl" height="100vh" fontWeight="bold" w="max-content" maxW="460px" px="4" bg="gray.100" lineHeight="shorter">
				
				<Text fontSize="5xl" mt="32" color="blue.600">2021</Text>
				BIOLOGY <br />
				QUIZ COMPETITION<br />
				
		
			</Box>
		<Box flex="1">
			<SimpleGrid columns={10} spacing="4" px="20" py="20">
				<QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem />
				<QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem />
				<QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem />
				<QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem />
				<QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem />
				<QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem />
				<QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem />
				<QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem />
				<QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem />
				<QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem /><QuestionItem />
			</SimpleGrid>
		</Box>
  </Flex>
)

export default Index
