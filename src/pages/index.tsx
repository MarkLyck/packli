import { initializeApollo, addApolloState } from '~/lib/apolloClient'
import PackingLists from 'src/components/PackingLists'

const IndexPage = () => {
  return (
    <>
      Packli
      <PackingLists />
    </>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default IndexPage
