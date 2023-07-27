import { $api } from '../../services'
import { CombinedError } from 'urql'
import Common from './Common'
import  {
  MutationUpdateProfileArgs,  
} from '../../gql/graphql'  
import { Logic } from '..'
 
export default class Auth extends Common {
  constructor() {
    super() 
  }
  
  // 
  public UpdateProfilePayload: MutationUpdateProfileArgs = { 
    bio: '', 
    name: '', 
    photo_url: '', 
    push_notification_enabled: false,
    school: '', 
    student_number: '', 
    type: '', 
    username: '', 
    year_of_enrollment: ''
  } 

  // 
  public UpdateProfile = () => { 
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.profile
      .UpdateProfile(this.UpdateProfilePayload)
      .then((response) => {
        console.log("UpdateProfile response:::", response)
        Logic.Common.hideLoader() 
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

//   public GetProject = (variant_uuid: string) => {
//     return $api.project
//       .GetProject(variant_uuid, parseInt(Logic.Auth.AuthUser?.id || '0'))
//       .then((response) => {
//         this.Project = response.data?.ProjectVariant
//       })
//   }
}
