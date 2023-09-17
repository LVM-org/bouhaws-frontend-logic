import { BaseApiService } from './common/BaseService'
import { OperationResult } from 'urql'
import {
  MutationUpdateProfileArgs,
  Notification,
  Profile,
  QueryGetProjectEntriesHasUserWhereHasConditionsRelation,
  QueryGetTransactionsOrderByOrderByClause,
  TransactionPaginator,
  User,
  Wallet,
} from '../gql/graphql'

export default class ProfileApi extends BaseApiService {
  public GetDashboardOverview = () => {
    const requestData = `
	query GetDashboardOverview {
		AuthUser {
		  id
		  name
		  username
		  uuid
		  email_verified_at
		  wallet {
			credited_amount
			debited_amount
			total_balance
			updated_at
		  }
		  profile {
			photo_url
			points
			type
		  }
		  project_entries {
			id
			uuid
			project {
			  id
			  uuid
			  title
			  photo_url
			  end_date
			  type
			  milestones {
				id
				uuid
				points
				index
				title
			  }
			}
			title
			status
			images {
			  milestone
			  url
			}
			current_milestone_index
			updated_at
		  }
		  my_classes {
			id
			uuid
			title
			description
			created_at
			user {
			  uuid
			  username
			  profile {
				photo_url
			  }
			}
			projects {
				id
			}
			students {
				id
				uuid
			}
		  }
		  conversations {
			uuid
			id
			user {
			  name
			  username
			  profile {
				photo_url
			  }
			}
			other_member {
			  uuid
			  name
			  username
			  profile {
				photo_url
				bio
			  }
			}
			last_message{
				content
			    media
				type
				created_at
			}
			updated_at
		  }
		  projects {
			id
			uuid
			title
			photo_url
			end_date
			type
			prize
			currency
			created_at
		    description
			bouhawsclass{
				uuid
				title
			}
			milestones {
			  id
			  uuid
			  points
			  index
			  title
			}
			category{
				uuid
				title
			  }
			user{
				uuid
				name
				username
				profile{
				  photo_url
				}
			  }
			entries {
			  uuid
			}
		  }
		}
		LeaderBoard {
		  id
		  user {
			uuid
			name
			username
		  }
		  points
		  photo_url
		}
	  }
		`

    const response: Promise<OperationResult<{
      AuthUser: User
      LeaderBoard: Profile[]
    }>> = this.query(requestData, {})

    return response
  }

  public GetUserWallet = () => {
    const requestData = `
	query GetUserWallet {
		UserWallet {
		  uuid
		  total_balance
		  debited_amount
		  credited_amount
		}
	  }
		`

    const response: Promise<OperationResult<{
      UserWallet: Wallet
    }>> = this.query(requestData, {})

    return response
  }

  public GetTransactions = (
    page: number,
    first: number,
    orderBy: QueryGetTransactionsOrderByOrderByClause | string,
    hasUser: QueryGetProjectEntriesHasUserWhereHasConditionsRelation | string,
  ) => {
    const requestData = `
		query GetTransactions($page: Int!, $first: Int!) {
			GetTransactions(first: $first, page: $page, orderBy: ${orderBy}, ${hasUser}) {
			  paginatorInfo {
				count
				currentPage
				firstItem
				hasMorePages
				lastItem
				perPage
				total
			  }
			  data {
				id
				uuid
				description
				dr_or_cr
				created_at
				amount
				charges
				wallet_balance
			  }
			}
		  }
		`
    const response: Promise<OperationResult<{
      GetTransactions: TransactionPaginator
    }>> = this.query(requestData, {
      page,
      first,
    })

    return response
  }

  public GetMyNotification = () => {
    const requestData = `
	query GetMyNotification {
		MyNotifications {
		  id
		  uuid
		  title
		  body
		  type
		  model_type
		  read
		  created_at
		  project_entry {
			uuid
			user {
			  uuid
			  username
			  profile {
				photo_url
			  }
			}
			project {
			  uuid
			}
		  }
		  project_entry_comment {
			uuid
			user {
			  uuid
			  username
			  profile {
				photo_url
			  }
			}
			project_entry {
			  uuid
			}
		  }
		  project_entry_like {
			uuid
			user {
			  uuid
			  username
			  profile {
				photo_url
			  }
			}
			project_entry {
			  uuid
			}
		  }
		}
	  }
		`

    const response: Promise<OperationResult<{
      MyNotifications: Notification[]
    }>> = this.query(requestData, {})

    return response
  }

  public UpdateProfile = (data: MutationUpdateProfileArgs) => {
    const requestData = `
	mutation UpdateProfile($bio: String, $name: String, $photo_url: Upload, $push_notification_enabled: Boolean, $school: String, $student_number: String, $type: String, $username: String, $year_of_enrollment: String, $phone_number: String) {
		UpdateProfile(
		  bio: $bio
		  name: $name
		  photo_url: $photo_url
		  push_notification_enabled: $push_notification_enabled
		  school: $school
		  student_number: $student_number
		  type: $type
		  username: $username
		  year_of_enrollment: $year_of_enrollment
		  phone_number: $phone_number
		) {
		  uuid
		  photo_url
		  points
		  bio
		  student_number
		  school
		  year_of_enrollment
		  type
		}
	  }
	`

    const response: Promise<OperationResult<{
      UpdateProfile: any
    }>> = this.mutation(requestData, data)

    return response
  }

  public GetLeaderBoard = () => {
    const requestData = `
	query GetLeaderBoard {
		LeaderBoard {
		  uuid
		  name
		  username
		  profile {
			points
			photo_url
		  }
		}
	  }`

    const response: Promise<OperationResult<{
      LeaderBoard: [User]
    }>> = this.query(requestData, {})

    return response
  }

  public GetSingleUser = (uuid: string) => {
    const requestData = `
	query GetSingleUser($uuid: String!) {
		SingleUser(uuid: $uuid) {
		  uuid
		  name
		  username
		  profile {
			points
			photo_url
			bio
			school
			student_number
			year_of_enrollment
			type
		  }
		  project_entries {
			id
			uuid
			liked
			user {
			uuid
			username
			profile {
				photo_url
			}
			}
			likes{
				uuid
			}
			comments{
				uuid
			}
			project {
			  id
			  uuid
			  title
			  photo_url
			  end_date
			  type
			  milestones {
				id
				uuid
				points
				index
				title
			  }
			}
			title
			status
			images {
			  milestone
			  url
			}
			current_milestone_index
			updated_at
		  }
		  my_classes {
			id
			uuid
			title
			description
			created_at
			user {
			  uuid
			  username
			  profile {
				photo_url
			  }
			}
			projects {
				id
			}
			students {
				id
				uuid
			}
		  }
		  projects {
			id
			uuid
			title
			photo_url
			end_date
			type
			milestones {
			  id
			  uuid
			  points
			  index
			  title
			}
			entries {
			  uuid
			}
		  }
		}
	  }
	 `

    const response: Promise<OperationResult<{
      SingleUser: User
    }>> = this.query(requestData, { uuid })

    return response
  }

  public MarkNotificationsAsRead = (notification_uuids: string[]) => {
    const requestData = `
	mutation MarkNotificationsAsRead($notification_uuids: [String!]!) {
		MarkNotificationsAsRead(notification_uuids: $notification_uuids) 
	  }
	`

    const response: Promise<OperationResult<{
      MarkNotificationsAsRead: boolean
    }>> = this.mutation(requestData, {
      notification_uuids,
    })

    return response
  }
}
