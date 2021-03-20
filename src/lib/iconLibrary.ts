import { library } from '@fortawesome/fontawesome-svg-core'

// Regular
import { faTrash as farTrash } from '@fortawesome/pro-regular-svg-icons'

// Solid
// import { faSearch } from '@fortawesome/pro-solid-svg-icons'

// duoTone
import {
  faBackpack as fadBackpack,
  faCameraRetro as fadCameraRetro,
  faPlug as fadPlug,
  faScarf as fadScarf,
  faSitemap as fadSitemap,
  faSocks as fadSocks,
  faSuitcaseRolling as fadSuitcaseRolling,
  faToothbrush as fadToothbrush,
  faTshirt as fadTshirt,
} from '@fortawesome/pro-duotone-svg-icons'

// brands

library.add(
  // Regular
  farTrash,
  // Duo
  fadBackpack,
  fadCameraRetro,
  fadPlug,
  fadScarf,
  fadSitemap,
  fadSocks,
  fadSuitcaseRolling,
  fadToothbrush,
  fadTshirt
)
