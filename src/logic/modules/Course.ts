import { $api } from '../../services'
import { CombinedError } from 'urql'
import Common from './Common'
import {
  MutationCreateCourseArgs,
  MutationUpdateCourseArgs,
  CoursePaginator,
  Course as CourseModel,
} from '../../gql/graphql'
import { Logic } from '..'

export default class Course extends Common {
  constructor() {
    super()
  }

  // Base variables
  public ManyCourses: CoursePaginator | undefined
  public EachCourse: CourseModel | undefined

  // Mutation payloads
  public CreateCoursePayload: MutationCreateCourseArgs | undefined
  public UpdateCoursePayload: MutationUpdateCourseArgs | undefined

  // Queries
  public GetCourses = (page: number, first: number) => {
    return $api.course.GetCourses(page, first).then((response) => {
      this.ManyCourses = response.data?.GetCourses
      return response.data?.GetCourses
    })
  }

  public GetCourse = (uuid: string) => {
    return $api.course.GetCourse(uuid).then((response) => {
      this.EachCourse = response.data?.Course
    })
  }

  // Mutations
  public CreateCourse = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    if (this.CreateCoursePayload) {
      return $api.course
        .CreateCourse(this.CreateCoursePayload)
        .then((response) => {
          this.EachCourse = response.data?.CreateCourse
          Logic.Common.hideLoader()
          return response.data?.CreateCourse
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }

  public UpdateCourse = () => {
    Logic.Common.showLoader({
      loading: true,
    })

    if (this.UpdateCoursePayload) {
      return $api.course
        .UpdateCourse(this.UpdateCoursePayload)
        .then((response) => {
          this.EachCourse = response.data?.UpdateCourse
          Logic.Common.hideLoader()
          return response.data?.UpdateCourse
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }
}
