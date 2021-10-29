import Link from "next/link"
import sanity from "../lib/sanity";
import {
  Link as ChakraLink,
  Text,
	Box,
  Flex, SimpleGrid, Center,
} from '@chakra-ui/react'

const QuestionItem = ({ number }) => <Center w="full" h="16" bg="teal.4000" borderRadius="8" border="1px solid" borderColor="#aaa" fontSize="2xl" _hover={{ background: 'gray.100' }}>
<Link href={`/${number}`}><a>{number}</a></Link>
</Center>

const Index = ({ questiondata }) => (
  <Flex height="100vh">
    
			<Box fontSize="6xl" height="100vh" fontWeight="bold" w="max-content" maxW="460px" px="4" bg="gray.100" lineHeight="shorter">
				
				<Text fontSize="5xl" mt="32" color="blue.600">2021</Text>
				BIOLOGY <br />
				QUIZ COMPETITION<br />
				
		
			</Box>
		<Box flex="1">
			<SimpleGrid columns={10} spacing="4" px="20" py="20">
				{
					questiondata.map((question) => <QuestionItem number={question.number} />)
				}
			</SimpleGrid>
		</Box>
  </Flex>
)

export default Index

export async function getStaticProps({ params }) {
	const query = `*[_type == "question" && !(_id in path('drafts.**'))]{
		_id,
		number,
	}`;
  //let questiondata = await sanity.fetch(query, { number: number });
  let questiondata = await sanity.fetch(query);

  return {
    props: {
      questiondata,
    },
  };
}