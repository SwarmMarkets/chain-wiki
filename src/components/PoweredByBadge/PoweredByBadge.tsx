import { useTranslation } from 'react-i18next'

const PoweredByBadge = () => {
  const { t } = useTranslation('layout')
  return (
    <div>
      <div>{t('Powered by')}</div>
      <img className='w-40' src='/assets/logo.png' alt='Chain Wiki' />
    </div>
  )
}

export default PoweredByBadge
