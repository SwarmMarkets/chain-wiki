'use client'

import Settings from 'src/components/Settings/Settings'
import Fade from 'src/components/ui-kit/Animations/Fade'
import { AnimatePresence } from 'framer-motion'

const NftSettingsPage = () => {
  return (
    <AnimatePresence>
      <Fade>
        <div>
          <Settings />
        </div>
      </Fade>
    </AnimatePresence>
  )
}
export default NftSettingsPage
