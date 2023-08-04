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
  public ManyCourses: CoursePaginator
  public EachCourse: CourseModel

  // Mutation payloads
  public CreateCoursePayload: MutationCreateCourseArgs
  public UpdateCoursePayload: MutationUpdateCourseArgs

  // Queries
  public GetCourses = (page: number, first: number) => {
    return $api.course.GetCourses(page, first).then((response) => {
      this.ManyCourses = response.data?.Courses
      return response.data?.Courses
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
      show: true,
      useModal: true,
    })
    $api.course
      .CreateCourse(this.CreateCoursePayload)
      .then((response) => {
        this.EachCourse = response.data.CreateCourse
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  public UpdateCourse = () => {
    Logic.Common.showLoader({
      loading: true,
      show: true,
      useModal: true,
    })
    $api.course
      .UpdateCourse(this.UpdateCoursePayload)
      .then((response) => {
        this.EachCourse = response.data.UpdateCourse
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }
}
