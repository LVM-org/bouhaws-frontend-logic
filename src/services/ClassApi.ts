import { BaseApiService } from './common/BaseService'
import { OperationResult } from 'urql'
import {
  MutationCreateBouhawsClassArgs,
  MutationUpdateBouhawsClassArgs 
} from '../gql/graphql'

export default class AuthApi extends BaseApiService {
  public CreateClass = (data: MutationCreateBouhawsClassArgs) => {
    const requestData = `
		mutation CreateClass(
			$description: String!,
			$title: String!
		) {
			CreateClass(
				description: $description,
				title: $title
			) {
				description
			}
		}
	`

    const response: Promise<OperationResult<{
      CreateClass: any
    }>> = this.mutation(requestData, data)

    return response
  }

  public UpdateClass = (data: MutationUpdateBouhawsClassArgs) => {
    const requestData = `
		mutation UpdateClass(
			$bouhaws_class_uuid: String!, 
			$description: String!, 
			$projects_id: String!, 
			$title: String!
		) {
			UpdateClass(
				bouhaws_class_uuid: $bouhaws_class_uuid, 
				description: $description, 
				projects_id: $projects_id, 
				title: $title
			) {
				description
			}
		}
		`

    const response: Promise<OperationResult<{
      UpdateClass: any
    }>> = this.mutation(requestData, data)

    return response
  } 
}
