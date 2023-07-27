import { BaseApiService } from './common/BaseService'
import { OperationResult } from 'urql'  

export default class AuthApi extends BaseApiService {
  public UserWallet = (data) => {
	const requestData = `
		query UserWallet ()  {
			UserWallet (){ 
				created_at
				debited_amount
				credited_amount
				total_balance
				id
				updated_at
			}
		}
	`

    const response: Promise<OperationResult<{
      UserWallet: any
    }>> = this.query(requestData, data) 
 
    return response
  } 
}
