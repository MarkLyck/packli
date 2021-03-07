import { Form, Input, InputNumber, Button, Select, Space } from 'antd'
import { useQuery, useMutation } from '@apollo/client'
import { CREATE_ITEM, CATEGORIES } from 'src/common/queries'

type NewItemProps = {
  listId: string
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

const NewItem = ({ listId }: NewItemProps) => {
  const { data } = useQuery(CATEGORIES)
  const [createItem] = useMutation(CREATE_ITEM)

  const categories = data?.categoriesList?.items || []

  const onFinish = (values: any) => {
    createItem({
      variables: {
        listId,
        ...values,
      },
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input name!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Description" name="description" rules={[{ required: false }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Category" name="category">
        <Select placeholder="Please select a category" showSearch optionFilterProp="key">
          {categories.map((category: any) => (
            <Select.Option key={category.name} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Weight" name="weight" rules={[{ required: false }]}>
        <InputNumber />
      </Form.Item>
      <Space>
        <Form.Item label="Height" name="height" rules={[{ required: false }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="Width" name="width" rules={[{ required: false }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="Depth" name="depth" rules={[{ required: false }]}>
          <InputNumber />
        </Form.Item>
      </Space>

      <Form.Item label="URL" name="uRL" rules={[{ required: false }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Price" name="price" rules={[{ required: false }]}>
        <InputNumber />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Add item
        </Button>
      </Form.Item>
    </Form>
  )
}

export default NewItem
