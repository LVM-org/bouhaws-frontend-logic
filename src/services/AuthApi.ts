import { BaseApiService } from "./common/BaseService";
import { OperationResult } from "urql";
import { AuthResponse, AuthUser } from "../gql/graphql";
import {
	SignUpForm,
	SignInForm,
	VerifyPhoneOTPForm,
	ResendPhoneOTPForm,
	PersonalizeAccountForm,
	ResendVerifyEmailForm,
	SendResetPasswordEmailForm,
	UpdatePasswordForm
} from "../logic/types/forms/auth";

export default class AuthApi extends BaseApiService {

	public SignUp = (data: SignUpForm) => {

		const requestData = `
		mutation SignUp(
			$phone_number: String!,
			$password: String!
		) {
			SignUp(phone_number: $phone_number, password: $password) {
				id,
				uuid,
				phone
			}
		}
		`;

		const response: Promise<OperationResult<{
			SignUp: AuthUser
		}>> = this.mutation(requestData, data)

		return response;
	}


	public SignIn = (data: SignInForm) => {

		const requestData = `
		mutation SignIn(
			$email: String!,
			  $password: String!
		  ) {
			SignIn(email: $email, password: $password) {
			  token,
			  user {
				id,
				uuid,
				first_name,
				last_name,
				phone,
				email_verified_at,
				phone_verified_at
			  }
			}
		  }
		`;

		const response: Promise<OperationResult<{
			SignIn: AuthResponse
		}>> = this.mutation(requestData, data)

		return response;
	}

	public VerifyPhoneOTP = (data: VerifyPhoneOTPForm) => {

		const requestData = `
		mutation VerifyPhoneOTP(
			$user_uuid: String!,
			  $otp: String!
		  ) {
			VerifyPhoneOTP(user_uuid: $user_uuid, otp: $otp) {
			  uuid,
			  phone,
			  phone_verified_at
			}
		  }
		`;

		const response: Promise<OperationResult<{
			VerifyPhoneOTP: AuthUser
		}>> = this.mutation(requestData, data)

		return response;
	}


	public ResendPhoneOTP = (data: ResendPhoneOTPForm) => {

		const requestData = `
		mutation ResendPhoneOTP(
			$user_uuid: String!,
			  $phone_number: String!
		  ) {
			ResendPhoneOTP(user_uuid: $user_uuid, phone_number: $phone_number) 
		  }
		`;

		const response: Promise<OperationResult<{
			ResendPhoneOTP: boolean
		}>> = this.mutation(requestData, data)

		return response;
	}

	public PersonalizeAccount = (data: PersonalizeAccountForm) => {

		const requestData = `
		mutation PersonalizeAccount($user_uuid: String!, $first_name: String!, $last_name: String!, $email: String!, $password: String!) {
			PersonalizeAccount(
			  user_uuid: $user_uuid
			  first_name: $first_name
			  last_name: $last_name
			  email: $email
			  password: $password
			) {
			  token
			  user {
				id
				uuid
				first_name
				last_name
				email
				phone
				phone_verified_at
				email_verified_at
			  }
			}
		  }
		`;

		const response: Promise<OperationResult<{
			PersonalizeAccount: AuthResponse
		}>> = this.mutation(requestData, data)

		return response;
	}


	public ResendVerifyEmail = (data: ResendVerifyEmailForm) => {

		const requestData = `
		mutation ResendVerifyEmail(
			$user_uuid: String!
		  ) {
			ResendVerifyEmail(
			  user_uuid: $user_uuid,
			)
		  }
		`;

		const response: Promise<OperationResult<{
			ResendVerifyEmail: boolean
		}>> = this.mutation(requestData, data)

		return response;
	}

	public SendResetPasswordEmail = (data: SendResetPasswordEmailForm) => {

		const requestData = `
		mutation SendResetPasswordEmail(
			$user_uuid: String!
		  ) {
			SendResetPasswordEmail(
			  user_uuid: $user_uuid,
			)
		  }
		`;

		const response: Promise<OperationResult<{
			SendResetPasswordEmail: boolean
		}>> = this.mutation(requestData, data)

		return response;
	}

	public UpdatePassword = (data: UpdatePasswordForm) => {

		const requestData = `
		mutation UpdatePassword(
			$user_uuid: String!,
			$password: String!
		  ) {
			UpdatePassword(
			  user_uuid: $user_uuid,
			  password: $password
			)
		  }
		`;

		const response: Promise<OperationResult<{
			UpdatePassword: boolean
		}>> = this.mutation(requestData, data)

		return response;
	}

}