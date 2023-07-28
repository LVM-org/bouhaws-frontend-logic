import { $api } from '../../services'
import { CombinedError } from 'urql'
import Common from './Common'
import  {
  MutationUploadImageArgs, 
} from '../../gql/graphql'  
import { Logic } from '..'

export default class Auth extends Common {
  constructor() {
    super() 
  }
  
  // 
  public UploadImagePayload: MutationUploadImageArgs = undefined

  // 
  public UploadImage = () => { 
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.upload
      .UploadImage(this.UploadImagePayload)
      .then((response) => { 
        console.log("UploadImage  response:::", response)
        Logic.Common.hideLoader() 
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      }) 
  } 
}
