import { $api } from '../../services'
import { CombinedError } from 'urql'
import Common from './Common'
import  {
  MutationCreateBouhawsClassArgs,
  MutationUpdateBouhawsClassArgs,
  QueryBouhawsClassArgs,
  QueryGetBouhawsClassesArgs 
} from '../../gql/graphql'  
import { Logic } from '..'

export default class Auth extends Common {
  constructor() {
    super() 
  }
  
  // 
  public CreateClassPayload: MutationCreateBouhawsClassArgs = { 
    description: '',
    title: '', 
  }  
  public UpdateClassPayload: MutationUpdateBouhawsClassArgs = { 
    description: '',
    title: '', 
    projects_id: '', 
    bouhaws_class_uuid: '', 
  }  

  public BouhawsClass: any =  {}
  public ClassPayload: QueryBouhawsClassArgs =  undefined
  public BouhawsClassesPayload: QueryGetBouhawsClassesArgs =  undefined
  public AllBouhawsClasses: any =  []


  // 
  public GetBouhawsClasses = () => {  
    $api.class
      .GetBouhawsClasses(this.BouhawsClassesPayload)
      .then((response) => { 
        console.log("GetBouhawsClasses response:::", response)
        this.AllBouhawsClasses = response.data?.GetBouhawsClasses?.data
        Logic.Common.hideLoader() 
      }) 
      .catch((error: CombinedError) => { 
        console.log("error", error) 
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      }) 
  }

  // 
  public GetBouhawsClass = () => {  
    $api.class
      .BouhawsClass(this.ClassPayload)
      .then((response) => { 
        console.log("BouhawsClass response:::", response)
        this.BouhawsClass = response.data?.BouhawsClass
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => { 
        console.log("error", error)
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      }) 
  }

  // 
  public CreateClass = () => { 
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.class
      .CreateClass(this.CreateClassPayload)
      .then((response) => { 
        console.log("CreateClass  response:::", response)
        Logic.Common.hideLoader() 
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      }) 
  }

  // 
  public UpdateClass = () => { 
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.class
      .UpdateClass(this.UpdateClassPayload)
      .then((response) => { 
        console.log("UpdateClass  response:::", response)
        Logic.Common.hideLoader() 
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }
}
