import { initializeApollo, addApolloState } from '~/lib/apolloClient'

const IndexPage = () => {
  return <>PackLi</>
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default IndexPage
