import { BaseApiService } from './common/BaseService'
import { OperationResult } from 'urql'
import {
  Course,
  CoursePaginator,
  MutationCreateCourseArgs,
  MutationUpdateCourseArgs,
} from '../gql/graphql'

export default class CourseApi extends BaseApiService {
  public GetCourses = (page: number, first: number) => {
    const requestData = `
		query Courses($page: Int!, $first: Int!) {
			GetCourses(first: $first, page: $page) {
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
				id
				uuid
				code
				title
				photo_url
				created_at
			  }
			}
		  }
		`

    const response: Promise<OperationResult<{
      Courses: CoursePaginator
    }>> = this.query(requestData, {})

    return response
  }

  public GetCourse = (uuid: string) => {
    const requestData = `
		query Course($uuid: String!) {
			Course(uuid: $uuid) {
			  id
			  uuid
			  code
			  title
			  photo_url
			  status
			  created_at
			  bouhaws_class {
				title
			  }
			}
		  }
			`

    const response: Promise<OperationResult<{
      Course: Course
    }>> = this.query(requestData, {
      uuid,
    })

    return response
  }

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
				id
				uuid
				code
				title
				photo_url
				status
				created_at
				bouhaws_class {
				  title
				}
			}
		}
		`

    const response: Promise<OperationResult<{
      CreateCourse: Course
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
				id
				uuid
				code
				title
				photo_url
				status
				created_at
				bouhaws_class {
				  title
				}
			}
		}
	`

    const response: Promise<OperationResult<{
      UpdateCourse: Course
    }>> = this.mutation(requestData, data)

    return response
  }
}
