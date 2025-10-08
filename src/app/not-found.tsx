import { redirect } from 'next/navigation'
import Routes from 'src/shared/consts/routes'

export default function NotFoundPage() {
  redirect(Routes.manager.home)
}
