import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CategoryIcon = ({ category }: { category: string }) => {
  console.log('🔈 ~ category', category)
  let icon = ''
  if (category === 'backpacks') icon = 'backpack'
  if (category === 'suitcase') icon = 'suitcase-rolling'
  if (category === 'organization') icon = 'sitemap'
  if (category === 'electronics') icon = 'plug'
  if (category === 'toiletries') icon = 'toothbrush'
  if (category === 'camera') icon = 'camera-retro'
  if (category === 'tops') icon = 'tshirt'
  if (category === 'accessories') icon = 'scarf'

  // @ts-ignore
  return <FontAwesomeIcon icon={['fad', icon]} style={{ marginRight: 8 }} />
}

export default CategoryIcon
