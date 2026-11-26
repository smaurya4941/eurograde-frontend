import { LanguageCoursePage, italianCourse } from '@/features/language-courses'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function ItalianLanguagePage() {
  usePageTitle(italianCourse.pageTitle)
  return <LanguageCoursePage content={italianCourse} />
}
