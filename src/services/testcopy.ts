// import {
//   AccountSummary,
//   AvailablePeriods,
//   MutationDeleteUserArgs,
//   MutationSaveUserActivityArgs,
//   MutationTrackTasksArgs,
//   User,
// } from '../gql/graphql'
// import { DashboardOverview } from '../logic/types/common'
// import { OperationResult } from 'urql'
// import { BaseApiService } from './common/BaseService'
// import {
//   UpdateProfileForm,
//   VerifyIdentityForm,
//   UpdateNOKForm,
//   SetTransactionPinForm,
//   VerifyPinForm,
//   ScheduleMeetingForm,
// } from '../logic/types/forms/user'

// export default class UserApi extends BaseApiService {
//   public GetDashboardOverview = (currency: string, projectCount = 6) => {
//     const requestData = `
// 		query DashboardOverview($currency: String!, $projectCount: Int!) {
// 			UserWallet {
// 			  usd_balance
// 			  total_balance
// 			}
// 			UserSavingsBalance(currency: $currency)
// 			UserInvestmentBalance(currency: $currency)
// 			UserProperty(
// 				currency: $currency
// 				) {
// 			  uuid
// 			  total_investment
// 			  number_of_shares
// 			  created_at
// 			  project_variant {
// 				title
// 				project {
// 				  property_images
// 				  project_location
// 				  sold_out
// 				}
// 				metadata {
// 					currency
// 				}
// 			  }
// 			}
// 			UserPropertyPlans(
// 				currency: $currency
// 				) {
// 			  uuid
// 			  current_balance
// 			  target_amount
// 			  no_of_shares
// 			  created_at
// 			  project_variant {
// 				title
// 				project {
// 				  property_images
// 				  sold_out
// 				  project_location
// 				}
// 				metadata {
// 					currency
// 				}
// 			  }
// 			}
// 			UserSavings(
// 				currency: $currency
// 				) {
// 					start_date
// 					target_date
// 					type
// 					name
// 					payment_cycle
// 					product_type {
// 					  uuid
// 					  name
// 					}
// 					uuid
// 					current_balance
// 					target_amount
// 					currency
// 					surrender_status
// 			}
// 			UserFixedIncome(
// 				currency: $currency
// 				) {
// 					start_date
// 					target_date
// 					name
// 					type
// 					next_earning_date
// 					earning_cycle
// 					payment_cycle
// 					product_type {
// 					  uuid
// 					  name
// 					}
// 					uuid
// 					current_balance
// 					target_amount
// 					currency
// 					surrender_status
// 			}
// 			ProjectVariants(
// 			  orderBy: {column: UPDATED_AT, order: ASC}
// 			  where: {column: IS_PUBLISHED, operator: EQ, value: true}
// 			  hasProject: {column: IS_PUBLISHED, operator: EQ, value: true}
// 			  first: $projectCount
// 			) {
// 			  paginatorInfo {
// 				count
// 				currentPage
// 				hasMorePages
// 				perPage
// 			  }
// 			  data {
// 				title
// 				uuid
// 				price_per_share
// 				minimum_purchase
// 				metadata {
// 					currency
// 				}
// 				project {
// 				  baths
// 				  bedrooms
// 				  measuring_size
// 				  property_images
// 				  project_location
// 				}
// 			  }
// 			}
// 			CurrentAppVersion{
// 				version
// 				what_is_new
// 			}
// 		  }
// 		`

//     const response: Promise<OperationResult<DashboardOverview>> = this.query(
//       requestData,
//       {
//         currency,
//         projectCount,
//       },
//     )

//     return response
//   }

//   public GetProfile = () => {
//     const requestData = `
// 		query GetProfile {
// 			Profile {
// 			  auth_user_id
// 			  email
// 			  email_is_verified
// 			  first_name
// 			  full_name
// 			  is_verified
// 			  last_name
// 			  phone_number
// 			  profile {
// 				bvn_verified
// 				photo_url
// 				pin
// 				pin_set_at
// 				next_of_kin {
// 				  first_name
// 				  last_name
// 				  email
// 				  sex
// 				  phone_number
// 				  relationship
// 				}
// 			  }
// 			}
// 		  }
// 		`

//     const response: Promise<OperationResult<{
//       Profile: User
//     }>> = this.query(requestData, {})

//     return response
//   }

//   public UpdateProfile = (data: UpdateProfileForm) => {
//     const requestData = `
// 		mutation UpdateProfile($first_name: String!, $last_name: String!, $profile_image: Upload) {
// 			UpdateProfile(
// 			  first_name: $first_name
// 			  last_name: $last_name
// 			  profile_image: $profile_image
// 			) {
// 			  first_name
// 			  last_name
// 			  profile {
// 				photo_url
// 			  }
// 			  full_name
// 			}
// 		  }
// 		`

//     const response: Promise<OperationResult<{
//       UpdateProfile: User
//     }>> = this.mutation(requestData, data)

//     return response
//   }

//   public GetAvailableMeetingPeriods = () => {
//     const requestData = `
// 		query GetAvailableMeetingPeriods {
// 			AvailableMeetingPeriods {
// 			  from
// 			  to
// 			  slots {
// 				start {
// 				  dateTime
// 				}
// 				end {
// 				  dateTime
// 				}
// 			  }
// 			}
// 		  }
// 		`
//     const response: Promise<OperationResult<{
//       AvailableMeetingPeriods: AvailablePeriods
//     }>> = this.query(requestData, {})

