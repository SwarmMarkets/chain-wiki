import { redirect } from 'next/navigation'
import Routes from 'src/shared/consts/routes'

export default async function Page() {
  redirect(Routes.manager.home)
}
