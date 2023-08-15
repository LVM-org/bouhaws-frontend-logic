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
  public DashboardOverview: {
    AuthUser: User
    LeaderBoard: ProfileModel[]
  }
  public SingleUser: User

  // Mutation payloads
  public UpdateProfilePayload: MutationUpdateProfileArgs

  // Queries
  public GetDashboardOverview = () => {
    return $api.profile.GetDashboardOverview().then((response) => {
      this.DashboardOverview = response.data
      return response.data
    })
  }

  public GetSingleUser = (uuid: string) => {
    return $api.profile.GetSingleUser(uuid).then((response) => {
      this.SingleUser = response.data.SingleUser
      return response.data.SingleUser
    })
  }

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
    })
    return $api.profile
      .UpdateProfile(this.UpdateProfilePayload)
      .then((response) => {
        this.UpdateProfile = response.data.UpdateProfile
        Logic.Common.hideLoader()
        return response.data.UpdateProfile
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }
}
