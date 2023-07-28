import { $api } from '../../services'
import { CombinedError } from 'urql'
import Common from './Common' 
import { Logic } from '..'
 
export default class Auth extends Common {
  constructor() {
    super() 
  }
   

  // 
  public UserWallet = () => { 
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.wallet
      .UserWallet("")
      .then((response) => {
        console.log("UserWallet response:::", response)
        Logic.Common.hideLoader() 
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }
}
