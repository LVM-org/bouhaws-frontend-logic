import { $api } from '../../services'
import { CombinedError } from 'urql'
import Common from './Common'
import {
  MutationUpdateProfileArgs,
  Profile as ProfileModel,
  User,
} from '../../gql/graphql'
import { Logic } from '..'

export default class Profile extends Common {
  constructor() {
    super()
  }

  // Base variables
  public UserProfile: ProfileModel
  public LeaderboardUsers: User[]

  // Mutation payloads
  public UpdateProfilePayload: MutationUpdateProfileArgs

  // Queries
  public GetLeaderboard = () => {
    return $api.profile.GetLeaderBoard().then((response) => {
      this.LeaderboardUsers = response.data?.LeaderBoard
      return response.data?.LeaderBoard
    })
  }

  // Mutation
  public UpdateProfile = () => {
    Logic.Common.showLoader({
      loading: true,
      show: true,
      useModal: true,
    })
    $api.profile
      .UpdateProfile(this.UpdateProfilePayload)
      .then((response) => {
        this.UpdateProfile = response.data.UpdateProfile
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }
}
