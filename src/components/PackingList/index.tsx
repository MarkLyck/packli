import { useState } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { useToggle } from 'ahooks'
import { Table, Typography, message, Button, Space, Modal } from 'antd'
import { PACKING_LIST } from 'src/common/queries'
import NewItem from './NewItem'
import Delete from './Delete'

const { Text, Title } = Typography

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
  const [newItemModalVisible, { toggle: toggleModal }] = useToggle()
  const [editItem, setEditItem] = useState(null)
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
      width: 400,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 400,
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
      width: 160,
      render: (value: string) => {
        if (!value) return null

        return <Text>{value}g</Text>
      },
    },
    {
      title: 'Size (cm)',
      dataIndex: 'size',
      key: 'size',
      width: 160,
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
      width: 160,
      render: (value: string) => {
        if (!value) return null

        return <Text>${value}</Text>
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 160,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_: string, item: any) => {
        return (
          <Space>
            <a href={item.uRL}>
              <Button disabled={item.uRL ? false : true}>Link</Button>
            </a>
            <Button
              type="primary"
              onClick={() => {
                setEditItem(item)
                toggleModal()
              }}
            >
              Edit
            </Button>
            <Delete id={item.id} />
          </Space>
        )
      },
    },
  ]

  return (
    <Container>
      <Title level={2}>{packingList.name}</Title>
      <Space direction="vertical" style={{ width: '100%' }}>
        {itemsByCategory.map((itemList: any) => (
          <Space key={itemList[0].category.name} direction="vertical" style={{ width: '100%' }}>
            <Title level={4}>{itemList[0].category.name}</Title>
            <Table
              columns={columns}
              dataSource={itemList}
              pagination={false}
              rowKey="id"
              summary={(pageData) => {
                console.log('🔈 ~ pageData', pageData)

                let totalWeight = 0
                let totalPrice = 0
                let totalItems = 0

                pageData.forEach((item) => {
                  totalItems += item.quantity
                  totalWeight += item.weight * item.quantity
                  totalPrice += item.price * item.quantity
                })

                return (
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>
                      {totalItems} item{totalItems !== 1 ? 's' : ''}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>{totalWeight}g</Table.Summary.Cell>
                    <Table.Summary.Cell index={3}></Table.Summary.Cell>
                    <Table.Summary.Cell index={4}>${totalPrice}</Table.Summary.Cell>
                  </Table.Summary.Row>
                )
              }}
            />
          </Space>
        ))}

        <Button
          type="primary"
          onClick={() => {
            setEditItem(null)
            toggleModal()
          }}
        >
          Add item
        </Button>
      </Space>
      <Modal visible={newItemModalVisible} onCancel={() => toggleModal()} onOk={() => toggleModal()}>
        <NewItem listId={id} item={editItem} onSuccess={() => toggleModal()} />
      </Modal>
    </Container>
  )
}

export default PackingLists
