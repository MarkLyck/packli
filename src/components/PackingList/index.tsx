import { useState } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { useToggle } from 'ahooks'
import { Table, Typography, message, Button, Space, Modal } from 'antd'
import { PACKING_LIST } from 'src/common/queries'
import CategoryIcon from 'src/components/CategoryIcon'
import NewItem from './NewItem'
import Delete from './Delete'
import WeightRender from './WeightRender'
import SizeRender from './SizeRender'
import { numberFormatter } from 'src/common/utils/formatters'

const { Text, Title } = Typography

const CategoryTitle = styled(Title)`
  margin-top: 24px;
  text-transform: capitalize;
`

const Container = styled.div`
  padding: 32px;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  background-color: ${(p) => p.theme.palette.neutral[300]};
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
      render: (value: number) => {
        if (!value) return null

        return <WeightRender weight={value} />
      },
    },
    {
      title: 'Size (litres)',
      dataIndex: 'size',
      key: 'size',
      width: 160,
      render: (_: string, item: any) => <SizeRender height={item.height} width={item.width} depth={item.depth} />,
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
            <CategoryTitle level={4}>
              <CategoryIcon category={itemList[0].category.name} />
              {itemList[0].category.name}
            </CategoryTitle>
            <Table
              columns={columns}
              dataSource={itemList}
              pagination={false}
              rowKey="id"
              summary={(pageData) => {
                let totalWeight = 0
                let totalPrice = 0
                let totalItems = 0
                let totalLitres = 0

                pageData.forEach((item) => {
                  totalItems += item.quantity
                  totalWeight += item.weight * item.quantity
                  totalPrice += item.price * item.quantity
                  totalLitres += ((item.height * item.width * item.depth) / 1000) * item.quantity
                })

                return (
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>
                      {totalItems} item{totalItems !== 1 ? 's' : ''}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>{numberFormatter.format(totalWeight)}g</Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>
                      {numberFormatter.format(Number(totalLitres.toFixed(2)))}l
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={4}>${totalPrice.toFixed(2)}</Table.Summary.Cell>
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
        <NewItem
          listId={id}
          item={editItem}
          onSuccess={() => {
            window.setTimeout(() => toggleModal(), 100)
          }}
        />
      </Modal>
    </Container>
  )
}

export default PackingLists
