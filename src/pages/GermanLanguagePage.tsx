import { LanguageCoursePage, germanCourse } from '@/features/language-courses'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function GermanLanguagePage() {
  usePageTitle(germanCourse.pageTitle)
  return <LanguageCoursePage content={germanCourse} />
}
