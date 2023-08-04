import { $api } from '../../services'
import { CombinedError } from 'urql'
import Common from './Common'
import {
  BouhawsClassPaginator,
  MutationCreateBouhawsClassArgs,
  MutationUpdateBouhawsClassArgs,
  BouhawsClass as BouhawsClassModel,
} from '../../gql/graphql'
import { Logic } from '..'

export default class BouhawsClass extends Common {
  constructor() {
    super()
  }

  // Base variables
  public ManyBouhawsClass: BouhawsClassPaginator
  public EachBouhawsClass: BouhawsClassModel

  // Mutation payloads
  public CreateClassPayload: MutationCreateBouhawsClassArgs
  public UpdateClassPayload: MutationUpdateBouhawsClassArgs

  // Queries
  public GetClasses = (page: number, first: number) => {
    return $api.class.GetBouhawsClasses(page, first).then((response) => {
      this.ManyBouhawsClass = response.data?.BouhawsClasses
      return response.data?.BouhawsClasses
    })
  }

  public GetClass = (uuid: string) => {
    return $api.class.GetBouhawsClass(uuid).then((response) => {
      this.EachBouhawsClass = response.data?.BouhawsClass
    })
  }

  // Mutations
  public CreateClass = () => {
    Logic.Common.showLoader({
      loading: true,
      show: true,
      useModal: true,
    })
    $api.class
      .CreateClass(this.CreateClassPayload)
      .then((response) => {
        this.EachBouhawsClass = response.data.CreateClass
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  public UpdateClass = () => {
    Logic.Common.showLoader({
      loading: true,
      show: true,
      useModal: true,
    })
    $api.class
      .UpdateClass(this.UpdateClassPayload)
      .then((response) => {
        this.EachBouhawsClass = response.data.UpdateClass
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }
}
