import { useRouter } from 'next/router'
import PackingList from 'src/components/PackingList'

const PackingListPage = () => {
  const router = useRouter()
  // @ts-ignore
  return <PackingList editable={true} id={router.query.id} />
}

export default PackingListPage
