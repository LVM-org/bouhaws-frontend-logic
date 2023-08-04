import AuthApi from './AuthApi'
import ProjectApi from './ProjectApi'
import ClassApi from './ClassApi'
import CourseApi from './CourseApi'
import ProfileApi from './ProfileApi'
import ConversationApi from './ConversationApi'
import UploadApi from './UploadApi'

export const $api = {
  auth: new AuthApi(),
  project: new ProjectApi(),
  class: new ClassApi(),
  course: new CourseApi(),
  profile: new ProfileApi(),
  conversation: new ConversationApi(),
  upload: new UploadApi(),
}
