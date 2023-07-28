import { $api } from '../../services'
import { CombinedError } from 'urql'
import Common from './Common'
import {
  MutationCreateCourseArgs,
  MutationUpdateCourseArgs,
} from '../../gql/graphql'
import { Logic } from '..'

export default class Course extends Common {
  constructor() {
    super()
  }

  //
  public CreateCoursePayload: MutationCreateCourseArgs = {
    bouhaws_class_id: 0,
    code: '',
    photo_url: '',
    title: '',
  }
  public UpdateCoursePayload: MutationUpdateCourseArgs = {
    course_uuid: '',
    code: '',
    photo_url: '',
    status: '',
    title: '',
  }

  //
  public CreateCourse = () => {
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.course
      .CreateCourse(this.CreateCoursePayload)
      .then((response) => {
        console.log('CreateCourse response:::', response)
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  //
  public UpdateCourse = () => {
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.course
      .UpdateCourse(this.UpdateCoursePayload)
      .then((response) => {
        console.log('UpdateCourse response:::', response)
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }
}
