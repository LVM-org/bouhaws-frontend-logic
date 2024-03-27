/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
  DateTime: any;
  /**
   * Loose type that allows any value. Be careful when passing in large `Int` or `Float` literals,
   * as they may not be parsed correctly on the server side. Use `String` literals if you are
   * dealing with really large numbers to be on the safe side.
   */
  Mixed: any;
  /** Can be used as an argument to upload files using https://github.com/jaydenseric/graphql-multipart-request-spec */
  Upload: any;
};

export type AuthResponse = {
  __typename?: "AuthResponse";
  token: Scalars["String"];
  user: User;
};

/** A single bouhaws class */
export type BouhawsClass = {
  __typename?: "BouhawsClass";
  /** When the class was created. */
  created_at: Scalars["DateTime"];
  /** The class description */
  description?: Maybe<Scalars["String"]>;
  /** Unique primary key. */
  id: Scalars["ID"];
  /** All projects attached to a class */
  projects?: Maybe<Array<Project>>;
  /** The class title */
  title: Scalars["String"];
  /** When the class was last updated. */
  updated_at: Scalars["DateTime"];
  /** The user that own the class */
  user: User;
  /** Unique UUID */
  uuid: Scalars["String"];
};

/** A paginated list of BouhawsClass items. */
export type BouhawsClassPaginator = {
  __typename?: "BouhawsClassPaginator";
  /** A list of BouhawsClass items. */
  data: Array<BouhawsClass>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** A conversation created by a user. It is equivalent to a new chat */
export type Conversation = {
  __typename?: "Conversation";
  /** Other users that are part of the conversation */
  associated_users?: Maybe<Array<User>>;
  /** When the conversation was created. */
  created_at: Scalars["DateTime"];
  /** Unique primary key. */
  id: Scalars["ID"];
  /** When the conversation was last updated. */
  updated_at: Scalars["DateTime"];
  /** The user that started the conversation */
  user: User;
  /** Unique UUID */
  uuid: Scalars["String"];
};

/** A single conversation message sent by a user */
export type ConversationMessage = {
  __typename?: "ConversationMessage";
  /** The text data attacth to the message */
  content?: Maybe<Scalars["String"]>;
  /** The conversation itself */
  conversation?: Maybe<Conversation>;
  /** When the conversation message was created. */
  created_at: Scalars["DateTime"];
  /** Unique primary key. */
  id: Scalars["ID"];
  /** The media attached to the message. For text image the will hold the image_cdn_url, for the image_gallery, it would hold a stringified array of all the image_cdn_url of each image in the gallery */
  media?: Maybe<Scalars["String"]>;
  /** The type of message. Can be 'text', 'image', 'image_gallery' */
  type: Scalars["String"];
  /** When the conversation message was last updated. */
  updated_at: Scalars["DateTime"];
  /** The user that sent the message */
  user: User;
  /** Unique UUID */
  uuid: Scalars["String"];
};

/** A single course */
export type Course = {
  __typename?: "Course";
  /** The bouhaws class to which the course belongs */
  bouhaws_class: BouhawsClass;
  /** The course code */
  code?: Maybe<Scalars["String"]>;
  /** When the course was created. */
  created_at: Scalars["DateTime"];
  /** Unique primary key. */
  id: Scalars["ID"];
  /** The course photo_url */
  photo_url?: Maybe<Scalars["String"]>;
  /** The course status. Default is 'active' */
  status: Scalars["String"];
  /** The course title */
  title: Scalars["String"];
  /** When the course was last updated. */
  updated_at: Scalars["DateTime"];
  /** Unique UUID */
  uuid: Scalars["String"];
};

/** A paginated list of Course items. */
export type CoursePaginator = {
  __typename?: "CoursePaginator";
  /** A list of Course items. */
  data: Array<Course>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type Mutation = {
  __typename?: "Mutation";
  /** Create a new class */
  CreateBouhawsClass: BouhawsClass;
  /** Create a course */
  CreateCourse: Course;
  /** Create a new project */
  CreateProject: Project;
  /** Create a new project category */
  CreateProjectCategory: ProjectCategory;
  /** Create a new project milestone */
  CreateProjectMilestone: ProjectMilestone;
  /** Delete a project milestone */
  DeleteProjectMilestone: Scalars["Boolean"];
  /** Joint an existing conversation */
  JoinConversation: Conversation;
  /** Join a project */
  JoinProject: ProjectEntry;
  /** Resend verify OTP email to user */
  ResendVerifyEmail: any;
  /** Save a conversation message */
  SaveConversationMessage: ConversationMessage;
  /** Save a project entry bookmark */
  SaveProjectEntryBookmark: ProjectEntryBookmark;
  /** Save a project entry comment */
  SaveProjectEntryComment: ProjectEntryComment;
  /** Save a project entry like */
  SaveProjectEntryLike: ProjectEntryLike;
  /** Send reset password email to user */
  SendResetPasswordEmail: Scalars["Boolean"];
  /** Sign in a user */
  SignIn: AuthResponse;
  /** Signout authenticated user */
  SignOut: Scalars["Boolean"];
  /** Sign up a new user */
  SignUp: User;
  /** Start a new conversation */
  StartConversation: Conversation;
  /** Update a class */
  UpdateBouhawsClass: BouhawsClass;
  /** Update a course */
  UpdateCourse: Course;
  /** Update user password */
  UpdatePassword: Scalars["Boolean"];
  /** Update authenticated user profile */
  UpdateProfile: BouhawsClass;
  /** Update a project */
  UpdateProject: Project;
  /** Update a project category */
  UpdateProjectCategory: ProjectCategory;
  /** Update a project entry */
  UpdateProjectEntry: ProjectEntry;
  /** Update a project milestone */
  UpdateProjectMilestone: ProjectMilestone;
  /** Upload an image */
  UploadImage: Scalars["String"];
  /** Verify use email using OTP */
  VerifyEmailOTP: User;
};

export type MutationCreateBouhawsClassArgs = {
  description: Scalars["String"];
  title: Scalars["String"];
};

export type MutationCreateCourseArgs = {
  bouhaws_class_id: Scalars["Int"];
  code: Scalars["String"];
  photo_url?: InputMaybe<Scalars["Upload"]>;
  title: Scalars["String"];
};

export type MutationCreateProjectArgs = {
  description: Scalars["String"];
  end_date: Scalars["String"];
  photo_url?: InputMaybe<Scalars["Upload"]>;
  prize: Scalars["String"];
  project_category_id: Scalars["Int"];
  requirements: Scalars["String"];
  title: Scalars["String"];
  total_points: Scalars["String"];
  type: Scalars["String"];
};

export type MutationCreateProjectCategoryArgs = {
  title: Scalars["String"];
};

export type MutationCreateProjectMilestoneArgs = {
  index: Scalars["Int"];
  points: Scalars["String"];
  project_id: Scalars["String"];
  title: Scalars["String"];
};

export type MutationDeleteProjectMilestoneArgs = {
  uuid: Scalars["String"];
};

export type MutationJoinConversationArgs = {
  associated_users_uuid?: InputMaybe<Array<Scalars["String"]>>;
  conversation_uuid: Scalars["String"];
};

export type MutationJoinProjectArgs = {
  description: Scalars["String"];
  project_id: Scalars["Int"];
  title: Scalars["String"];
  images?: Array<{ milestone: Scalars["String"]; url: Scalars["String"] }>;
  project_category_id?: Scalars["String"];
};

export type MutationResendVerifyEmailArgs = {
  user_uuid: Scalars["String"];
};

export type MutationSaveConversationMessageArgs = {
  content: Scalars["String"];
  conversation_id: Scalars["Int"];
  media: Scalars["String"];
  type: Scalars["String"];
};

export type MutationSaveProjectEntryBookmarkArgs = {
  project_entry_id: Scalars["Int"];
};

export type MutationSaveProjectEntryCommentArgs = {
  content: Scalars["String"];
  is_reply: Scalars["Boolean"];
  project_entry_id: Scalars["Int"];
  replied_comment_id?: InputMaybe<Scalars["Int"]>;
};

export type MutationSaveProjectEntryLikeArgs = {
  project_entry_id: Scalars["Int"];
};

export type MutationSendResetPasswordEmailArgs = {
  email: Scalars["String"];
};

export type MutationSignInArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationSignUpArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
  type: Scalars["String"];
};

export type MutationStartConversationArgs = {
  associated_users_uuid?: InputMaybe<Array<Scalars["String"]>>;
};

export type MutationUpdateBouhawsClassArgs = {
  bouhaws_class_uuid: Scalars["String"];
  description?: InputMaybe<Scalars["String"]>;
  projects_id?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type MutationUpdateCourseArgs = {
  code?: InputMaybe<Scalars["String"]>;
  course_uuid: Scalars["String"];
  photo_url?: InputMaybe<Scalars["Upload"]>;
  status?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type MutationUpdatePasswordArgs = {
  old_password: Scalars["String"];
  otp?: InputMaybe<Scalars["String"]>;
  password: Scalars["String"];
  user_uuid: Scalars["String"];
};

export type MutationUpdateProfileArgs = {
  bio?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  phone_number?: InputMaybe<Scalars["String"]>;
  photo_url?: InputMaybe<Scalars["Upload"]>;
  push_notification_enabled?: InputMaybe<Scalars["Boolean"]>;
  school?: InputMaybe<Scalars["String"]>;
  student_number?: InputMaybe<Scalars["String"]>;
  city?: InputMaybe<Scalars["String"]>;
  nationality?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<Scalars["String"]>;
  username?: InputMaybe<Scalars["String"]>;
  year_of_enrollment?: InputMaybe<Scalars["String"]>;
};

export type MutationUpdateProjectArgs = {
  description?: InputMaybe<Scalars["String"]>;
  end_date?: InputMaybe<Scalars["String"]>;
  photo_url?: InputMaybe<Scalars["Upload"]>;
  prize?: InputMaybe<Scalars["String"]>;
  project_category_id?: InputMaybe<Scalars["Int"]>;
  requirements?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
  total_points?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<Scalars["String"]>;
};

export type MutationUpdateProjectCategoryArgs = {
  project_category_uuid: Scalars["String"];
  title: Scalars["String"];
};

export type MutationUpdateProjectEntryArgs = {
  description?: InputMaybe<Scalars["String"]>;
  images?: InputMaybe<Array<Scalars["String"]>>;
  project_entry_uuid: Scalars["String"];
  status?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type MutationUpdateProjectMilestoneArgs = {
  index?: InputMaybe<Scalars["Int"]>;
  points?: InputMaybe<Scalars["String"]>;
  project_milestone_uuid: Scalars["String"];
  title?: InputMaybe<Scalars["String"]>;
};

export type MutationUploadImageArgs = {
  image: Scalars["Upload"];
};

export type MutationVerifyEmailOtpArgs = {
  email: Scalars["String"];
  otp: Scalars["String"];
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars["String"];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  Count = "COUNT",
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  Avg = "AVG",
  /** Amount of items. */
  Count = "COUNT",
  /** Maximum. */
  Max = "MAX",
  /** Minimum. */
  Min = "MIN",
  /** Sum. */
  Sum = "SUM",
}

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: "PaginatorInfo";
  /** Number of items in the current page. */
  count: Scalars["Int"];
  /** Index of the current page. */
  currentPage: Scalars["Int"];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars["Int"]>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars["Boolean"];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars["Int"]>;
  /** Index of the last available page. */
  lastPage: Scalars["Int"];
  /** Number of items per page. */
  perPage: Scalars["Int"];
  /** Number of total available items. */
  total: Scalars["Int"];
};

/** The profile info of a person who uses this application. */
export type Profile = {
  __typename?: "Profile";
  /** The profile bio */
  bio?: Maybe<Scalars["String"]>;
  /** When the profile was created. */
  created_at: Scalars["DateTime"];
  /** An array of the user's currently enrolled classes */
  enrolled_classes?: Maybe<Array<BouhawsClass>>;
  /** An array of the user's currently enrolled course */
  enrolled_courses?: Maybe<Array<Course>>;
  /** Unique primary key. */
  id: Scalars["ID"];
  /** The user profile photo */
  photo_url?: Maybe<Scalars["String"]>;
  /** The user current point */
  points: Scalars["Float"];
  /** User push notification status */
  push_notification_enabled: Scalars["Boolean"];
  /** The user school */
  school?: Maybe<Scalars["String"]>;
  /** The user student number */
  student_number?: Maybe<Scalars["String"]>;
  /** The user account type. Can be 'student' or 'teacher' */
  type: Scalars["String"];
  /** When the profile was last updated. */
  updated_at: Scalars["DateTime"];
  /** Unique UUID */
  uuid: Scalars["String"];
  /** The user year of enrollment */
  year_of_enrollment?: Maybe<Scalars["String"]>;
};

/** A new project */
export type Project = {
  __typename?: "Project";
  /** The project category */
  category: ProjectCategory;
  /** When the project was created. */
  created_at: Scalars["DateTime"];
  /** The project currency */
  currency: Scalars["String"];
  /** The project description */
  description?: Maybe<Scalars["String"]>;
  /** The project end date */
  end_date: Scalars["DateTime"];
  /** The project entries */
  entries?: Maybe<Array<ProjectEntry>>;
  /** Unique primary key. */
  id: Scalars["ID"];
  /** The project milestones */
  milestones?: Maybe<Array<ProjectMilestone>>;
  /** The project image url */
  photo_url?: Maybe<Scalars["String"]>;
  /** The project prize */
  prize: Scalars["String"];
  /** The project requirements */
  requirements?: Maybe<Scalars["String"]>;
  /** The project title */
  title: Scalars["String"];
  /** The project total points */
  total_points: Scalars["Float"];
  /** The project type. Can be 'event', 'challenge', 'course' */
  type: Scalars["String"];
  /** When the project was last updated. */
  updated_at: Scalars["DateTime"];
  /** The project owner */
  user: User;
  /** Unique UUID */
  uuid: Scalars["String"];
};

/** A single project category */
export type ProjectCategory = {
  __typename?: "ProjectCategory";
  /** When the project category was created. */
  created_at: Scalars["DateTime"];
  /** Unique primary key. */
  id: Scalars["ID"];
  /** The category title */
  title: Scalars["String"];
  /** When the project category was last updated. */
  updated_at: Scalars["DateTime"];
  /** Unique UUID */
  uuid: Scalars["String"];
};

/** A paginated list of ProjectCategory items. */
export type ProjectCategoryPaginator = {
  __typename?: "ProjectCategoryPaginator";
  /** A list of ProjectCategory items. */
  data: Array<ProjectCategory>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** A single project entry */
export type ProjectEntry = {
  __typename?: "ProjectEntry";
  /** The entry bookmarks */
  bookmarks?: Maybe<Array<ProjectEntryBookmark>>;
  /** The entry comments */
  comments?: Maybe<Array<ProjectEntryComment>>;
  /** When the project entry was created. */
  created_at: Scalars["DateTime"];
  /** The current project milestone for the entry */
  current_milestone_index: Scalars["Int"];
  /** The entry description */
  description: Scalars["String"];
  /** Unique primary key. */
  id: Scalars["ID"];
  /** The entry images. This is an array of all the images_cdn_url */
  images?: Maybe<Array<Scalars["String"]>>;
  /** The entry likes */
  likes?: Maybe<Array<ProjectEntryLike>>;
  /** The project itself */
  project: Project;
  /** The status of the entry. Default is 'active' */
  status?: Maybe<Scalars["String"]>;
  /** The entry title */
  title: Scalars["String"];
  /** When the project entry was last updated. */
  updated_at: Scalars["DateTime"];
  /** The user that made the entry */
  user: User;
  /** Unique UUID */
  uuid: Scalars["String"];
};

/** A single project entry bookmark */
export type ProjectEntryBookmark = {
  __typename?: "ProjectEntryBookmark";
  /** When the project entry bookmark was created. */
  created_at: Scalars["DateTime"];
  /** Unique primary key. */
  id: Scalars["ID"];
  /** The project entry itself */
  project_entry: ProjectEntry;
  /** When the project entry bookmark was last updated. */
  updated_at: Scalars["DateTime"];
  /** The user that made the entry bookmark */
  user: User;
  /** Unique UUID */
  uuid: Scalars["String"];
};

/** A single project entry comment */
export type ProjectEntryComment = {
  __typename?: "ProjectEntryComment";
  /** The coment content */
  content: Scalars["String"];
  /** When the project entry comment was created. */
  created_at: Scalars["DateTime"];
  /** Unique primary key. */
  id: Scalars["ID"];
  /** Is the comment a reply or not */
  is_reply: Scalars["Boolean"];
  /** The project entry itself */
  project_entry: ProjectEntry;
  /** The replied comment ID if the comment is a reply */
  replied_comment_id?: Maybe<Scalars["Int"]>;
  /** When the project entry comment was last updated. */
  updated_at: Scalars["DateTime"];
  /** The user that made the entry comment */
  user: User;
  /** Unique UUID */
  uuid: Scalars["String"];
};

/** A single project entry like */
export type ProjectEntryLike = {
  __typename?: "ProjectEntryLike";
  /** When the project entry like was created. */
  created_at: Scalars["DateTime"];
  /** Unique primary key. */
  id: Scalars["ID"];
  /** The project entry itself */
  project_entry: ProjectEntry;
  /** When the project entry like was last updated. */
  updated_at: Scalars["DateTime"];
  /** The user that made the entry like */
  user: User;
  /** Unique UUID */
  uuid: Scalars["String"];
};

/** A paginated list of ProjectEntry items. */
export type ProjectEntryPaginator = {
  __typename?: "ProjectEntryPaginator";
  /** A list of ProjectEntry items. */
  data: Array<ProjectEntry>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** A single project milestone */
export type ProjectMilestone = {
  __typename?: "ProjectMilestone";
  /** When the project milestone was created. */
  created_at: Scalars["DateTime"];
  /** Unique primary key. */
  id: Scalars["ID"];
  /** The milestone index */
  index: Scalars["Int"];
  /** The milestone points */
  points: Scalars["Float"];
  /** The project itself */
  project: Project;
  /** The milestone title */
  title: Scalars["String"];
  /** When the project milestone was last updated. */
  updated_at: Scalars["DateTime"];
  /** Unique UUID */
  uuid: Scalars["String"];
};

/** A paginated list of Project items. */
export type ProjectPaginator = {
  __typename?: "ProjectPaginator";
  /** A list of Project items. */
  data: Array<Project>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type Query = {
  __typename?: "Query";
  /** Get the authenticated user */
  AuthUser?: Maybe<User>;
  /** Get a single class */
  BouhawsClass?: Maybe<BouhawsClass>;
  /** Get a single conversation */
  Conversation?: Maybe<Conversation>;
  /** Get a single course */
  Course?: Maybe<Course>;
  /** Get many classess */
  GetBouhawsClasses: BouhawsClassPaginator;
  /** Get a many courses */
  GetCourses: CoursePaginator;
  /** Get many project categories */
  GetProjectCategories: ProjectCategoryPaginator;
  /** Get many project entries */
  GetProjectEntries: ProjectEntryPaginator;
  /** Get many projects */
  GetProjects: ProjectPaginator;
  /** Get the top 10 users */
  LeaderBoard?: Maybe<Array<User>>;
  /** Get a single project */
  Project?: Maybe<Project>;
  /** Get a single project category */
  ProjectCategory?: Maybe<ProjectCategory>;
  /** Get a single project entry */
  ProjectEntry?: Maybe<ProjectEntry>;
  /** Get the authenticated user wallet */
  UserWallet?: Maybe<Wallet>;
};

export type QueryBouhawsClassArgs = {
  uuid: Scalars["String"];
};

export type QueryConversationArgs = {
  uuid: Scalars["String"];
};

export type QueryCourseArgs = {
  uuid: Scalars["String"];
};

export type QueryGetBouhawsClassesArgs = {
  first: Scalars["Int"];
  orderBy?: InputMaybe<Array<QueryGetBouhawsClassesOrderByOrderByClause>>;
  page?: InputMaybe<Scalars["Int"]>;
};

export type QueryGetCoursesArgs = {
  first: Scalars["Int"];
  orderBy?: InputMaybe<Array<QueryGetCoursesOrderByOrderByClause>>;
  page?: InputMaybe<Scalars["Int"]>;
};

export type QueryGetProjectCategoriesArgs = {
  first: Scalars["Int"];
  orderBy?: InputMaybe<Array<QueryGetProjectCategoriesOrderByOrderByClause>>;
  page?: InputMaybe<Scalars["Int"]>;
};

export type QueryGetProjectEntriesArgs = {
  first: Scalars["Int"];
  hasProject?: InputMaybe<QueryGetProjectEntriesHasProjectWhereHasConditions>;
  hasUser?: InputMaybe<QueryGetProjectEntriesHasUserWhereHasConditions>;
  orderBy?: InputMaybe<Array<QueryGetProjectEntriesOrderByOrderByClause>>;
  page?: InputMaybe<Scalars["Int"]>;
};

export type QueryGetProjectsArgs = {
  first: Scalars["Int"];
  hasCategory?: InputMaybe<QueryGetProjectsHasCategoryWhereHasConditions>;
  hasUser?: InputMaybe<QueryGetProjectsHasUserWhereHasConditions>;
  orderBy?: InputMaybe<Array<QueryGetProjectsOrderByOrderByClause>>;
  page?: InputMaybe<Scalars["Int"]>;
};

export type QueryProjectArgs = {
  uuid: Scalars["String"];
};

export type QueryProjectCategoryArgs = {
  uuid: Scalars["String"];
};

export type QueryProjectEntryArgs = {
  uuid: Scalars["String"];
};

/** Allowed column names for Query.GetBouhawsClasses.orderBy. */
export enum QueryGetBouhawsClassesOrderByColumn {
  CreatedAt = "CREATED_AT",
}

/** Order by clause for Query.GetBouhawsClasses.orderBy. */
export type QueryGetBouhawsClassesOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: QueryGetBouhawsClassesOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Allowed column names for Query.GetCourses.orderBy. */
export enum QueryGetCoursesOrderByColumn {
  CreatedAt = "CREATED_AT",
}

/** Order by clause for Query.GetCourses.orderBy. */
export type QueryGetCoursesOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: QueryGetCoursesOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Allowed column names for Query.GetProjectCategories.orderBy. */
export enum QueryGetProjectCategoriesOrderByColumn {
  CreatedAt = "CREATED_AT",
}

/** Order by clause for Query.GetProjectCategories.orderBy. */
export type QueryGetProjectCategoriesOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: QueryGetProjectCategoriesOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Allowed column names for Query.GetProjectEntries.hasProject. */
export enum QueryGetProjectEntriesHasProjectColumn {
  ProjectCategoryId = "PROJECT_CATEGORY_ID",
  Uuid = "UUID",
}

/** Dynamic WHERE conditions for the `hasProject` argument on the query `GetProjectEntries`. */
export type QueryGetProjectEntriesHasProjectWhereHasConditions = {
  /** A set of conditions that requires all conditions to match. */
  AND?: InputMaybe<Array<QueryGetProjectEntriesHasProjectWhereHasConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: InputMaybe<QueryGetProjectEntriesHasProjectWhereHasConditionsRelation>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: InputMaybe<Array<QueryGetProjectEntriesHasProjectWhereHasConditions>>;
  /** The column that is used for the condition. */
  column?: InputMaybe<QueryGetProjectEntriesHasProjectColumn>;
  /** The operator that is used for the condition. */
  operator?: InputMaybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: InputMaybe<Scalars["Mixed"]>;
};

/** Dynamic HAS conditions for WHERE conditions for the `hasProject` argument on the query `GetProjectEntries`. */
export type QueryGetProjectEntriesHasProjectWhereHasConditionsRelation = {
  /** The amount to test. */
  amount?: InputMaybe<Scalars["Int"]>;
  /** Additional condition logic. */
  condition?: InputMaybe<QueryGetProjectEntriesHasProjectWhereHasConditions>;
  /** The comparison operator to test against the amount. */
  operator?: InputMaybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars["String"];
};

/** Allowed column names for Query.GetProjectEntries.hasUser. */
export enum QueryGetProjectEntriesHasUserColumn {
  Uuid = "UUID",
}

/** Dynamic WHERE conditions for the `hasUser` argument on the query `GetProjectEntries`. */
export type QueryGetProjectEntriesHasUserWhereHasConditions = {
  /** A set of conditions that requires all conditions to match. */
  AND?: InputMaybe<Array<QueryGetProjectEntriesHasUserWhereHasConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: InputMaybe<QueryGetProjectEntriesHasUserWhereHasConditionsRelation>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: InputMaybe<Array<QueryGetProjectEntriesHasUserWhereHasConditions>>;
  /** The column that is used for the condition. */
  column?: InputMaybe<QueryGetProjectEntriesHasUserColumn>;
  /** The operator that is used for the condition. */
  operator?: InputMaybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: InputMaybe<Scalars["Mixed"]>;
};

/** Dynamic HAS conditions for WHERE conditions for the `hasUser` argument on the query `GetProjectEntries`. */
export type QueryGetProjectEntriesHasUserWhereHasConditionsRelation = {
  /** The amount to test. */
  amount?: InputMaybe<Scalars["Int"]>;
  /** Additional condition logic. */
  condition?: InputMaybe<QueryGetProjectEntriesHasUserWhereHasConditions>;
  /** The comparison operator to test against the amount. */
  operator?: InputMaybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars["String"];
};

/** Allowed column names for Query.GetProjectEntries.orderBy. */
export enum QueryGetProjectEntriesOrderByColumn {
  CreatedAt = "CREATED_AT",
}

/** Order by clause for Query.GetProjectEntries.orderBy. */
export type QueryGetProjectEntriesOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: QueryGetProjectEntriesOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Allowed column names for Query.GetProjects.hasCategory. */
export enum QueryGetProjectsHasCategoryColumn {
  Title = "TITLE",
  Uuid = "UUID",
}

/** Dynamic WHERE conditions for the `hasCategory` argument on the query `GetProjects`. */
export type QueryGetProjectsHasCategoryWhereHasConditions = {
  /** A set of conditions that requires all conditions to match. */
  AND?: InputMaybe<Array<QueryGetProjectsHasCategoryWhereHasConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: InputMaybe<QueryGetProjectsHasCategoryWhereHasConditionsRelation>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: InputMaybe<Array<QueryGetProjectsHasCategoryWhereHasConditions>>;
  /** The column that is used for the condition. */
  column?: InputMaybe<QueryGetProjectsHasCategoryColumn>;
  /** The operator that is used for the condition. */
  operator?: InputMaybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: InputMaybe<Scalars["Mixed"]>;
};

/** Dynamic HAS conditions for WHERE conditions for the `hasCategory` argument on the query `GetProjects`. */
export type QueryGetProjectsHasCategoryWhereHasConditionsRelation = {
  /** The amount to test. */
  amount?: InputMaybe<Scalars["Int"]>;
  /** Additional condition logic. */
  condition?: InputMaybe<QueryGetProjectsHasCategoryWhereHasConditions>;
  /** The comparison operator to test against the amount. */
  operator?: InputMaybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars["String"];
};

/** Allowed column names for Query.GetProjects.hasUser. */
export enum QueryGetProjectsHasUserColumn {
  Uuid = "UUID",
}

/** Dynamic WHERE conditions for the `hasUser` argument on the query `GetProjects`. */
export type QueryGetProjectsHasUserWhereHasConditions = {
  /** A set of conditions that requires all conditions to match. */
  AND?: InputMaybe<Array<QueryGetProjectsHasUserWhereHasConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: InputMaybe<QueryGetProjectsHasUserWhereHasConditionsRelation>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: InputMaybe<Array<QueryGetProjectsHasUserWhereHasConditions>>;
  /** The column that is used for the condition. */
  column?: InputMaybe<QueryGetProjectsHasUserColumn>;
  /** The operator that is used for the condition. */
  operator?: InputMaybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: InputMaybe<Scalars["Mixed"]>;
};

/** Dynamic HAS conditions for WHERE conditions for the `hasUser` argument on the query `GetProjects`. */
export type QueryGetProjectsHasUserWhereHasConditionsRelation = {
  /** The amount to test. */
  amount?: InputMaybe<Scalars["Int"]>;
  /** Additional condition logic. */
  condition?: InputMaybe<QueryGetProjectsHasUserWhereHasConditions>;
  /** The comparison operator to test against the amount. */
  operator?: InputMaybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars["String"];
};

/** Allowed column names for Query.GetProjects.orderBy. */
export enum QueryGetProjectsOrderByColumn {
  CreatedAt = "CREATED_AT",
}

/** Order by clause for Query.GetProjects.orderBy. */
export type QueryGetProjectsOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: QueryGetProjectsOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** The available SQL operators that are used to filter query results. */
export enum SqlOperator {
  /** Whether a value is within a range of values (`BETWEEN`) */
  Between = "BETWEEN",
  /** Equal operator (`=`) */
  Eq = "EQ",
  /** Greater than operator (`>`) */
  Gt = "GT",
  /** Greater than or equal operator (`>=`) */
  Gte = "GTE",
  /** Whether a value is within a set of values (`IN`) */
  In = "IN",
  /** Whether a value is not null (`IS NOT NULL`) */
  IsNotNull = "IS_NOT_NULL",
  /** Whether a value is null (`IS NULL`) */
  IsNull = "IS_NULL",
  /** Simple pattern matching (`LIKE`) */
  Like = "LIKE",
  /** Less than operator (`<`) */
  Lt = "LT",
  /** Less than or equal operator (`<=`) */
  Lte = "LTE",
  /** Not equal operator (`!=`) */
  Neq = "NEQ",
  /** Whether a value is not within a range of values (`NOT BETWEEN`) */
  NotBetween = "NOT_BETWEEN",
  /** Whether a value is not within a set of values (`NOT IN`) */
  NotIn = "NOT_IN",
  /** Negation of simple pattern matching (`NOT LIKE`) */
  NotLike = "NOT_LIKE",
}

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = "ASC",
  /** Sort records in descending order. */
  Desc = "DESC",
}

/** A single transaction */
export type Transaction = {
  __typename?: "Transaction";
  /** The amount in the transaction */
  amount: Scalars["Float"];
  /** The chargeable entity id */
  chargeable_id: Scalars["Int"];
  /** The chargeable entity. This links the entry that is associated with the transaction */
  chargeable_type: Scalars["String"];
  /** The transaction charges */
  charges: Scalars["Float"];
  /** When the transaction was created. */
  created_at: Scalars["DateTime"];
  /** The transaction description */
  description: Scalars["String"];
  /** The trasaction flow. It can be 'debit' or 'credit' */
  dr_or_cr: Scalars["String"];
  /** The transaction gateway */
  gateway: Scalars["String"];
  /** Unique primary key. */
  id: Scalars["ID"];
  /** When the transaction was last updated. */
  updated_at: Scalars["DateTime"];
  /** The user that own the transaction */
  user: User;
  /** Unique UUID */
  uuid: Scalars["String"];
  /** The wallet that own the transaction */
  wallet: Wallet;
  /** The wallet balance before the transaction happened */
  wallet_balance: Scalars["Float"];
};

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = "ONLY",
  /** Return both trashed and non-trashed results. */
  With = "WITH",
  /** Only return non-trashed results. */
  Without = "WITHOUT",
}

/** Account of a person who uses this application. */
export type User = {
  __typename?: "User";
  /** User conversations */
  conversations?: Maybe<Array<Conversation>>;
  /** When the account was created. */
  created_at: Scalars["DateTime"];
  /** Unique email address. */
  email: Scalars["String"];
  /** When the email was verified. */
  email_verified_at?: Maybe<Scalars["DateTime"]>;
  /** Unique primary key. */
  id: Scalars["ID"];
  /** Non-unique name. */
  name: Scalars["String"];
  /** User profile */
  profile: Profile;
  /** User project entries */
  project_entries?: Maybe<Array<ProjectEntry>>;
  /** When the account was last updated. */
  updated_at: Scalars["DateTime"];
  /** Unique username */
  username?: Maybe<Scalars["String"]>;
  /** Unique UUID */
  uuid: Scalars["String"];
  /** User wallet */
  wallet: Wallet;
};

/** A single wallet */
export type Wallet = {
  __typename?: "Wallet";
  /** When the wallet was created. */
  created_at: Scalars["DateTime"];
  /** The wallet credited amount */
  credited_amount: Scalars["Float"];
  /** The wallet debited amount */
  debited_amount: Scalars["Float"];
  /** Unique primary key. */
  id: Scalars["ID"];
  /** The wallet total balance */
  total_balance: Scalars["Float"];
  /** All wallet transactions */
  transactions?: Maybe<Array<Transaction>>;
  /** When the wallet was last updated. */
  updated_at: Scalars["DateTime"];
  /** The wallet owner */
  user: User;
  /** Unique UUID */
  uuid: Scalars["String"];
};

/** Dynamic WHERE conditions for queries. */
export type WhereConditions = {
  /** A set of conditions that requires all conditions to match. */
  AND?: InputMaybe<Array<WhereConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: InputMaybe<WhereConditionsRelation>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: InputMaybe<Array<WhereConditions>>;
  /** The column that is used for the condition. */
  column?: InputMaybe<Scalars["String"]>;
  /** The operator that is used for the condition. */
  operator?: InputMaybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: InputMaybe<Scalars["Mixed"]>;
};

/** Dynamic HAS conditions for WHERE condition queries. */
export type WhereConditionsRelation = {
  /** The amount to test. */
  amount?: InputMaybe<Scalars["Int"]>;
  /** Additional condition logic. */
  condition?: InputMaybe<WhereConditions>;
  /** The comparison operator to test against the amount. */
  operator?: InputMaybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars["String"];
};
