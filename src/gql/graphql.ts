/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * Loose type that allows any value. Be careful when passing in large `Int` or `Float` literals,
   * as they may not be parsed correctly on the server side. Use `String` literals if you are
   * dealing with really large numbers to be on the safe side.
   */
  Mixed: any;
  /** Can be used as an argument to upload files using https://github.com/jaydenseric/graphql-multipart-request-spec */
  Upload: any;
};

export type ActivityLog = {
  __typename?: 'ActivityLog';
  activity_type: Scalars['String'];
  created_at: Scalars['String'];
  id: Scalars['ID'];
  meta: Scalars['String'];
  metadata: Scalars['String'];
  summary: Scalars['String'];
  updated_at: Scalars['String'];
  user: User;
  user_id: Scalars['Int'];
  uuid: Scalars['String'];
};

export type Admin = {
  __typename?: 'Admin';
  added_by: Scalars['String'];
  added_by_authorized_type: Scalars['String'];
  created_at: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['ID'];
  profile: Profile;
  profile_id: Scalars['Int'];
  role: Scalars['String'];
  status: Scalars['String'];
  updated_at: Scalars['String'];
  user_status: Scalars['String'];
  uuid: Scalars['String'];
};

export type Agent = {
  __typename?: 'Agent';
  about: Scalars['String'];
  accepted_terms: Scalars['Int'];
  active_listings: Array<Scalars['Int']>;
  commission_percentage: Scalars['String'];
  created_at: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  logo_url: Scalars['String'];
  name: Scalars['String'];
  office_location: Scalars['String'];
  profile: Profile;
  profile_id: Scalars['Int'];
  profile_name: Scalars['String'];
  projects: Scalars['Int'];
  rc_number: Scalars['String'];
  registration_evidence_url: Scalars['String'];
  role: Scalars['String'];
  status: Scalars['String'];
  super_agent_id: Scalars['String'];
  type: Scalars['String'];
  updated_at: Scalars['String'];
  uuid: Scalars['String'];
  website: Scalars['String'];
};

export type AnnualOperatingExpenses = {
  __typename?: 'AnnualOperatingExpenses';
  booking_platform_fee?: Maybe<PriceData>;
  cleaning_fees?: Maybe<PriceData>;
  hao_fee?: Maybe<PriceData>;
  insurance?: Maybe<PriceData>;
  lodging_tax?: Maybe<PriceData>;
  maintenance?: Maybe<PriceData>;
  marketing_cost?: Maybe<PriceData>;
  operating_expenses?: Maybe<PriceData>;
  other?: Maybe<PriceData>;
  property_tax?: Maybe<PriceData>;
  rental_revenue?: Maybe<PriceData>;
  total_operating_expenses_amount?: Maybe<Scalars['String']>;
  total_operating_expenses_amount_edit?: Maybe<Scalars['String']>;
  total_operating_expenses_percentage?: Maybe<Scalars['String']>;
  utilities?: Maybe<PriceData>;
};

