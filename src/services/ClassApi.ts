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
					name
					username
					uuid
					profile {
					  photo_url
					}
				}
				title
				description
				created_at
				projects {
					id
				}
				students {
					id
					uuid
				}
			  }
			}
		  }
		`

    const response: Promise<OperationResult<{
      GetBouhawsClasses: BouhawsClassPaginator
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
			  title
			  user {
				name
				username
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
				user{
					uuid
					name
					username
					profile{
					  photo_url
					}
				  }
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
			  students {
				name
				username
				uuid
				profile {
				  photo_url
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
			username
			uuid
			profile {
			  photo_url
			}
		  }
		  title
		  description
		  created_at
		}
	  }
	`

    const response: Promise<OperationResult<{
      CreateBouhawsClass: BouhawsClass
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
			username
			uuid
			profile {
			  photo_url
			}
		  }
		  title
		  description
		  created_at
		}
	  }
		`

    const response: Promise<OperationResult<{
      UpdateBouhawsClass: BouhawsClass
    }>> = this.mutation(requestData, data)

    return response
  }
}
