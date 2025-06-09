import { useTranslation } from 'react-i18next'
import SettingCard from '../../SettingCard'
import IntegrationForm from './IntegrationForm'

const IntegrationSetting = () => {
  const { t } = useTranslation('nft', { keyPrefix: 'settings' })

  return (
    <SettingCard
      title={t('import.title')}
      subtitle={t('import.subtitle')}
      description={
        <div>
          <div>{t('import.description')}</div>
          <div className='mt-1.5'>
            <div>{t('import.instructions.title')}</div>
            <ol className='list-decimal list-inside mt-2 space-y-1'>
              <li>
                {t('import.instructions.steps.sync')}
                <a
                  href='https://gitbook.com/docs/getting-started/git-sync/enabling-github-sync'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 hover:text-primary'
                >
                  https://gitbook.com/docs/getting-started/git-sync/enabling-github-sync
                </a>
              </li>
              <li>{t('import.instructions.steps.public')}</li>
            </ol>
          </div>
        </div>
      }
    >
      <IntegrationForm />
    </SettingCard>
  )
}

export default IntegrationSetting
