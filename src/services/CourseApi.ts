import { BaseApiService } from './common/BaseService'
import { OperationResult } from 'urql' 
import {
  MutationCreateCourseArgs, 
  MutationUpdateCourseArgs 
} from '../gql/graphql'

export default class AuthApi extends BaseApiService {
  public CreateCourse = (data: MutationCreateCourseArgs) => {
    const requestData = `
		mutation CreateCourse (
			$bouhaws_class_id: Int!,
			$code: String!, 
			$photo_url: String!,  
			$title: String!
		) {
			CreateCourse (
				bouhaws_class_id: $bouhaws_class_id, 
				code: $code, 
				photo_url: $photo_url, 
				title: $title
			) {
				title
			}
		}
		`

    const response: Promise<OperationResult<{
      CreateCourse: any
    }>> = this.mutation(requestData, data)

    return response
  }

  public UpdateCourse = (data: MutationUpdateCourseArgs) => {
    const requestData = `
		mutation UpdateCourse(
			$course_uuid: String!, 
			$code: String!, 
			$photo_url: Upload!, 
			$status: String!, 
			$title: String!
		) {
			UpdateCourse(
				course_uuid: $course_uuid, 
				code: $code, 
				photo_url: $photo_url, 
				status: $status, 
				title: $title
			) {
				code
			}
		}
	`

    const response: Promise<OperationResult<{
      UpdateCourse: any
    }>> = this.mutation(requestData, data)

    return response
  } 
 
}
