import styled from '@emotion/styled'
import { transparentize } from 'polished'

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

type SizeRenderProps = {
  width: number
  height: number
  depth: number
}

const SizeRender = ({ width, height, depth }: SizeRenderProps) => {
  if (isNaN(width) || isNaN(height) || isNaN(depth)) return null
  if (width === null || height === null || depth === null) return null

  const litres = (width * height * depth) / 1000

  let color = 'success'
  if (litres > 1) color = 'warning'
  if (litres > 2) color = 'danger'

  return (
    <Container>
      <Indicator color={color} />
      {litres.toFixed(2)}l
    </Container>
  )
}

export default SizeRender
