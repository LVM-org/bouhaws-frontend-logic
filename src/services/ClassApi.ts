import { BaseApiService } from './common/BaseService'
import { OperationResult } from 'urql'
import {
  MutationCreateBouhawsClassArgs,
  MutationUpdateBouhawsClassArgs,
  QueryBouhawsClassArgs,
  QueryGetBouhawsClassesArgs
} from '../gql/graphql'

export default class AuthApi extends BaseApiService { 
  public BouhawsClass = (data: QueryBouhawsClassArgs) => {
	const requestData = `
		query BouhawsClass ($uuid: String!)  {
			BouhawsClass (uuid: $uuid){ 
				created_at
				description
				id
				title
				updated_at
			}
		}
	`

    const response: Promise<OperationResult<{
      BouhawsClass: any
    }>> = this.query(requestData, data) 
 
    return response
  }
  
  public GetBouhawsClasses = (data: QueryGetBouhawsClassesArgs) => {
	const requestData = `
		query GetBouhawsClasses ($first: Int!, page: Int!)  {
			GetBouhawsClasses (first: $first, page: $page){ 
				data {
					created_at
					description
					id
					title
					updated_at
					uuid
				}
				paginatorInfo {
					count
					currentPage
					firstItem
					hasMorePages    
					lastPage
					lastItem
					total
					perPage
				}
			}
		}
	`

    const response: Promise<OperationResult<{
      GetBouhawsClasses: any
    }>> = this.query(requestData, data) 
 
    return response
  } 

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
