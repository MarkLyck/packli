import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { useToggle } from 'ahooks'
import { Card, Table, Typography, message, Button, Space, Modal } from 'antd'
import { PACKING_LIST } from 'src/common/queries'
import NewItem from './NewItem'
import Delete from './Delete'

const { Text } = Typography

const Container = styled.div`
  padding: 32px;
  height: 100%;
  width: 100%;
  background-color: ${(p) => p.theme.palette.neutral[200]};
`

type PackingListsProps = {
  id: string
}

const PackingLists = ({ id }: PackingListsProps) => {
  const [newItemModalVisible, { toggle }] = useToggle()
  const { data, error } = useQuery(PACKING_LIST, { variables: { id } })

  if (error) {
    message.error(error.message)
  }

  const packingList = data?.packingList || {}
  const items = packingList?.items?.items || []

  const categoriesMap = items.reduce((acc: any, curr: any) => {
    const categoryId = curr.category.id
    if (!acc[categoryId]) {
      acc[categoryId] = [curr]
    } else {
      acc[categoryId].push(curr)
    }

    return acc
  }, {})

  const itemsByCategory = Object.values(categoriesMap)

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
      render: (value: string) => {
        if (!value) return null

        return <Text>{value}g</Text>
      },
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      render: (_: string, item: any) => {
        if (!item.width || !item.height || !item.depth) return null

        return (
          <Text>
            {item.width}x{item.height}x{item.depth}
          </Text>
        )
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (value: string) => {
        if (!value) return null

        return <Text>${value}</Text>
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_: string, item: any) => (
        <Space>
          <a href={item.uRL}>
            <Button disabled={item.uRL ? false : true}>Link</Button>
          </a>
          <Delete id={item.id} />
        </Space>
      ),
    },
  ]

  return (
    <Container>
      {packingList.name}
      <Space direction="vertical" style={{ width: '100%' }}>
        {itemsByCategory.map((itemList: any, i: number) => (
          <Card title={itemList[0].category.name}>
            <Table columns={columns} dataSource={itemList} pagination={false} />
          </Card>
        ))}

        <Button type="primary" onClick={() => toggle()}>
          Add item
        </Button>
      </Space>
      <Modal visible={newItemModalVisible} onCancel={() => toggle()} onOk={() => toggle()}>
        <NewItem listId={id} />
      </Modal>
    </Container>
  )
}

export default PackingLists
