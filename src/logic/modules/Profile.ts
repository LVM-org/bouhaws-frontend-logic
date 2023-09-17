import { $api } from '../../services'
import { CombinedError } from 'urql'
import Common from './Common'
import {
  MutationUpdateProfileArgs,
  Notification,
  Profile as ProfileModel,
  TransactionPaginator,
  User,
  Wallet,
} from '../../gql/graphql'
import { Logic } from '..'

export default class Profile extends Common {
  constructor() {
    super()
  }

  // Base variables
  public UserProfile: ProfileModel
  public UserWallet: Wallet
  public UserTransactions: TransactionPaginator
  public LeaderboardUsers: User[]
  public DashboardOverview: {
    AuthUser: User
    LeaderBoard: ProfileModel[]
  }
  public SingleUser: User
  public MyNotifications: Notification[]

  // Mutation payloads
  public UpdateProfilePayload: MutationUpdateProfileArgs

  // Queries
  public GetDashboardOverview = () => {
    return $api.profile.GetDashboardOverview().then((response) => {
      this.DashboardOverview = response.data
      return response.data
    })
  }

  public GetUserWallet = () => {
    return $api.profile.GetUserWallet().then((response) => {
      this.UserWallet = response.data.UserWallet
      return response.data.UserWallet
    })
  }

  public GetTransactions = (
    page: number,
    first: number,
    hasUser = '',
    isUpdate = false,
  ) => {
    return $api.profile
      .GetTransactions(
        page,
        first,
        `{
      column: CREATED_AT,
      order: DESC
    }`,
        hasUser,
      )
      .then((response) => {
        if (isUpdate) {
          const currentData = this.UserTransactions.data.concat(
            response.data?.GetTransactions.data,
          )

          response.data.GetTransactions.data = currentData

          this.UserTransactions = response.data?.GetTransactions
        } else {
          this.UserTransactions = response.data?.GetTransactions
        }

        return response.data?.GetTransactions
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

  public GetMyNotifications = () => {
    return $api.profile.GetMyNotification().then((response) => {
      this.MyNotifications = response.data?.MyNotifications
      return response.data?.MyNotifications
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
        this.UserProfile = response.data.UpdateProfile
        Logic.Common.hideLoader()
        return response.data.UpdateProfile
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  public MarkNotificationsAsRead = (notification_uuid: string[]) => {
    return $api.profile
      .MarkNotificationsAsRead(notification_uuid)
      .then((response) => {
        this.GetMyNotifications()
        return response.data.MarkNotificationsAsRead
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }
}
