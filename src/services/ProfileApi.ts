import { BaseApiService } from "./common/BaseService";
import { OperationResult } from "urql";
import { MutationUpdateProfileArgs } from "../gql/graphql";

export default class AuthApi extends BaseApiService {
  public UpdateProfile = (data: MutationUpdateProfileArgs) => {
    const requestData = `
		mutation UpdateProfile(
				$bio: String, 
				$name: String, 
				$photo_url: Upload, 
				$push_notification_enabled: Boolean,  
				$school: String, 
				$city: String, 
				$nationality: String, 
				$student_number: String, 
				$type: String, 
				$username: String, 
				$year_of_enrollment: String
			) {
			UpdateProfile(
				bio: $bio, 
				name: $name, 
				photo_url: $photo_url, 
				push_notification_enabled: $push_notification_enabled, 
				school: $school, 
				city: $city, 
				nationality: $nationality,
				student_number: $student_number, 
				type: $type, 
				username: $username, 
				year_of_enrollment: $year_of_enrollment,
			) {
				user {
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
						nationality
						type
						total_point
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
		}
	`;

    const response: Promise<
      OperationResult<{
        UpdateProfile: any;
      }>
    > = this.mutation(requestData, data);

    return response;
  };
}
