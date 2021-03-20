import styled from '@emotion/styled'
import { transparentize } from 'polished'
import { numberFormatter } from 'src/common/utils/formatters'
const Container = styled.div`
  display: flex;
  align-items: center;
`

const Indicator = styled.div`
  height: 16px;
  width: 16px;
  background: ${(p: any) => transparentize(0.75, p.theme.palette[p.color][600])};
  border: 2px solid ${(p: any) => p.theme.palette[p.color][600]};
  border-radius: 4px;
  margin-right: 6px;
`

type WeightRenderProps = {
  weight: number
}

const WeightRender = ({ weight }: WeightRenderProps) => {
  let color = 'success'
  if (weight > 150) color = 'warning'
  if (weight > 500) color = 'danger'

  return (
    <Container>
      <Indicator color={color} />
      {numberFormatter.format(weight)}g
    </Container>
  )
}

export default WeightRender
