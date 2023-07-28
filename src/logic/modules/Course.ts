import { $api } from '../../services'
import { CombinedError } from 'urql'
import Common from './Common'
import  {
  MutationCreateCourseArgs, 
  MutationUpdateCourseArgs,
  QueryCourseArgs,
  QueryGetCoursesArgs
} from '../../gql/graphql'  
import { Logic } from '..'

export default class Auth extends Common {
  constructor() {
    super() 
  }
  
  // 
  public CreateCoursePayload: MutationCreateCourseArgs = { 
    bouhaws_class_id: 0,
    code: '', 
    photo_url: '',  
    title: ''
  }  
  public UpdateCoursePayload: MutationUpdateCourseArgs = { 
    course_uuid: '', 
    code: '', 
    photo_url: '', 
    status: '', 
    title: ''
  }   
  public Course: any =  {}
  public CoursePayload: QueryCourseArgs =  undefined
  public GetCoursesPayload: QueryGetCoursesArgs =  undefined
  public AllCourses: any =  []


  // 
  public GetCourses = () => {  
    console.log(43)
    $api.course
      .GetCourses(this.GetCoursesPayload)
      .then((response) => { 
        console.log("GetCourses response:::", response)
        this.AllCourses = response.data?.GetCourses?.data
        Logic.Common.hideLoader() 
      })
      .catch((error: CombinedError) => {
        console.log(5623928923)
        console.log("error", error)
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      }) 
  }

  // 
  public GetCourse = () => {  
    console.log(43)
    $api.course
      .Course(this.CoursePayload)
      .then((response) => { 
        console.log("Course response:::", response)
        this.Course = response.data?.Course
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => { 
        console.log("error", error)
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      }) 
  }

  // 
  public CreateCourse = () => { 
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.course
      .CreateCourse(this.CreateCoursePayload)
      .then((response) => { 
        console.log("CreateCourse response:::", response)
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
        console.log("UpdateCourse response:::", response)
        Logic.Common.hideLoader() 
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      }) 
  }
  
}
