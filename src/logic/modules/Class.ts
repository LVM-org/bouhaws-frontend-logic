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
  public ManyBouhawsClass: BouhawsClassPaginator | undefined
  public EachBouhawsClass: BouhawsClassModel | undefined

  // Mutation payloads
  public CreateClassPayload: MutationCreateBouhawsClassArgs | undefined
  public UpdateClassPayload: MutationUpdateBouhawsClassArgs | undefined

  // Queries
  public GetClasses = (page: number, first: number) => {
    return $api.class.GetBouhawsClasses(page, first).then((response) => {
      this.ManyBouhawsClass = response.data?.GetBouhawsClasses
      return response.data?.GetBouhawsClasses
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
    })

    if (this.CreateClassPayload) {
      return $api.class
        .CreateClass(this.CreateClassPayload)
        .then((response) => {
          this.EachBouhawsClass = response.data?.CreateBouhawsClass

          Logic.Common.showLoader({
            loading: false,
            show: true,
            message: `Class was successfully created!`,
            type: 'success',
          })
          return response.data?.CreateBouhawsClass
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }

  public UpdateClass = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    if (this.UpdateClassPayload) {
      return $api.class
        .UpdateClass(this.UpdateClassPayload)
        .then((response) => {
          this.EachBouhawsClass = response.data?.UpdateBouhawsClass
          Logic.Common.hideLoader()
          return response.data?.UpdateBouhawsClass
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }
}
