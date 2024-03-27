import { BaseApiService } from "./common/BaseService";
import { OperationResult } from "urql";

export default class AuthApi extends BaseApiService {
  public GetDashboardData = () => {
    const requestData = `
		query DashboardData {
			LeaderBoard {
				photo_url
				nationality
				user {
					name
					username
				}
                points
                total_point
			}
			challenges:GetProjects(
                first: 10, 
                orderBy: {column: CREATED_AT, order: ASC},
                where: {operator: EQ, value: "challenge", column: TYPE}
            ) {
				data {
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
			}
			GetProjectCategories(page: 1, first: 20) {
				paginatorInfo {
					count
					total
				}
				data {
					title
					uuid
				}
			}
			GetProjectEntries(first: 10) {
				data {
					liked
					likes {
						id
						uuid
					}
					description
					current_milestone_index
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
            GetBouhawsClasses(first: 10) {
                data {
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
              }
	  	}
	`;

    const response: Promise<
      OperationResult<{
        DashboardData: any;
      }>
    > = this.query(requestData, {});

    return response;
  };
}
