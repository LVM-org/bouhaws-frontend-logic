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
  User,
} from "../gql/graphql";

export default class AuthApi extends BaseApiService {
  public GetAuthUser = () => {
    const requestData = `
	query GetAuthUser {
		AuthUser {
		  id
		  name
		  username
		  uuid
		  email_verified_at
		  phone_number
		  email
		  wallet {
			credited_amount
			debited_amount
			total_balance
			updated_at
		  }
		  profile {
			photo_url
			points
			total_point
			type
			bio
			school
			student_number
			year_of_enrollment
			push_notification_enabled
		  }
		  my_classes {
			description
			id
			uuid
			title
			students {
				uuid
			}
			projects {
				uuid
			}
			user {
				username
				name
				profile {
					photo_url
				}
			}
		  }
		  projects {
			prize
			created_at
			currency
			milestones {
				index
				points
				title
			}
			total_points
			uuid
			end_date
			description
			title
			photo_url
			type
			user {
				username
				profile {
					photo_url
				}
			}
		  }
		  project_entries {
			liked
			likes {
				id
				uuid
			}
			description
			created_at
			bookmarked
			bookmarks {
				id
				uuid
			}
			category {
				title
				uuid
			}
			title
			status
			uuid
			comments {
				id
				replied_comment_id
			}
			project {
				description
				title
				total_points
			}
			user {
				username
				profile {
					photo_url
				}
			}
			images {
				url
				milestone
			}
		  }
		}
	  }
	`;

    const response: Promise<
      OperationResult<{
        AuthUser: User;
      }>
    > = this.query(requestData, {});

    return response;
  };

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
        SignUp: User;
      }>
    > = this.mutation(requestData, data);

    return response;
  };

  public SignIn = (data: MutationSignInArgs) => {
    const requestData = `
	mutation SignIn($email: String!, $password: String!) {
		SignIn(email: $email, password: $password) {
		  token
		  user {
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
		  }
		}
	  }
	`;

    const response: Promise<
      OperationResult<{
        SignIn: AuthResponse;
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
        ResendVerifyEmail: Boolean;
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
			)  
		}
	`;

    const response: Promise<
      OperationResult<{
        SendResetPasswordEmail: Boolean;
      }>
    > = this.mutation(requestData, data);

    return response;
  };

  public UpdatePassword = (data: MutationUpdatePasswordArgs) => {
    const requestData = `
		mutation UpdatePassword(
			$old_password: String!, 
			$otp: String, 
			$password: String!, 
			$user_uuid: String!,  
		) {
			UpdatePassword(
				old_password: $old_password, 
				otp: $otp, 
				password: $password, 
				user_uuid: $user_uuid,  
			)  
		}
	`;

    const response: Promise<
      OperationResult<{
        UpdatePassword: Boolean;
      }>
    > = this.mutation(requestData, data);

    return response;
  };

  public VerifyEmailOtp = (data: MutationVerifyEmailOtpArgs) => {
    const requestData = `
	mutation VerifyEmailOtp($email: String!, $otp: String!) {
		VerifyEmailOTP(email: $email, otp: $otp) {
		  id
		  uuid
		  name
		}
	  }
	`;
    const response: Promise<
      OperationResult<{
        VerifyEmailOtp: User;
      }>
    > = this.mutation(requestData, data);

    return response;
  };

  public SignOut = () => {
    const requestData = `
	mutation SignOut {
		SignOut
	  }
	`;

    const response: Promise<
      OperationResult<{
        SignOut: boolean;
      }>
    > = this.mutation(requestData, {});

    return response;
  };
}
