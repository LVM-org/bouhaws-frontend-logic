import { BaseApiService } from './common/BaseService'
import { OperationResult } from 'urql'
import {
  MutationSignUpArgs,
  MutationSignInArgs,
  MutationResendVerifyEmailArgs,
  MutationSendResetPasswordEmailArgs,
  MutationUpdatePasswordArgs,
  MutationVerifyEmailOtpArgs,
  AuthResponse,
} from '../gql/graphql'

export default class AuthApi extends BaseApiService {
  public SignUp = (data: MutationSignUpArgs) => {
    const requestData = `
	mutation SignUp($email: String!, $password: String!, $username: String!) {
		SignUp(email: $email, password: $password, username: $username) {
		  uuid
		  email
		  username
		  id
		  created_at
		}
	  }
	`

    const response: Promise<OperationResult<{
      SignUp: AuthResponse
    }>> = this.mutation(requestData, data)

    return response
  }

  public SignIn = (data: MutationSignInArgs) => {
    const requestData = `
		mutation SignIn(
			$email: String!,
			$password: String!
		) {
			SignIn(
				email: $email,
				password: $password
			) {
				token
			}
		}
	`

    const response: Promise<OperationResult<{
      SignIn: any
    }>> = this.mutation(requestData, data)

    return response
  }

  public ResendVerifyEmail = (data: MutationResendVerifyEmailArgs) => {
    const requestData = `
		mutation ResendVerifyEmail( 
				$user_uuid: String!,  
			) {
			ResendVerifyEmail(  
				user_uuid: $user_uuid,  
			) {
				user_uuid
			}
		}
	`

    const response: Promise<OperationResult<{
      ResendVerifyEmail: any
    }>> = this.mutation(requestData, data)

    return response
  }

  public SendResetPasswordEmail = (
    data: MutationSendResetPasswordEmailArgs,
  ) => {
    const requestData = `
		mutation SendResetPasswordEmail( 
				$email: String!,  
			) {
			SendResetPasswordEmail(  
				email: $email,  
			) {
				email
			}
		}
	`

    const response: Promise<OperationResult<{
      SendResetPasswordEmail: any
    }>> = this.mutation(requestData, data)

    return response
  }

  public UpdatePassword = (data: MutationUpdatePasswordArgs) => {
    const requestData = `
		mutation UpdatePassword(
			$old_password: String!, 
			$otp: String!, 
			$password: String!, 
			$user_uuid: String!,  
		) {
			UpdatePassword(
				old_password: $old_password, 
				otp: $otp, 
				password: $password, 
				user_uuid: $user_uuid,  
			) {
				otp
			}
		}
	`

    const response: Promise<OperationResult<{
      UpdatePassword: any
    }>> = this.mutation(requestData, data)

    return response
  }

  public VerifyEmailOtp = (data: MutationVerifyEmailOtpArgs) => {
    const requestData = `
		mutation VerifyEmailOtp(
			$email: String!,
			$otp: String!, 
		) {
			VerifyEmailOtp(
				email: $email, 
				otp: $otp,  
			) {
				token
			}
		}
	`

    const response: Promise<OperationResult<{
      VerifyEmailOtp: any
    }>> = this.mutation(requestData, data)

    return response
  }
}
