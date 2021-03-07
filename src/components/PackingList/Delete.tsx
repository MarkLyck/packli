import { Button } from 'antd'
import { useMutation } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DELETE_ITEM } from 'src/common/queries'

type DeleteProps = {
  id: string
}

const Delete = ({ id }: DeleteProps) => {
  const [deleteItem] = useMutation(DELETE_ITEM, {
    refetchQueries: ['PACKING_LIST'],
  })

  const onclick = () => {
    deleteItem({ variables: { id } })
  }

  return (
    <Button danger onClick={onclick}>
      <FontAwesomeIcon icon={['far', 'trash']} />
    </Button>
  )
}

export default Delete
