import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { List, Typography, message } from 'antd'
import { PACKING_LISTS } from 'src/common/queries'

const PackingLists = () => {
  const { data, loading, error } = useQuery(PACKING_LISTS)
  if (error) {
    console.log('🔈 ~ error', error)
    console.log(error.graphQLErrors)
    message.error(error.name)
  }

  const packingLists = data?.packingListsList?.items || []

  return (
    <List
      bordered
      loading={loading}
      dataSource={packingLists}
      renderItem={(item: any) => (
        <List.Item key={item.id}>
          <Link href={`/list/${item.id}`}>
            <Typography.Text>{item.name}</Typography.Text>
          </Link>
        </List.Item>
      )}
    />
  )
}

export default PackingLists
