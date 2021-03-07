import { useRouter } from 'next/router'
import PackingList from 'src/components/PackingList'

const PackingListPage = () => {
  const router = useRouter()
  return <PackingList id={router.query.id} />
}

export default PackingListPage
