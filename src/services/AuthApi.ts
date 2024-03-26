import { BaseApiService } from "./common/BaseService";
import { OperationResult } from "urql";
import {
  MutationSignUpArgs,
  MutationSignInArgs,
  MutationResendVerifyEmailArgs,
  MutationSendResetPasswordEmailArgs,
  MutationUpdatePasswordArgs,
  MutationVerifyEmailOtpArgs,
  AuthResponse,
} from "../gql/graphql";

export default class AuthApi extends BaseApiService {
  public SignUp = (data: MutationSignUpArgs) => {
    const requestData = `
		mutation SignUp($email: String!, $password: String!, $username: String!, $type: String!) {
			SignUp(email: $email, password: $password, username: $username, type: $type) {
			  uuid
			  email
			  username
			  id
			  created_at
			}
		  }
		`;

    const response: Promise<
      OperationResult<{
        SignUp: AuthResponse;
      }>
    > = this.mutation(requestData, data);

    return response;
  };

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
				user {
					email
					username
					id
					name
					profile {
						photo_url
						bio
						id
						city
						nationality
					}
				}
			}
		}
	`;

    const response: Promise<
      OperationResult<{
        SignIn: any;
      }>
    > = this.mutation(requestData, data);

    return response;
  };

  public ResendVerifyEmail = (data: MutationResendVerifyEmailArgs) => {
    const requestData = `
		mutation ResendVerifyEmail( 
				$user_uuid: String!,  
			) {
			ResendVerifyEmail(  
				user_uuid: $user_uuid,  
			) 
		}
	`;

    const response: Promise<
      OperationResult<{
        ResendVerifyEmail: any;
      }>
    > = this.mutation(requestData, data);

    return response;
  };

  public SendResetPasswordEmail = (
    data: MutationSendResetPasswordEmailArgs
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
	`;

    const response: Promise<
      OperationResult<{
        SendResetPasswordEmail: any;
      }>
    > = this.mutation(requestData, data);

    return response;
  };

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
	`;

    const response: Promise<
      OperationResult<{
        UpdatePassword: any;
      }>
    > = this.mutation(requestData, data);

    return response;
  };

  public VerifyEmailOtp = (data: MutationVerifyEmailOtpArgs) => {
    const requestData = `
		mutation VerifyEmailOTP(
			$email: String!,
			$otp: String!, 
		) {
			VerifyEmailOTP(
				email: $email, 
				otp: $otp,  
			) {
				email
				id
			}
		}
	`;

    const response: Promise<
      OperationResult<{
        VerifyEmailOTP: any;
      }>
    > = this.mutation(requestData, data);

    return response;
  };

  public GetUserData = () => {
    const requestData = `
		query AuthUser {
			AuthUser {
				name
				phone_number
				email
				username
				uuid
				profile {
					bio
					city
					photo_url
					points
					school
					type
					total_point
					city
					nationality
				}
				project_bookmarked {
					id
				}
				project_entries {
					liked
					status
					title
					description
				}
				projects {
					description
					total_points
					title
					requirements
					photo_url
				}
			}
		}
	`;

    const response: Promise<
      OperationResult<{
        AuthUser: any;
      }>
    > = this.query(requestData, {});

    return response;
  };
}
