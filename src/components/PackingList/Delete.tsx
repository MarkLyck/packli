import { Button } from 'antd'

type DeleteProps = {
  id: string
}

const Delete = ({ id }: DeleteProps) => {
  const onclick = () => {
    console.log('delete', id)
  }

  return (
    <Button danger onClick={onclick}>
      Delete
    </Button>
  )
}

export default Delete