export type ApplyToData = {
  __typename?: 'ApplyToData';
  income_plans: Scalars['Boolean'];
  property_purchase: Scalars['Boolean'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String'];
  user: AuthUser;
};

export type AuthUser = {
  __typename?: 'AuthUser';
  email?: Maybe<Scalars['String']>;
  email_verified_at?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  is_login_email?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  password_created_at?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  phone_country?: Maybe<Scalars['String']>;
  phone_verified_at?: Maybe<Scalars['String']>;
  uuid: Scalars['String'];
};

export type AvailablePeriods = {
  __typename?: 'AvailablePeriods';
  from: Scalars['String'];
  slots: Array<PeriodData>;
  timezone: Scalars['String'];
  to: Scalars['String'];
};

export type Bank = {
  __typename?: 'Bank';
  account_no: Scalars['String'];
  bank_code: Scalars['String'];
  bank_name: Scalars['String'];
  created_at: Scalars['String'];
  id: Scalars['ID'];
  is_verified: Scalars['Boolean'];
  meta_data: BankMetaData;
  updated_at: Scalars['String'];
  user: User;
  user_id: Scalars['Int'];
  uuid: Scalars['String'];
  wallet: Wallet;
  wallet_id: Scalars['Int'];
};

export type BankMetaData = {
  __typename?: 'BankMetaData';
  account_name: Scalars['String'];
  account_number: Scalars['String'];
  recipient_code: Scalars['String'];
};

export type CampaignRule = {
  __typename?: 'CampaignRule';
  admin_user_id: Scalars['Int'];
  campaign_template_id: Scalars['String'];
  created_at: Scalars['String'];
  id: Scalars['ID'];
  initiation_date: Scalars['String'];
  initiation_type: Scalars['String'];
  interval: Scalars['String'];
  interval_period: Scalars['String'];
  rules?: Maybe<Scalars['String']>;
  template: CampaignTemplate;
  title: Scalars['String'];
  updated_at: Scalars['String'];
};

export type CampaignTemplate = {
  __typename?: 'CampaignTemplate';
  admin_user_id: Scalars['Int'];
  created_at: Scalars['String'];
  id: Scalars['ID'];
  message: Scalars['String'];
  sender: Scalars['String'];
  subject: Scalars['String'];
  title: Scalars['String'];
  updated_at: Scalars['String'];
  variables?: Maybe<Array<Scalars['String']>>;
};

export type Card = {
  __typename?: 'Card';
  created_at: Scalars['String'];
  gateway: Scalars['String'];
  id: Scalars['ID'];
  life_time_token?: Maybe<Scalars['String']>;
  meta_data: CardMetaData;
  updated_at: Scalars['String'];
  user: User;
  user_id: Scalars['Int'];
  uuid: Scalars['String'];
  wallet: Wallet;
  wallet_id: Scalars['Int'];
};

export type CardMetaData = {
  __typename?: 'CardMetaData';
  account_name?: Maybe<Scalars['String']>;
  bank?: Maybe<Scalars['String']>;
  bin?: Maybe<Scalars['String']>;
  card_type?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  expiry?: Maybe<Scalars['String']>;
  first_6digits?: Maybe<Scalars['String']>;
  issuer?: Maybe<Scalars['String']>;
  last4?: Maybe<Scalars['String']>;
  last_4digits?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type CashBack = {
  __typename?: 'CashBack';
  admin_user_id: Scalars['Int'];
  apply_to?: Maybe<ApplyToData>;
  created_at: Scalars['String'];
  end_date: Scalars['String'];
  id: Scalars['ID'];
  is_active: Scalars['Boolean'];
  percentage: Scalars['String'];
  start_date: Scalars['String'];
  title: Scalars['String'];
  updated_at: Scalars['String'];
  uuid: Scalars['String'];
};

export type Click = {
  __typename?: 'Click';
  id: Scalars['ID'];
  project_id: Scalars['Int'];
  referee: RefereeProfile;
  referral_code: Scalars['String'];
  super_agent_code: Scalars['String'];
  uuid: Scalars['String'];
};

export type CommercialBank = {
  __typename?: 'CommercialBank';
  code: Scalars['String'];
  created: Scalars['String'];
  id: Scalars['ID'];
  logo: Scalars['String'];
  name: Scalars['String'];
};

export type Conversion = {
  __typename?: 'Conversion';
  commission: Scalars['String'];
  created_at: Scalars['String'];
  id: Scalars['ID'];
  project_id: Scalars['Int'];
  referee: RefereeProfile;
  referral_code: Scalars['String'];
  updated_at: Scalars['String'];
  user_id: Scalars['Int'];
  uuid: Scalars['Int'];
};

export type Developer = {
  __typename?: 'Developer';
  about: Scalars['String'];
  accepted_terms: Scalars['Int'];
  created_at: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  logo_url: Scalars['String'];
  name: Scalars['String'];
  office_location: Scalars['String'];
  profile: Array<Profile>;
  profile_id: Scalars['String'];
  profile_image: Scalars['String'];
  profile_name: Scalars['String'];
  project_variants: Array<ProjectVariant>;
  projects: Array<Project>;
  rc_number: Scalars['String'];
  registration_evidence_url: Scalars['String'];
  updated_at: Scalars['String'];
  uuid: Scalars['String'];
  website: Scalars['String'];
};

export type ExchangeRate = {
  __typename?: 'ExchangeRate';
  admin_user_id: Scalars['Int'];
  buying_price: Scalars['String'];
  created_at: Scalars['String'];
  credit_amount: Scalars['String'];
  currency: Scalars['String'];
  date: Scalars['String'];
  id: Scalars['ID'];
  selling_price: Scalars['String'];
  updated_at: Scalars['String'];
  uuid: Scalars['String'];
};

export type MarketData = {
  __typename?: 'MarketData';
  beds: Scalars['String'];
  created_at: Scalars['String'];
  data?: Maybe<Array<MarketPriceData>>;
  id: Scalars['ID'];
  location: MarketLocation;
  location_id: Scalars['Int'];
  type: Scalars['String'];
  updated_at: Scalars['String'];
  uuid: Scalars['String'];
};

export type MarketLocation = {
  __typename?: 'MarketLocation';
  created_at: Scalars['String'];
  id: Scalars['ID'];
  market_data: Array<MarketData>;
  name: Scalars['String'];
  updated_at: Scalars['String'];
  uuid: Scalars['String'];
};

export type MarketPriceData = {
  __typename?: 'MarketPriceData';
  date: Scalars['String'];
  id: Scalars['Int'];
  price: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  AddUserBank: Bank;
  AddUserCard: Card;
  CreateFixedIncomePlan: Plan;
  CreateHomeSavingsPlan: Plan;
  CreateRentSavingsPlan: Plan;
  DeleteUserBank: Scalars['Boolean'];
  DeleteUserCard: Scalars['Boolean'];
  FundPlan: Plan;
  FundWallet: Wallet;
  PersonalizeAccount: AuthResponse;
  PlanWithdrawal: Plan;
  PortfolioPlanSurrender: Plan;
  PortfolioPlanWithdrawal: Plan;
  PortfolioSurrender: Portfolio;
  PortfolioWithdrawal: Portfolio;
  ResendPhoneOTP: Scalars['Boolean'];
  ResendVerifyEmail: Scalars['Boolean'];
  SaveUserActivity: Scalars['Boolean'];
  ScheduleMeeting: Scalars['Boolean'];
  SendResetPasswordEmail: Scalars['Boolean'];
  SetTransactionPin: User;
  SetupVitualAccount: Wallet;
  SignIn: AuthResponse;
  SignUp: AuthUser;
  SubscribeToProperty: Portfolio;
  UpdateNOK: User;
  UpdatePassword: Scalars['Boolean'];
  UpdatePlanAutoDebit: Plan;
  UpdatePlanRollback: Plan;
  UpdateProfile: User;
  VerifyIdentity: Scalars['Boolean'];
  VerifyPhoneOTP: AuthUser;
  VerifyPin: Scalars['Boolean'];
  WithdrawWalletFund: Wallet;
};


export type MutationAddUserBankArgs = {
  account_no: Scalars['String'];
  bank_code: Scalars['String'];
};


export type MutationAddUserCardArgs = {
  reference: Scalars['String'];
};


export type MutationCreateFixedIncomePlanArgs = {
  card_uuid?: InputMaybe<Scalars['String']>;
  currency: Scalars['String'];
  deposit: Scalars['String'];
  input_pin: Scalars['String'];
  is_recurrent: Scalars['Boolean'];
  name: Scalars['String'];
  next_payment_date?: InputMaybe<Scalars['String']>;
  payment_cycle?: InputMaybe<Scalars['String']>;
  preferred_payment_method: Scalars['String'];
  product_id: Scalars['Int'];
  recurrent_amount?: InputMaybe<Scalars['String']>;
  rollback_interest?: InputMaybe<Scalars['Boolean']>;
  rollback_principal?: InputMaybe<Scalars['Boolean']>;
  target_amount?: InputMaybe<Scalars['Int']>;
  target_date: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
};


export type MutationCreateHomeSavingsPlanArgs = {
  card_uuid?: InputMaybe<Scalars['String']>;
  currency: Scalars['String'];
  deposit: Scalars['String'];
  input_pin: Scalars['String'];
  is_recurrent?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  next_payment_date: Scalars['String'];
  payment_cycle: Scalars['String'];
  preferred_payment_method: Scalars['String'];
  product_id: Scalars['Int'];
  recurrent_amount: Scalars['String'];
  rollback_interest?: InputMaybe<Scalars['Boolean']>;
  rollback_principal?: InputMaybe<Scalars['Boolean']>;
  target_amount: Scalars['String'];
  target_date: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
};


export type MutationCreateRentSavingsPlanArgs = {
  card_uuid?: InputMaybe<Scalars['String']>;
  currency: Scalars['String'];
  deposit: Scalars['String'];
  input_pin: Scalars['String'];
  is_recurrent?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  next_payment_date: Scalars['String'];
  payment_cycle: Scalars['String'];
  preferred_payment_method: Scalars['String'];
  product_id: Scalars['Int'];
  recurrent_amount: Scalars['String'];
  rent_category: Scalars['String'];
  rent_payment_cycle: Scalars['String'];
  rollback_interest?: InputMaybe<Scalars['Boolean']>;
  rollback_principal?: InputMaybe<Scalars['Boolean']>;
  target_amount: Scalars['String'];
  target_date: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteUserBankArgs = {
  bank_uuid: Scalars['String'];
};


export type MutationDeleteUserCardArgs = {
  card_uuid: Scalars['String'];
};


export type MutationFundPlanArgs = {
  amount: Scalars['String'];
  card_uuid?: InputMaybe<Scalars['String']>;
  input_pin: Scalars['String'];
  plan_uuid: Scalars['String'];
};


export type MutationFundWalletArgs = {
  amount: Scalars['Int'];
  card_uuid?: InputMaybe<Scalars['String']>;
  currency: Scalars['String'];
};


export type MutationPersonalizeAccountArgs = {
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  password: Scalars['String'];
  user_uuid: Scalars['String'];
};


export type MutationPlanWithdrawalArgs = {
  amount: Scalars['String'];
  input_pin: Scalars['String'];
  plan_uuid: Scalars['String'];
};


export type MutationPortfolioPlanSurrenderArgs = {
  input_pin: Scalars['String'];
  product_type?: InputMaybe<Scalars['String']>;
  product_uuid: Scalars['String'];
  reason: Scalars['String'];
};


export type MutationPortfolioPlanWithdrawalArgs = {
  amount: Scalars['Float'];
  input_pin: Scalars['String'];
  product_type?: InputMaybe<Scalars['String']>;
  product_uuid: Scalars['String'];
};


export type MutationPortfolioSurrenderArgs = {
  input_pin: Scalars['String'];
  product_type?: InputMaybe<Scalars['String']>;
  product_uuid: Scalars['String'];
  reason: Scalars['String'];
};


export type MutationPortfolioWithdrawalArgs = {
  amount: Scalars['Float'];
  input_pin: Scalars['String'];
  product_type?: InputMaybe<Scalars['String']>;
  product_uuid: Scalars['String'];
};


export type MutationResendPhoneOtpArgs = {
  phone_number: Scalars['String'];
  user_uuid: Scalars['String'];
};


export type MutationResendVerifyEmailArgs = {
  user_uuid: Scalars['String'];
};


export type MutationSaveUserActivityArgs = {
  email?: InputMaybe<Scalars['String']>;
  event: Scalars['String'];
  first_name?: InputMaybe<Scalars['String']>;
  ip_address: Scalars['Int'];
  last_name?: InputMaybe<Scalars['String']>;
  phone_number?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
  user_uuid?: InputMaybe<Scalars['String']>;
};


export type MutationScheduleMeetingArgs = {
  end_date_time: Scalars['String'];
  reason: Scalars['String'];
  start_date_time: Scalars['String'];
};


export type MutationSendResetPasswordEmailArgs = {
  user_uuid: Scalars['String'];
};


export type MutationSetTransactionPinArgs = {
  new_pin: Scalars['String'];
  old_pin?: InputMaybe<Scalars['String']>;
};


export type MutationSetupVitualAccountArgs = {
  date_of_birth: Scalars['String'];
  id_number: Scalars['Int'];
};


export type MutationSignInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignUpArgs = {
  password: Scalars['String'];
  phone_number: Scalars['String'];
};


export type MutationSubscribeToPropertyArgs = {
  amount: Scalars['Float'];
  card_uuid?: InputMaybe<Scalars['String']>;
  currency: Scalars['String'];
  input_pin: Scalars['String'];
  portfolio_uuid?: InputMaybe<Scalars['String']>;
  project_variant_id: Scalars['Int'];
};


export type MutationUpdateNokArgs = {
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  phone_number: Scalars['String'];
  relationship: Scalars['String'];
  sex: Scalars['String'];
};


export type MutationUpdatePasswordArgs = {
  password: Scalars['String'];
  user_uuid: Scalars['String'];
};


export type MutationUpdatePlanAutoDebitArgs = {
  is_recurrent: Scalars['Boolean'];
  next_payment_date?: InputMaybe<Scalars['String']>;
  payment_cycle?: InputMaybe<Scalars['String']>;
  recurrent_amount?: InputMaybe<Scalars['String']>;
};


export type MutationUpdatePlanRollbackArgs = {
  plan_uuid: Scalars['String'];
  rollback_interest: Scalars['Boolean'];
  rollback_principal: Scalars['Boolean'];
};


export type MutationUpdateProfileArgs = {
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  profile_image?: InputMaybe<Scalars['Upload']>;
};


export type MutationVerifyIdentityArgs = {
  image: Scalars['Upload'];
  type: Scalars['String'];
};


export type MutationVerifyPhoneOtpArgs = {
  otp: Scalars['String'];
  user_uuid: Scalars['String'];
};


export type MutationVerifyPinArgs = {
  input_pin: Scalars['String'];
};


export type MutationWithdrawWalletFundArgs = {
  amount: Scalars['Int'];
  bank_uuid: Scalars['String'];
  currency: Scalars['String'];
  input_pin: Scalars['String'];
};

export type Notification = {
  __typename?: 'Notification';
  body: Scalars['String'];
  created_at: Scalars['String'];
  extra_url?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  model_type: Scalars['String'];
  model_type_id: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
  updated_at: Scalars['String'];
  user: User;
  user_id: Scalars['Int'];
};

/** A paginated list of Notification items. */
export type NotificationPaginator = {
  __typename?: 'NotificationPaginator';
  /** A list of Notification items. */
  data: Array<Notification>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  Count = 'COUNT'
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  Avg = 'AVG',
  /** Amount of items. */
  Count = 'COUNT',
  /** Maximum. */
  Max = 'MAX',
  /** Minimum. */
  Min = 'MIN',
  /** Sum. */
  Sum = 'SUM'
}

/** Information about pagination using a Relay style cursor connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Number of nodes in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** The cursor to continue paginating forwards. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
  /** The cursor to continue paginating backwards. */
  startCursor?: Maybe<Scalars['String']>;
  /** Total number of nodes in the paginated connection. */
  total: Scalars['Int'];
};

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
  /** Number of items per page. */
  perPage: Scalars['Int'];
  /** Number of total available items. */
  total: Scalars['Int'];
};

export type Period = {
  __typename?: 'Period';
  dateTime: Scalars['String'];
};

export type PeriodData = {
  __typename?: 'PeriodData';
  end: Period;
  start: Period;
};

export type Plan = {
  __typename?: 'Plan';
  accrued_till_date?: Maybe<Scalars['Float']>;
  accumulated_income?: Maybe<Scalars['Float']>;
  activities: Array<PlanActivity>;
  available_for_withdrawal: Scalars['Float'];
  created_at: Scalars['String'];
  currency: Scalars['String'];
  current_balance: Scalars['Float'];
  current_investment_value: Scalars['Float'];
  estimated_returns: Scalars['Float'];
  id: Scalars['ID'];
  income_received: Scalars['String'];
  is_recurrent: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  next_payment_date?: Maybe<Scalars['String']>;
  next_withdrwal_date?: Maybe<Scalars['String']>;
  no_of_shares: Scalars['String'];
  paid_out?: Maybe<Scalars['String']>;
  payment_cycle: Scalars['String'];
  preferred_card_uuid?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
  project: Project;
  project_id: Scalars['String'];
  project_variant: ProjectVariant;
  recurrent_amount: Scalars['Float'];
  rent_category: Scalars['String'];
  rent_payment_cycle: Scalars['String'];
  return_percentage: Scalars['String'];
  rollback_interest: Scalars['Boolean'];
  rollback_principal: Scalars['Boolean'];
  start_date: Scalars['String'];
  surrender_accepted_at?: Maybe<Scalars['String']>;
  surrender_request?: Maybe<PortfolioSurrender>;
  surrender_status: Scalars['String'];
  target_amount: Scalars['Float'];
  target_date?: Maybe<Scalars['String']>;
  transactions: Array<Transaction>;
  type: Scalars['String'];
  updated_at: Scalars['String'];
  user: User;
  user_id: Scalars['Int'];
  uuid: Scalars['String'];
};

export type PlanActivity = {
  __typename?: 'PlanActivity';
  created_at: Scalars['String'];
  id: Scalars['ID'];
  plan: Plan;
  plan_id: Scalars['Int'];
  plan_name: Scalars['String'];
  summary: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  transaction: Transaction;
  transaction_id: Scalars['Int'];
};

export type Portfolio = {
  __typename?: 'Portfolio';
  accrued_till_date: Scalars['Float'];
  accumulated_income: Scalars['Float'];
  activities: Array<PortfolioActivity>;
  annual_returns: Scalars['Float'];
  available_for_withdrawal: Scalars['Float'];
  created_at: Scalars['String'];
  current_investment_value: Scalars['Float'];
  expected_returns: Scalars['Float'];
  id: Scalars['ID'];
  income_received: Scalars['String'];
  number_of_shares: Scalars['Float'];
  paid_out?: Maybe<Scalars['String']>;
  project: Project;
  project_id: Scalars['Int'];
  project_variant: ProjectVariant;
  returns_till_date: Scalars['Float'];
  surrender_accepted_at?: Maybe<Scalars['String']>;
  surrender_request?: Maybe<PortfolioSurrender>;
  surrender_status: Scalars['String'];
  total_contributions: Scalars['Float'];
  total_investment: Scalars['Float'];
  total_withdrawals?: Maybe<Scalars['Float']>;
  transactions: Array<Transaction>;
  updated_at: Scalars['String'];
  user: User;
  user_id: Scalars['Int'];
  uuid: Scalars['String'];
};

export type PortfolioActivity = {
  __typename?: 'PortfolioActivity';
  created_at: Scalars['String'];
  id: Scalars['ID'];
  portfolio: Portfolio;
  portfolio_id: Scalars['Int'];
  summary: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  transaction: Transaction;
  transaction_id: Scalars['Int'];
  updated_at: Scalars['Int'];
  uuid: Scalars['String'];
};

export type PortfolioSurrender = {
  __typename?: 'PortfolioSurrender';
  id: Scalars['ID'];
  plan_id?: Maybe<Scalars['Int']>;
  portfolio_id?: Maybe<Scalars['Int']>;
  reason: Scalars['String'];
  status: Scalars['String'];
  surrender_amount: Scalars['String'];
  user_id: Scalars['Int'];
};

export type PriceData = {
  __typename?: 'PriceData';
  amount: Scalars['String'];
  percentage: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  currency: Scalars['String'];
  fixed_yield: Scalars['String'];
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  income_payment_cycle: Scalars['String'];
  minimum_amount: Scalars['String'];
  name: Scalars['String'];
  status: Scalars['String'];
  type: Scalars['String'];
  uuid: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  address?: Maybe<Scalars['String']>;
  admin: Admin;
  agent: Agent;
  bvn_verified?: Maybe<Scalars['Int']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at: Scalars['String'];
  date_of_birth?: Maybe<Scalars['String']>;
  developer: Developer;
  id: Scalars['ID'];
  nationality?: Maybe<Scalars['String']>;
  next_of_kin?: Maybe<UserNok>;
  nin_verified?: Maybe<Scalars['Int']>;
  photo_url?: Maybe<Scalars['String']>;
  pin?: Maybe<Scalars['String']>;
  pin_set_at?: Maybe<Scalars['String']>;
  referral_status?: Maybe<Scalars['String']>;
  sex?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  updated_at: Scalars['String'];
  user: User;
  user_id: Scalars['Int'];
  uuid: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  accept_installment: Scalars['String'];
  amenities?: Maybe<ProjectAmenities>;
  asset_type: Scalars['String'];
  baths: Scalars['String'];
  bedrooms: Scalars['String'];
  commission: Scalars['String'];
  created_at: Scalars['String'];
  developer: Developer;
  developer_id: Scalars['Int'];
  distribution?: Maybe<Scalars['String']>;
  document_url?: Maybe<Scalars['String']>;
  end_date: Scalars['String'];
  faqs?: Maybe<Array<ProjectFaq>>;
  featured: Scalars['Boolean'];
  guest?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  installment: Scalars['String'];
  is_published: Scalars['Boolean'];
  launch_date?: Maybe<Scalars['String']>;
  managed_by: Scalars['String'];
  market_data_location_id: Scalars['String'];
  market_location: MarketLocation;
  marketing_materials?: Maybe<Array<Scalars['String']>>;
  measuring_size: Scalars['String'];
  measuring_unit: Scalars['String'];
  metadata: ProjectMetadata;
  neighorhood_rating?: Maybe<Scalars['Int']>;
  payment_frequency: Scalars['String'];
  plan_current_investment: Scalars['String'];
  plan_total_shares: Scalars['String'];
  plans?: Maybe<Array<Plan>>;
  portfolio_current_investment: Scalars['String'];
  portfolio_total_shares: Scalars['String'];
  portfolios?: Maybe<Array<Portfolio>>;
  project_address: Scalars['String'];
  project_category: Scalars['String'];
  project_description?: Maybe<Scalars['String']>;
  project_documents?: Maybe<Array<Scalars['String']>>;
  project_location: Scalars['String'];
  project_stage: Scalars['String'];
  project_title: Scalars['String'];
  project_use: Scalars['String'];
  project_variants: Array<ProjectVariant>;
  project_variants_count: Scalars['Int'];
  project_video?: Maybe<Scalars['String']>;
  property_categories: Scalars['String'];
  property_documents?: Maybe<PropertyDocuments>;
  property_images?: Maybe<Array<Scalars['String']>>;
  property_state: Scalars['String'];
  property_status: Scalars['String'];
  property_title?: Maybe<PropertyTitle>;
  saves?: Maybe<Array<SavedProject>>;
  sold_out: Scalars['Boolean'];
  sponsored: Scalars['Boolean'];
  start_date: Scalars['String'];
  staycatPropertyDocumentsion?: Maybe<Scalars['String']>;
  total_returns: Scalars['String'];
  update_type: Scalars['String'];
  updated_at: Scalars['String'];
  uuid: Scalars['String'];
  video_is_ready: Scalars['Boolean'];
  waitlists?: Maybe<Array<Waitlist>>;
};

export type ProjectAmenities = {
  __typename?: 'ProjectAmenities';
  air_conditioned?: Maybe<Scalars['Boolean']>;
  all_room_ensuite?: Maybe<Scalars['Boolean']>;
  beautiful_landscape?: Maybe<Scalars['Boolean']>;
  car_park?: Maybe<Scalars['Boolean']>;
  comfort_guaranteed?: Maybe<Scalars['Boolean']>;
  drainage_system?: Maybe<Scalars['Boolean']>;
  etc?: Maybe<Scalars['Boolean']>;
  full_hours_power_supply?: Maybe<Scalars['Boolean']>;
  full_serviced_spaces?: Maybe<Scalars['Boolean']>;
  gated_community?: Maybe<Scalars['Boolean']>;
  green_areas?: Maybe<Scalars['Boolean']>;
  house_keeping?: Maybe<Scalars['Boolean']>;
  kitchen?: Maybe<Scalars['Boolean']>;
  on_site_packing?: Maybe<Scalars['Boolean']>;
  paved_road?: Maybe<Scalars['Boolean']>;
  perimeter_fencing?: Maybe<Scalars['Boolean']>;
  pool?: Maybe<Scalars['Boolean']>;
  private_restroom?: Maybe<Scalars['Boolean']>;
  recreation_park?: Maybe<Scalars['Boolean']>;
  road_network?: Maybe<Scalars['Boolean']>;
  security?: Maybe<Scalars['Boolean']>;
  security_cctv?: Maybe<Scalars['Boolean']>;
  speed_wifi?: Maybe<Scalars['Boolean']>;
  tv_in_room?: Maybe<Scalars['Boolean']>;
  uninterrupted_power_supply?: Maybe<Scalars['Boolean']>;
  water_supply?: Maybe<Scalars['Boolean']>;
  workstation?: Maybe<Scalars['Boolean']>;
};

export type ProjectFaq = {
  __typename?: 'ProjectFaq';
  answer?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  question?: Maybe<Scalars['String']>;
};

export type ProjectFee = {
  __typename?: 'ProjectFee';
  admin_charges: PriceData;
  brokerage_fee: PriceData;
};

export type ProjectMetadata = {
  __typename?: 'ProjectMetadata';
  annual_base_rent?: Maybe<Scalars['String']>;
  annual_capital_gain?: Maybe<Scalars['String']>;
  annual_operating_expenses?: Maybe<AnnualOperatingExpenses>;
  annual_returns: Scalars['String'];
  appraisal_price?: Maybe<Scalars['String']>;
  asking_price: Scalars['String'];
  average_market_value: Scalars['String'];
  cost_per_share: Scalars['String'];
  cost_per_unit: Scalars['String'];
  created_at: Scalars['String'];
  currency: Scalars['String'];
  fee?: Maybe<ProjectFee>;
  id: Scalars['ID'];
  initial_deposit_percentage?: Maybe<Scalars['String']>;
  interest_withdrawal_period?: Maybe<Scalars['String']>;
  minimum_purchase_unit: Scalars['String'];
  minimum_term: Scalars['String'];
  neighbourhood_price?: Maybe<Scalars['String']>;
  no_of_shares: Scalars['String'];
  occupancy_rate: Scalars['String'];
  project_id: Scalars['Int'];
  property_unit: Scalars['String'];
  purchase_price: Scalars['String'];
  real_annual_capital_gain?: Maybe<Scalars['String']>;
  real_asking_price?: Maybe<Scalars['String']>;
  real_daily_rate_amount?: Maybe<Scalars['String']>;
  real_neighbourhood_price?: Maybe<Scalars['String']>;
  real_occupancy_rate?: Maybe<Scalars['String']>;
  rental_revenue: Scalars['String'];
  settlement_threshold: Scalars['String'];
  shareholders?: Maybe<Scalars['Int']>;
  sold_share_amount: Scalars['Float'];
  sold_shares: Scalars['Float'];
  startup_cost?: Maybe<StartUpCost>;
  target_daily_rate_amount?: Maybe<Scalars['String']>;
  target_daily_rate_percentage?: Maybe<Scalars['String']>;
  target_rental_yield?: Maybe<Scalars['String']>;
  total_price?: Maybe<Scalars['String']>;
  update_record?: Maybe<Array<Scalars['String']>>;
  updated_at: Scalars['String'];
  uuid: Scalars['String'];
};

export type ProjectTerminology = {
  __typename?: 'ProjectTerminology';
  created_at: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  term: Scalars['String'];
  update_type: Scalars['String'];
};

export type ProjectVariant = {
  __typename?: 'ProjectVariant';
  appreciation_or_yield: Scalars['String'];
  commission: Scalars['String'];
  created_at: Scalars['String'];
  developer: Developer;
  developer_id: Scalars['Int'];
  holding_period: Scalars['String'];
  id: Scalars['ID'];
  is_default: Scalars['Int'];
  is_published: Scalars['Boolean'];
  metadata: ProjectMetadata;
  minimum_purchase: Scalars['Float'];
  plan_uuid: Scalars['String'];
  portfolio_uuid: Scalars['String'];
  price_per_share: Scalars['String'];
  project: Project;
  project_id: Scalars['Int'];
  purchase_type: Scalars['String'];
  rent_amount?: Maybe<Scalars['String']>;
  rent_payment_cycle?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updated_at: Scalars['String'];
  userPlanUuid: Scalars['String'];
  userPortfolioUuid: Scalars['String'];
  uuid: Scalars['String'];
  variant_value?: Maybe<Scalars['String']>;
};


export type ProjectVariantUserPlanUuidArgs = {
  UserId: Scalars['Int'];
};


export type ProjectVariantUserPortfolioUuidArgs = {
  UserId: Scalars['Int'];
};

/** A paginated list of ProjectVariant items. */
export type ProjectVariantPaginator = {
  __typename?: 'ProjectVariantPaginator';
  /** A list of ProjectVariant items. */
  data: Array<ProjectVariant>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type PropertyDocuments = {
  __typename?: 'PropertyDocuments';
  contract_of_sale?: Maybe<Scalars['Boolean']>;
  deed_of_assignment?: Maybe<Scalars['Boolean']>;
  deed_of_sub_lease?: Maybe<Scalars['Boolean']>;
  registered_survey?: Maybe<Scalars['Boolean']>;
};

export type PropertyTitle = {
  __typename?: 'PropertyTitle';
  c_of_o?: Maybe<Scalars['Boolean']>;
  excision?: Maybe<Scalars['Boolean']>;
  gazette?: Maybe<Scalars['Boolean']>;
  governors_consent?: Maybe<Scalars['Boolean']>;
  sub_lease?: Maybe<Scalars['Boolean']>;
};

export type PushNotification = {
  __typename?: 'PushNotification';
  created_at: Scalars['String'];
  device_token: Scalars['String'];
  device_type: Scalars['String'];
  id: Scalars['ID'];
  updated_at: Scalars['String'];
  user: User;
  user_id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  AvailableMeetingPeriods: Array<AvailablePeriods>;
  Bank?: Maybe<Bank>;
  Card?: Maybe<Card>;
  ChargeAccessCode: Scalars['String'];
  CommercialBanks: Array<CommercialBank>;
  FixedIncomeBalance: Scalars['Int'];
  HomeSavingsBalance: Scalars['Int'];
  HomeSavingsPlans: Array<Plan>;
  Notifications?: Maybe<NotificationPaginator>;
  Plan?: Maybe<Plan>;
  Portfolio?: Maybe<Portfolio>;
  Products: Array<Product>;
  Profile?: Maybe<User>;
  ProjectVariant?: Maybe<ProjectVariant>;
  ProjectVariants?: Maybe<ProjectVariantPaginator>;
  RentSavingsBalance: Scalars['Int'];
  RentSavingsPlans: Array<Plan>;
  Terminologies: Array<ProjectTerminology>;
  Transaction?: Maybe<Transaction>;
  UserBanks: Array<Bank>;
  UserCards: Array<Card>;
  UserFixedIncome: Array<Plan>;
  UserHomeSavingsPlanActivities: Array<PlanActivity>;
  UserIncomePlanActivities: Array<PlanActivity>;
  UserInvestmentBalance: Scalars['Int'];
  UserPortfolioActivities: Array<PortfolioActivity>;
  UserPortfolioBalance: Scalars['Int'];
  UserProperty: Array<Portfolio>;
  UserPropertyPlans: Array<Plan>;
  UserRentSavingsPlanActivities: Array<PlanActivity>;
  UserSavings: Array<Plan>;
  UserSavingsBalance: Scalars['Int'];
  UserTransactions?: Maybe<TransactionPaginator>;
  UserWallet?: Maybe<Wallet>;
};


export type QueryBankArgs = {
  uuid: Scalars['String'];
};


export type QueryCardArgs = {
  uuid: Scalars['String'];
};


export type QueryFixedIncomeBalanceArgs = {
  currency: Scalars['String'];
};


export type QueryHomeSavingsBalanceArgs = {
  currency: Scalars['String'];
};


export type QueryHomeSavingsPlansArgs = {
  currency: Scalars['String'];
};


export type QueryNotificationsArgs = {
  first: Scalars['Int'];
  page?: InputMaybe<Scalars['Int']>;
  user_id: Scalars['Int'];
};


export type QueryPlanArgs = {
  uuid: Scalars['String'];
};


export type QueryPortfolioArgs = {
  uuid: Scalars['String'];
};


export type QueryProductsArgs = {
  currency: Scalars['String'];
  orderBy?: InputMaybe<Array<QueryProductsOrderByOrderByClause>>;
  status: Scalars['String'];
  type: Scalars['String'];
};


export type QueryProjectVariantArgs = {
  uuid: Scalars['String'];
};


export type QueryProjectVariantsArgs = {
  first: Scalars['Int'];
  hasDeveloper?: InputMaybe<QueryProjectVariantsHasDeveloperWhereHasConditions>;
  hasMetadata?: InputMaybe<QueryProjectVariantsHasMetadataWhereHasConditions>;
  hasProject?: InputMaybe<QueryProjectVariantsHasProjectWhereHasConditions>;
  orderBy?: InputMaybe<Array<QueryProjectVariantsOrderByRelationOrderByClause>>;
  page?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<QueryProjectVariantsWhereWhereConditions>;
};


export type QueryRentSavingsBalanceArgs = {
  currency: Scalars['String'];
};


export type QueryRentSavingsPlansArgs = {
  currency: Scalars['String'];
};


export type QueryTerminologiesArgs = {
  terms?: InputMaybe<Array<Scalars['String']>>;
};


export type QueryTransactionArgs = {
  uuid: Scalars['String'];
};


export type QueryUserFixedIncomeArgs = {
  currency: Scalars['String'];
};


export type QueryUserHomeSavingsPlanActivitiesArgs = {
  currency: Scalars['String'];
  last: Scalars['Int'];
};


export type QueryUserIncomePlanActivitiesArgs = {
  currency: Scalars['String'];
  last: Scalars['Int'];
};


export type QueryUserInvestmentBalanceArgs = {
  currency: Scalars['String'];
};


export type QueryUserPortfolioActivitiesArgs = {
  currency: Scalars['String'];
  last: Scalars['Int'];
};


export type QueryUserPortfolioBalanceArgs = {
  currency: Scalars['String'];
};


export type QueryUserPropertyArgs = {
  currency: Scalars['String'];
};


export type QueryUserPropertyPlansArgs = {
  currency: Scalars['String'];
};


export type QueryUserRentSavingsPlanActivitiesArgs = {
  currency: Scalars['String'];
  last: Scalars['Int'];
};


export type QueryUserSavingsArgs = {
  currency: Scalars['String'];
};


export type QueryUserSavingsBalanceArgs = {
  currency: Scalars['String'];
};


export type QueryUserTransactionsArgs = {
  first: Scalars['Int'];
  page?: InputMaybe<Scalars['Int']>;
  user_id: Scalars['Int'];
};

/** Allowed column names for Query.Products.orderBy. */
export enum QueryProductsOrderByColumn {
  UpdatedAt = 'UPDATED_AT'
}

/** Order by clause for Query.Products.orderBy. */
export type QueryProductsOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: QueryProductsOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Allowed column names for Query.ProjectVariants.hasDeveloper. */
export enum QueryProjectVariantsHasDeveloperColumn {
  Id = 'ID'
}

/** Dynamic WHERE conditions for the `hasDeveloper` argument on the query `ProjectVariants`. */
export type QueryProjectVariantsHasDeveloperWhereHasConditions = {
  /** A set of conditions that requires all conditions to match. */
  AND?: InputMaybe<Array<QueryProjectVariantsHasDeveloperWhereHasConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: InputMaybe<QueryProjectVariantsHasDeveloperWhereHasConditionsRelation>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: InputMaybe<Array<QueryProjectVariantsHasDeveloperWhereHasConditions>>;
  /** The column that is used for the condition. */
  column?: InputMaybe<QueryProjectVariantsHasDeveloperColumn>;
  /** The operator that is used for the condition. */
  operator?: InputMaybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: InputMaybe<Scalars['Mixed']>;
};

/** Dynamic HAS conditions for WHERE conditions for the `hasDeveloper` argument on the query `ProjectVariants`. */
export type QueryProjectVariantsHasDeveloperWhereHasConditionsRelation = {
  /** The amount to test. */
  amount?: InputMaybe<Scalars['Int']>;
  /** Additional condition logic. */
  condition?: InputMaybe<QueryProjectVariantsHasDeveloperWhereHasConditions>;
  /** The comparison operator to test against the amount. */
  operator?: InputMaybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars['String'];
};

/** Allowed column names for Query.ProjectVariants.hasMetadata. */
export enum QueryProjectVariantsHasMetadataColumn {
  Currency = 'CURRENCY'
}

/** Dynamic WHERE conditions for the `hasMetadata` argument on the query `ProjectVariants`. */
export type QueryProjectVariantsHasMetadataWhereHasConditions = {
  /** A set of conditions that requires all conditions to match. */
  AND?: InputMaybe<Array<QueryProjectVariantsHasMetadataWhereHasConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: InputMaybe<QueryProjectVariantsHasMetadataWhereHasConditionsRelation>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: InputMaybe<Array<QueryProjectVariantsHasMetadataWhereHasConditions>>;
  /** The column that is used for the condition. */
  column?: InputMaybe<QueryProjectVariantsHasMetadataColumn>;
  /** The operator that is used for the condition. */
  operator?: InputMaybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: InputMaybe<Scalars['Mixed']>;
};

/** Dynamic HAS conditions for WHERE conditions for the `hasMetadata` argument on the query `ProjectVariants`. */
export type QueryProjectVariantsHasMetadataWhereHasConditionsRelation = {
  /** The amount to test. */
  amount?: InputMaybe<Scalars['Int']>;
  /** Additional condition logic. */
  condition?: InputMaybe<QueryProjectVariantsHasMetadataWhereHasConditions>;
  /** The comparison operator to test against the amount. */
  operator?: InputMaybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars['String'];
};

/** Allowed column names for Query.ProjectVariants.hasProject. */
export enum QueryProjectVariantsHasProjectColumn {
  IsPublished = 'IS_PUBLISHED'
}

/** Dynamic WHERE conditions for the `hasProject` argument on the query `ProjectVariants`. */
export type QueryProjectVariantsHasProjectWhereHasConditions = {
  /** A set of conditions that requires all conditions to match. */
  AND?: InputMaybe<Array<QueryProjectVariantsHasProjectWhereHasConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: InputMaybe<QueryProjectVariantsHasProjectWhereHasConditionsRelation>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: InputMaybe<Array<QueryProjectVariantsHasProjectWhereHasConditions>>;
  /** The column that is used for the condition. */
  column?: InputMaybe<QueryProjectVariantsHasProjectColumn>;
  /** The operator that is used for the condition. */
  operator?: InputMaybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: InputMaybe<Scalars['Mixed']>;
};

/** Dynamic HAS conditions for WHERE conditions for the `hasProject` argument on the query `ProjectVariants`. */
export type QueryProjectVariantsHasProjectWhereHasConditionsRelation = {
  /** The amount to test. */
  amount?: InputMaybe<Scalars['Int']>;
  /** Additional condition logic. */
  condition?: InputMaybe<QueryProjectVariantsHasProjectWhereHasConditions>;
  /** The comparison operator to test against the amount. */
  operator?: InputMaybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars['String'];
};

/** Allowed column names for Query.ProjectVariants.orderBy. */
export enum QueryProjectVariantsOrderByColumn {
  UpdatedAt = 'UPDATED_AT'
}

/** Aggregate specification for Query.ProjectVariants.orderBy.project. */
export type QueryProjectVariantsOrderByProject = {
  /** The aggregate function to apply to the column. */
  aggregate: OrderByRelationWithColumnAggregateFunction;
  /** Name of the column to use. */
  column?: InputMaybe<QueryProjectVariantsOrderByProjectColumn>;
};

/** Allowed column names for Query.ProjectVariants.orderBy. */
export enum QueryProjectVariantsOrderByProjectColumn {
  Featured = 'FEATURED',
  SoldOut = 'SOLD_OUT',
  Sponsored = 'SPONSORED'
}

/** Order by clause for Query.ProjectVariants.orderBy. */
export type QueryProjectVariantsOrderByRelationOrderByClause = {
  /** The column that is used for ordering. */
  column?: InputMaybe<QueryProjectVariantsOrderByColumn>;
  /** The direction that is used for ordering. */
  order: SortOrder;
  /** Aggregate specification. */
  project?: InputMaybe<QueryProjectVariantsOrderByProject>;
};

/** Allowed column names for Query.ProjectVariants.where. */
export enum QueryProjectVariantsWhereColumn {
  AppreciationOrYield = 'APPRECIATION_OR_YIELD',
  CreatedAt = 'CREATED_AT',
  IsPublished = 'IS_PUBLISHED',
  MinimumPurchase = 'MINIMUM_PURCHASE',
  PricePerShare = 'PRICE_PER_SHARE',
  Title = 'TITLE'
}

/** Dynamic WHERE conditions for the `where` argument on the query `ProjectVariants`. */
export type QueryProjectVariantsWhereWhereConditions = {
  /** A set of conditions that requires all conditions to match. */
  AND?: InputMaybe<Array<QueryProjectVariantsWhereWhereConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: InputMaybe<QueryProjectVariantsWhereWhereConditionsRelation>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: InputMaybe<Array<QueryProjectVariantsWhereWhereConditions>>;
  /** The column that is used for the condition. */
  column?: InputMaybe<QueryProjectVariantsWhereColumn>;
  /** The operator that is used for the condition. */
  operator?: InputMaybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: InputMaybe<Scalars['Mixed']>;
};

/** Dynamic HAS conditions for WHERE conditions for the `where` argument on the query `ProjectVariants`. */
export type QueryProjectVariantsWhereWhereConditionsRelation = {
  /** The amount to test. */
  amount?: InputMaybe<Scalars['Int']>;
  /** Additional condition logic. */
  condition?: InputMaybe<QueryProjectVariantsWhereWhereConditions>;
  /** The comparison operator to test against the amount. */
  operator?: InputMaybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars['String'];
};

export type RefereeProfile = {
  __typename?: 'RefereeProfile';
  clicks: Array<Click>;
  conversions: Array<Conversion>;
  created_at: Scalars['String'];
  id: Scalars['ID'];
  referral_code: Scalars['String'];
  referral_users: Array<ReferralUser>;
  super_agent_code: Scalars['String'];
  total_clicks: Scalars['Int'];
  total_clients: Scalars['Int'];
  total_commission: Scalars['Float'];
  type: Scalars['String'];
  updated_at: Scalars['String'];
  user: User;
  user_id: Scalars['Int'];
  uuid: Scalars['String'];
  withdrawn: Scalars['String'];
};

export type ReferralUser = {
  __typename?: 'ReferralUser';
  conversions: Array<Conversion>;
  created_at: Scalars['String'];
  id: Scalars['ID'];
  plans: Array<Plan>;
  plans_count: Scalars['Int'];
  portfolios: Array<Portfolio>;
  portfolios_count: Scalars['Int'];
  referee: RefereeProfile;
  referral_code: Scalars['String'];
  total_conversions: Scalars['String'];
  transactions: Array<Transaction>;
  updated_at: Scalars['String'];
  user: User;
  user_id: Scalars['Int'];
  uuid: Scalars['String'];
};

/** The available SQL operators that are used to filter query results. */
export enum SqlOperator {
  /** Whether a value is within a range of values (`BETWEEN`) */
  Between = 'BETWEEN',
  /** Equal operator (`=`) */
  Eq = 'EQ',
  /** Greater than operator (`>`) */
  Gt = 'GT',
  /** Greater than or equal operator (`>=`) */
  Gte = 'GTE',
  /** Whether a value is within a set of values (`IN`) */
  In = 'IN',
  /** Whether a value is not null (`IS NOT NULL`) */
  IsNotNull = 'IS_NOT_NULL',
  /** Whether a value is null (`IS NULL`) */
  IsNull = 'IS_NULL',
  /** Simple pattern matching (`LIKE`) */
  Like = 'LIKE',
  /** Less than operator (`<`) */
  Lt = 'LT',
  /** Less than or equal operator (`<=`) */
  Lte = 'LTE',
  /** Not equal operator (`!=`) */
  Neq = 'NEQ',
  /** Whether a value is not within a range of values (`NOT BETWEEN`) */
  NotBetween = 'NOT_BETWEEN',
  /** Whether a value is not within a set of values (`NOT IN`) */
  NotIn = 'NOT_IN',
  /** Negation of simple pattern matching (`NOT LIKE`) */
  NotLike = 'NOT_LIKE'
}

export type SavedProject = {
  __typename?: 'SavedProject';
  created_at: Scalars['String'];
  id: Scalars['ID'];
  project: Project;
  project_id: Scalars['Int'];
  updated_at: Scalars['String'];
  user: User;
  user_id: Scalars['Int'];
};

/** Information about pagination using a simple paginator. */
export type SimplePaginatorInfo = {
  __typename?: 'SimplePaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Number of items per page. */
  perPage: Scalars['Int'];
};

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

export type StartUpCost = {
  __typename?: 'StartUpCost';
  agent_fee: PriceData;
  cap_rate: Scalars['String'];
  closing_cost: PriceData;
  home_furnishing: PriceData;
  home_improvements: PriceData;
  legal_and_valuation_fee: PriceData;
  net_operating_income: Scalars['String'];
  operating_expenses: Scalars['String'];
  others: PriceData;
  total_startup_cost_amount: Scalars['String'];
  total_startup_cost_percentage: Scalars['String'];
};

export type Transaction = {
  __typename?: 'Transaction';
  admission_fee: Scalars['Float'];
  agent_commission: Scalars['Float'];
  amount: Scalars['Float'];
  campaign_fee: Scalars['Float'];
  charge_id: Scalars['Int'];
  chargeable_type: Scalars['String'];
  charges: Scalars['Float'];
  created_at: Scalars['String'];
  currency: Scalars['String'];
  description: Scalars['String'];
  dr_or_cr: Scalars['String'];
  gateway: Scalars['String'];
  id: Scalars['ID'];
  plan?: Maybe<Plan>;
  platform_fee: Scalars['Float'];
  portfolio?: Maybe<Portfolio>;
  reference: Scalars['String'];
  status: Scalars['String'];
  transaction_fee: Scalars['Float'];
  updated_at: Scalars['String'];
  user: User;
  user_id: Scalars['Int'];
  uuid: Scalars['String'];
  wallet: Wallet;
  wallet_balance: Scalars['Float'];
  wallet_id: Scalars['Int'];
};

/** A paginated list of Transaction items. */
export type TransactionPaginator = {
  __typename?: 'TransactionPaginator';
  /** A list of Transaction items. */
  data: Array<Transaction>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** User Types */
export type User = {
  __typename?: 'User';
  activity_log: Array<ActivityLog>;
  auth_user_id: Scalars['Int'];
  banks: Array<Bank>;
  cards: Array<Card>;
  created_at: Scalars['String'];
  email: Scalars['String'];
  email_is_verified: Scalars['Boolean'];
  first_name: Scalars['String'];
  full_name: Scalars['String'];
  id: Scalars['Int'];
  is_verified: Scalars['Boolean'];
  last_name: Scalars['String'];
  last_seen: Scalars['String'];
  notifications: Array<Maybe<Notification>>;
  phone?: Maybe<Scalars['String']>;
  phone_is_verified: Scalars['Int'];
  phone_number?: Maybe<Scalars['String']>;
  plans: Array<Plan>;
  portfolios: Array<Portfolio>;
  profile: Profile;
  push_notifications: Array<PushNotification>;
  referee_profile: RefereeProfile;
  referral: ReferralUser;
  saved_project: Array<SavedProject>;
  transactions: Array<Transaction>;
  updated_at: Scalars['String'];
  user_referred: Scalars['Boolean'];
  uuid: Scalars['String'];
  wallet: Wallet;
  withdrawal_request: Array<WithdrawalRequest>;
};

export type UserNok = {
  __typename?: 'UserNOK';
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  phone_number?: Maybe<Scalars['String']>;
  relationship?: Maybe<Scalars['String']>;
  sex?: Maybe<Scalars['String']>;
};

export type Waitlist = {
  __typename?: 'Waitlist';
  created_at: Scalars['String'];
  id: Scalars['ID'];
  project: Project;
  project_id: Scalars['Int'];
  project_variant_id: Scalars['Int'];
  shares: Scalars['String'];
  updated_at: Scalars['String'];
  user: User;
  user_id: Scalars['Int'];
};

export type Wallet = {
  __typename?: 'Wallet';
  banks?: Maybe<Array<Bank>>;
  cards?: Maybe<Array<Card>>;
  created_at: Scalars['String'];
  credited_amount: Scalars['Float'];
  debited_amount: Scalars['Float'];
  id: Scalars['ID'];
  locked_balance: Scalars['Float'];
  total_balance: Scalars['Float'];
  transactions?: Maybe<TransactionPaginator>;
  updated_at: Scalars['String'];
  usd_balance: Scalars['String'];
  usd_credited_amount?: Maybe<Scalars['String']>;
  usd_debited_amount?: Maybe<Scalars['String']>;
  user: User;
  user_id: Scalars['Int'];
  uuid: Scalars['String'];
  virtual_account_bank?: Maybe<Scalars['String']>;
  virtual_account_expiry?: Maybe<Scalars['String']>;
  virtual_account_number?: Maybe<Scalars['String']>;
  virtual_account_provider?: Maybe<Scalars['String']>;
  virtual_account_reference?: Maybe<Scalars['String']>;
  virtual_account_status?: Maybe<Scalars['String']>;
  wallet_account?: Maybe<WalletAccount>;
};


export type WalletTransactionsArgs = {
  first: Scalars['Int'];
  orderBy?: InputMaybe<Array<WalletTransactionsOrderByOrderByClause>>;
  page?: InputMaybe<Scalars['Int']>;
};

export type WalletAccount = {
  __typename?: 'WalletAccount';
  accountNo: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  middlename: Scalars['String'];
};

export type WalletTopup = {
  __typename?: 'WalletTopup';
  admin_user: User;
  admin_user_id: Scalars['Int'];
  amount: Scalars['String'];
  created_at: Scalars['String'];
  id: Scalars['ID'];
  payment_evidence: Scalars['String'];
  purpose: Scalars['String'];
  updated_at: Scalars['String'];
  user: User;
  user_id: Scalars['Int'];
  uuid: Scalars['String'];
};

/** Allowed column names for Wallet.transactions.orderBy. */
export enum WalletTransactionsOrderByColumn {
  CreatedAt = 'CREATED_AT'
}

/** Order by clause for Wallet.transactions.orderBy. */
export type WalletTransactionsOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: WalletTransactionsOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
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
  column?: InputMaybe<Scalars['String']>;
  /** The operator that is used for the condition. */
  operator?: InputMaybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: InputMaybe<Scalars['Mixed']>;
};

/** Dynamic HAS conditions for WHERE condition queries. */
export type WhereConditionsRelation = {
  /** The amount to test. */
  amount?: InputMaybe<Scalars['Int']>;
  /** Additional condition logic. */
  condition?: InputMaybe<WhereConditions>;
  /** The comparison operator to test against the amount. */
  operator?: InputMaybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars['String'];
};

export type WithdrawalRequest = {
  __typename?: 'WithdrawalRequest';
  amount: Scalars['String'];
  created_at: Scalars['String'];
  finalized: Scalars['Boolean'];
  id: Scalars['ID'];
  status: Scalars['String'];
  updated_at: Scalars['String'];
  user: User;
  user_id: Scalars['Int'];
};
