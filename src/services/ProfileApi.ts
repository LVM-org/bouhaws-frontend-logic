import { BaseApiService } from './common/BaseService'
import { OperationResult } from 'urql'
import { MutationUpdateProfileArgs, Profile, User } from '../gql/graphql'

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

  public UpdateProfile = (data: MutationUpdateProfileArgs) => {
    const requestData = `
	mutation UpdateProfile($bio: String, $name: String, $photo_url: Upload, $push_notification_enabled: Boolean, $school: String, $student_number: String, $type: String, $username: String, $year_of_enrollment: String) {
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
		  }
		  project_entries {
			id
			uuid
			user {
			uuid
			username
			profile {
				photo_url
			}
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
			user {
			  uuid
			  username
			  profile {
				photo_url
			  }
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
}
