import { BaseApiService } from './common/BaseService'
import { OperationResult } from 'urql'
import { MutationUploadImageArgs } from '../gql/graphql'

export default class AuthApi extends BaseApiService {
  public UploadImage = (data: MutationUploadImageArgs) => {
    const requestData = `
		mutation UploadImage( 
				$image: Upload!,  
			) {
			UploadImage( 
				image: $image,  
			) 
		}
		`

    const response: Promise<OperationResult<{
      UploadImage: String
    }>> = this.mutation(requestData, data)

    return response
  }
}