//     return response
//   }

//   public GetAccountSummary = () => {
//     const requestData = `
// 		query GetAccountSummary {
// 			AccountSummary {
// 			  wallet_balance {
// 				usd
// 				ngn
// 			  }
// 			  portfolios
// 			  portfolios_end_date
// 			  plans
// 			  plans_end_date
// 			}
// 		  }
// 		`
//     const response: Promise<OperationResult<{
//       AccountSummary: AccountSummary
//     }>> = this.query(requestData, {})

//     return response
//   }

//   public VerifyIdentity = (data: VerifyIdentityForm) => {
//     const requestData = `
// 		mutation VerifyIdentity($type: String!, $id_number: String!, $date_of_birth: String!) {
// 			VerifyIdentity(type: $type, id_number: $id_number, date_of_birth: $date_of_birth)
// 		  }
// 		`
//     const response: Promise<OperationResult<{
//       VerifyIdentity: boolean
//     }>> = this.mutation(requestData, data)

//     return response
//   }

//   public UpdateNOK = (data: UpdateNOKForm) => {
//     const requestData = `
// 		mutation UpdateNOK($first_name: String!, $last_name: String!, $email: String!, $phone_number: String!, $sex: String!, $relationship: String!) {
// 			UpdateNOK(
// 			  first_name: $first_name
// 			  last_name: $last_name
// 			  email: $email
// 			  phone_number: $phone_number
// 			  sex: $sex
// 			  relationship: $relationship
// 			) {
// 			  profile {
// 				next_of_kin {
// 				  first_name
// 				  last_name
// 				  email
// 				  sex
// 				  phone_number
// 				  relationship
// 				}
// 			  }
// 			}
// 		  }
// 		`

//     const response: Promise<OperationResult<{
//       UpdateNOK: User
//     }>> = this.mutation(requestData, data)

//     return response
//   }

//   public SetTransactionPin = (data: SetTransactionPinForm) => {
//     const requestData = `
// 		mutation SetTransactionPin($new_pin: String!, $old_pin: String) {
// 			SetTransactionPin(new_pin: $new_pin, old_pin: $old_pin) {
// 				profile {
// 					pin_set_at
// 				}
// 			}
// 		  }
// 		`
//     const response: Promise<OperationResult<{
//       SetTransactionPin: User
//     }>> = this.mutation(requestData, data)

//     return response
//   }

//   public VerifyPin = (data: VerifyPinForm) => {
//     const requestData = `
// 		mutation VerifyPin($input_pin: String!) {
// 			VerifyPin(input_pin: $input_pin)
// 		  }
// 		`
//     const response: Promise<OperationResult<{
//       VerifyPin: boolean
//     }>> = this.mutation(requestData, data)

//     return response
//   }

//   public ScheduleMeeting = (data: ScheduleMeetingForm) => {
//     const requestData = `
// 		mutation ScheduleMeeting($reason: String!, $start_date_time: String!, $end_date_time: String!) {
// 			ScheduleMeeting(
// 			  reason: $reason
// 			  start_date_time: $start_date_time
// 			  end_date_time: $end_date_time
// 			)
// 		  }
// 		`

//     const response: Promise<OperationResult<{
//       ScheduleMeeting: boolean
//     }>> = this.mutation(requestData, data)

//     return response
//   }

//   public SaveUserActivity = (data: MutationSaveUserActivityArgs) => {
//     const requestData = `
// 		mutation SaveUserActivity($user_uuid: String, $user_id: String, $stage_type: String!, $extra_uuid: String, $task_reference: String, $event: String!, $type: String!, $metadata: String) {
// 			SaveUserActivity(
// 			  user_uuid: $user_uuid
// 			  event: $event
// 			  type: $type
// 			  metadata: $metadata
// 			  user_id: $user_id
// 			  stage_type: $stage_type
// 			  extra_uuid: $extra_uuid
// 			  task_reference: $task_reference
// 			)
// 		  }
// 		`
//     const response: Promise<OperationResult<{
//       SaveUserActivity: boolean
//     }>> = this.mutation(requestData, data)

//     return response
//   }

//   public TrackTask = (data: MutationTrackTasksArgs) => {
//     const requestData = `
// 		mutation SaveTask($user_uuid: String, $action_type: String!, $entity_uuid: String!, $task_reference: String!, $task_stage: String!) {
// 			TrackTasks(
// 			  user_uuid: $user_uuid
// 			  action_type: $action_type
// 			  entity_uuid: $entity_uuid
// 			  task_reference: $task_reference
// 			  task_stage: $task_stage
// 			)
// 		  }
// 		`
//     const response: Promise<OperationResult<{
//       TrackTasks: boolean
//     }>> = this.mutation(requestData, data)

//     return response
//   }

//   public DeleteUser = (data: MutationDeleteUserArgs) => {
//     const requestData = `
// 		mutation DeleteUser($action_type: String!, $input_pin: String) {
// 			DeleteUser(action_type: $action_type, input_pin: $input_pin)
// 		  }
// 		`
//     const response: Promise<OperationResult<{
//       DeleteUser: boolean
//     }>> = this.mutation(requestData, data)

//     return response
//   }
// }