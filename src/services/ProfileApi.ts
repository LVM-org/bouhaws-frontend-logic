import { BaseApiService } from './common/BaseService'
import { OperationResult } from 'urql'
import {
  MutationUpdateProfileArgs, 
} from '../gql/graphql'

export default class AuthApi extends BaseApiService {
  public UpdateProfile = (data: MutationUpdateProfileArgs) => {
    const requestData = `
		mutation UpdateProfile(
				$bio: String!, 
				$name: String!, 
				$photo_url: Upload!, 
				$push_notification_enabled: Boolean!,  
				$school: String!, 
				$student_number: String!, 
				$type: String!, 
				$username: String!, 
				$year_of_enrollment: String!
			) {
			UpdateProfile(
				bio: $bio, 
				name: $name, 
				photo_url: $photo_url, 
				push_notification_enabled: $push_notification_enabled, 
				school: $school, 
				student_number: $student_number, 
				type: $type, 
				username: $username, 
				year_of_enrollment: $year_of_enrollment,
			) {
				username
			}
		}
	`

    const response: Promise<OperationResult<{
      UpdateProfile: any
    }>> = this.mutation(requestData, data)

    return response
  }
}
