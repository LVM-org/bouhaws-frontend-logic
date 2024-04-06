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
					category {
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
			spotlightProjects:GetProjectEntries(first: 10, orderBy: {column: ACTIVITIES, order: ASC}) {
				data {
				  liked
				  uuid
				  activities
				  title
				  project {
					uuid
					user_entry {
						uuid
					  }
				  }
				  images {
					url
				  }
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
  public GetExhibitionData = () => {
    const requestData = `
		query ExhibitionData {
			popularProjects:GetProjectEntries(first: 10, orderBy: {column: ACTIVITIES, order: ASC}) {
				data {
				  uuid
				  title
				  images {
					url
				  }
				  user {
					username
					name
				  }
				}
			  }
			  LeaderBoard {
				photo_url
				user {
					name
					username
				}

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
	  	}
	`;

    const response: Promise<
      OperationResult<{
        DashboardData: any;
      }>
    > = this.query(requestData, {});

    return response;
  };

  public Search = (searchTerm: string) => {
    const requestData = `
		query SearchData {
			projects:GetProjects(
                first: 10, 
                orderBy: {column: CREATED_AT, order: ASC},
				where: {column: TITLE, operator: LIKE, value: "%${searchTerm}%", OR: {column: DESCRIPTION, operator: LIKE, value: "%${searchTerm}%"}}
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
			GetProjectEntries(
				first: 10
				where: {column: TITLE, operator: LIKE, value: "%${searchTerm}%", OR: {column: DESCRIPTION, operator: LIKE, value:  "%${searchTerm}%"}}
				) {
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
