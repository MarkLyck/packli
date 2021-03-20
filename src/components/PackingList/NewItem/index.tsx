import { useState, useEffect } from 'react'
import { Form, Input, InputNumber, Button, Select, Space } from 'antd'
import { useQuery, useMutation } from '@apollo/client'
import { CREATE_ITEM, UPDATE_ITEM, CATEGORIES } from 'src/common/queries'
import CategoryIcon from 'src/components/CategoryIcon'

const { Option } = Select

type NewItemProps = {
  listId: string
  item?: any
  onSuccess: () => void
}

type WeightTypeType = 'grams' | 'kg' | 'ounces'
type MeasureTypeType = 'cm' | 'inches'

const getWeightInGrams = (weight: number, type: WeightTypeType) => {
  if (isNaN(weight)) return weight
  if (type === 'grams') return Math.round(weight)
  if (type === 'kg') return Math.round(weight * 1000)
  if (type === 'ounces') return Math.round(weight * 28.3495)
  if (type === 'pounds') return Math.round(weight * 453.592)
}

const getMeasurementInCentimeters = (measurement: number, type: MeasureTypeType) => {
  if (isNaN(measurement)) return measurement
  if (type === 'cm') return measurement
  if (type === 'inches') return measurement * 2.54
}

const NewItem = ({ listId, item, onSuccess }: NewItemProps) => {
  const [form] = Form.useForm()
  const [weightType, setWeightType] = useState<WeightTypeType>('grams')
  const [measureType, setMeasureType] = useState<MeasureTypeType>('cm')

  const { data, loading: categoriesLoading } = useQuery(CATEGORIES)
  const [createItem, { loading: createLoading }] = useMutation(CREATE_ITEM, {
    refetchQueries: ['PACKING_LIST'],
    onCompleted: onSuccess,
  })
  const [updateItem, { loading: updateLoading }] = useMutation(UPDATE_ITEM, {
    refetchQueries: ['PACKING_LIST'],
    onCompleted: onSuccess,
  })

  useEffect(() => {
    form.resetFields()
  }, [item])

  const categories = data?.categoriesList?.items || []

  const onFinish = (values: any) => {
    if (item) {
      updateItem({
        variables: {
          id: item.id,
          listId,
          ...values,
          weight: getWeightInGrams(values.weight, weightType),
          height: getMeasurementInCentimeters(values.height, measureType),
          width: getMeasurementInCentimeters(values.width, measureType),
          depth: getMeasurementInCentimeters(values.depth, measureType),
        },
      })
    } else {
      createItem({
        variables: {
          listId,
          ...values,
          weight: getWeightInGrams(values.weight, weightType),
          height: getMeasurementInCentimeters(values.height, measureType),
          width: getMeasurementInCentimeters(values.width, measureType),
          depth: getMeasurementInCentimeters(values.depth, measureType),
        },
      })
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  let initialValues: any = {
    quantity: 1,
  }

  if (item) {
    initialValues = { ...item }
    initialValues.category = item.category.id
  }

  return (
    <Form
      form={form}
      layout="vertical"
      name="basic"
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input name' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Description" name="description" rules={[{ required: false }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select a category' }]}>
        <Select placeholder="Please select a category" showSearch optionFilterProp="key" loading={categoriesLoading}>
          {categories.map((category: any) => (
            <Option key={category.name} value={category.id}>
              <CategoryIcon category={category.name} />
              {category.name.cap()}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Space>
        <Form.Item label="Weight" name="weight" rules={[{ required: false }]}>
          <InputNumber />
        </Form.Item>
        <Select value={weightType} onChange={setWeightType}>
          <Option value="grams">grams</Option>
          <Option value="kg">kg</Option>
          <Option value="ounces">Ounces</Option>
          <Option value="pounds">Pounds</Option>
        </Select>
      </Space>

      <Space>
        <Form.Item label="Width" name="width" rules={[{ required: false }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Height" name="height" rules={[{ required: false }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Depth" name="depth" rules={[{ required: false }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Select value={measureType} onChange={setMeasureType}>
          <Option value="cm">cm</Option>
          <Option value="inches">inches</Option>
        </Select>
      </Space>

      <Form.Item label="URL" name="uRL" rules={[{ required: false }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Price" name="price" rules={[{ required: false }]}>
        {/* @ts-ignore */}
        <InputNumber
          min={0}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          // @ts-ignore
          parser={(value: string) => value.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>

      <Form.Item label="Quantity" name="quantity" rules={[{ required: true }]}>
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={createLoading || updateLoading}>
          {item ? 'Update item' : 'Add item'}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default NewItem
