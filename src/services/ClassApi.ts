import { BaseApiService } from './common/BaseService'
import { OperationResult } from 'urql'
import {
  BouhawsClass,
  BouhawsClassPaginator,
  MutationCreateBouhawsClassArgs,
  MutationUpdateBouhawsClassArgs,
} from '../gql/graphql'

export default class ClassApi extends BaseApiService {
  public GetBouhawsClasses = (page: number, first: number) => {
    const requestData = `
		query BouhawsClasses($page: Int!, $first: Int!) {
			GetBouhawsClasses(first: $first, page: $page) {
			  paginatorInfo {
				count
				currentPage
				firstItem
				hasMorePages
				lastItem
				perPage
				total
			  }
			  data {
				uuid
				id
				user {
				  uuid
				  name
				}
				title
				description
				created_at
			  }
			}
		  }
		`

    const response: Promise<OperationResult<{
      BouhawsClasses: BouhawsClassPaginator
    }>> = this.query(requestData, {
      page,
      first,
    })

    return response
  }

  public GetBouhawsClass = (uuid: string) => {
    const requestData = `
		query GetBouhawsClass($uuid: String!) {
			BouhawsClass(uuid: $uuid) {
			  id
			  uuid
			  user {
				name
				uuid
				profile {
				  photo_url
				}
			  }
			  description
			  created_at
			  projects {
				title
				end_date
				prize
				currency
				uuid
				description
				requirements
				photo_url
				type
				total_points
				category {
				  uuid
				  title
				}
				milestones {
				  uuid
				  title
				  points
				  index
				}
			  }
			}
		  }
		`

    const response: Promise<OperationResult<{
      BouhawsClass: BouhawsClass
    }>> = this.query(requestData, {
      uuid,
    })

    return response
  }

  public CreateClass = (data: MutationCreateBouhawsClassArgs) => {
    const requestData = `
	mutation CreateClass($description: String!, $title: String!) {
		CreateBouhawsClass(description: $description, title: $title) {
		  uuid
		  user {
			name
			uuid
		  }
		  title
		  description
		  created_at
		}
	  }
	`

    const response: Promise<OperationResult<{
      CreateClass: BouhawsClass
    }>> = this.mutation(requestData, data)

    return response
  }

  public UpdateClass = (data: MutationUpdateBouhawsClassArgs) => {
    const requestData = `
	mutation UpdateClass($bouhaws_class_uuid: String!, $description: String!, $projects_id: String!, $title: String!) {
		UpdateBouhawsClass(
		  bouhaws_class_uuid: $bouhaws_class_uuid
		  description: $description
		  projects_id: $projects_id
		  title: $title
		) {
		  uuid
		  user {
			name
			uuid
		  }
		  title
		  description
		  created_at
		}
	  }
		`

    const response: Promise<OperationResult<{
      UpdateClass: BouhawsClass
    }>> = this.mutation(requestData, data)

    return response
  }
}
