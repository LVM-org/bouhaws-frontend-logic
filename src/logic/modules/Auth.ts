import { $api } from '../../services'
import { CombinedError } from 'urql'
import Common from './Common'
import {  
  MutationSignUpArgs, 
  MutationSignInArgs,
  MutationResendVerifyEmailArgs,
  MutationSendResetPasswordEmailArgs,
  MutationUpdatePasswordArgs,
  MutationVerifyEmailOtpArgs
} from '../../gql/graphql'  
import { Logic } from '..'

export default class Auth extends Common {
  constructor() {
    super()
    this.AccessToken = localStorage.getItem('access_token')
    this.AuthUser = localStorage.getItem('auth_user')
      ? JSON.parse(localStorage.getItem('auth_user') || '{}')
      : undefined
  }
 
  public AccessToken: string | null = null
  public AuthUser: any | undefined = undefined 

  public SignUpPayload: MutationSignUpArgs = { 
    email: '',
    password: '',
    username: ''
  }  
  public SignInPayload: MutationSignInArgs = { 
    email: '',
    password: '', 
  } 
  public ResendVerifyEmailPayload: MutationResendVerifyEmailArgs = { user_uuid: '' }
  public ResetPasswordEmailPayload: MutationSendResetPasswordEmailArgs = { email: '' }
  public UpdatePasswordPayload: MutationUpdatePasswordArgs = { 
    old_password: '',
    password: '', 
    otp: '', 
    user_uuid: '', 
  }
  public VerifyEmailOtpPayload: MutationVerifyEmailOtpArgs = { 
    email: '',
    otp: '', 
  }


  private SetUpAuth = (AuthResponse: any | undefined) => {
    if (AuthResponse) {
      this.AccessToken = AuthResponse.token
      this.AuthUser = AuthResponse.user
      // save to localstorage
      localStorage.setItem(
        'access_token',
        this.AccessToken ? this.AccessToken : '',
      )
      localStorage.setItem('auth_user', JSON.stringify(this.AuthUser))
    }
  }

  // 
  public SignUp = (formIsValid: boolean) => {
    if (formIsValid) {
      Logic.Common.showLoader({ loading: true, show: true, useModal: true })
      $api.auth
        .SignUp(this.SignUpPayload)
        .then((response) => {
          this.AuthUser = response.data?.SignUp
          console.log("signup  response", response)
          Logic.Common.hideLoader()
          Logic.Common.GoToRoute('/')
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  } 

  // 
  public SignIn = (formIsValid: boolean) => {
    if (formIsValid) {
      Logic.Common.showLoader({ loading: true, show: true, useModal: true })
      $api.auth
        .SignIn(this.SignInPayload)
        .then((response) => {
          this.AuthUser = response.data?.SignIn
          console.log("signin  response", response)
          Logic.Common.hideLoader()
          Logic.Common.GoToRoute('/')
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }
 
  // 
  public ResendVerifyEmail = () => {
    Logic.Common.showLoader({ loading: true, show: true, useModal: true })
    $api.auth
      .ResendVerifyEmail(this.ResendVerifyEmailPayload)
      .then((response) => {
        this.AuthUser = response.data?.ResendVerifyEmail
        console.log("ResendVerifyEmail  response", response)
        Logic.Common.hideLoader() 
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      }) 
  }
  
  // 
  public SendResetPasswordEmail = (formIsValid: boolean) => {
    if (formIsValid) {
      Logic.Common.showLoader({ loading: true, show: true, useModal: true })
      $api.auth
        .SendResetPasswordEmail(this.ResetPasswordEmailPayload)
        .then((response) => {
          this.AuthUser = response.data?.SendResetPasswordEmail
          console.log("SendResetPasswordEmail  response", response)
          Logic.Common.hideLoader() 
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }
 
  // 
  public UpdatePassword = (formIsValid: boolean) => {
    if (formIsValid) {
      Logic.Common.showLoader({ loading: true, show: true, useModal: true })
      $api.auth
        .UpdatePassword(this.UpdatePasswordPayload)
        .then((response) => {
          this.AuthUser = response.data?.UpdatePassword
          console.log("UpdatePassword  response", response)
          Logic.Common.hideLoader() 
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }
 
  // 
  public VerifyEmailOtp = (formIsValid: boolean) => {
    if (formIsValid) {
      Logic.Common.showLoader({ loading: true, show: true, useModal: true })
      $api.auth
        .VerifyEmailOtp(this.VerifyEmailOtpPayload)
        .then((response) => {
          this.AuthUser = response.data?.VerifyEmailOtp
          console.log("VerifyEmailOtp  response", response)
          Logic.Common.hideLoader() 
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  } 
}
