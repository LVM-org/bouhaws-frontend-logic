import { $api } from '../../services'
import { CombinedError } from 'urql'
import Common from './Common'
import {
  MutationSignUpArgs,
  MutationSignInArgs,
  MutationResendVerifyEmailArgs,
  MutationSendResetPasswordEmailArgs,
  MutationUpdatePasswordArgs,
  MutationVerifyEmailOtpArgs,
  User,
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

  // Base variables
  public AccessToken: string | null = null
  public AuthUser: User | undefined = undefined

  // mutation payloads
  public SignUpPayload: MutationSignUpArgs
  public SignInPayload: MutationSignInArgs
  public ResendVerifyEmailPayload: MutationResendVerifyEmailArgs
  public ResetPasswordEmailPayload: MutationSendResetPasswordEmailArgs
  public UpdatePasswordPayload: MutationUpdatePasswordArgs
  public VerifyEmailOtpPayload: MutationVerifyEmailOtpArgs

  // Queries
  public GetAuthUser = () => {
    return $api.auth.GetAuthUser().then((response) => {
      if (response.data?.AuthUser) {
        this.AuthUser = response.data?.AuthUser
        localStorage.setItem('auth_user', JSON.stringify(this.AuthUser))
        localStorage.setItem('account_type', this.AuthUser.profile.type)
      } else {
        localStorage.removeItem('auth_user')
        Logic.Common.GoToRoute('/auth/login')
      }
      return response.data
    })
  }

  public setDefaultAuth = () => {
    this.AccessToken = localStorage.getItem('access_token')
    this.AuthUser = localStorage.getItem('auth_user')
      ? JSON.parse(localStorage.getItem('auth_user') || '{}')
      : undefined
  }

  // Mutations
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

  public SignUp = (formIsValid: boolean) => {
    if (formIsValid) {
      Logic.Common.showLoader({
        loading: true,
      })
      return $api.auth
        .SignUp(this.SignUpPayload)
        .then((response) => {
          this.AuthUser = response.data?.SignUp
          localStorage.setItem('auth_email', this.SignUpPayload.email)
          Logic.Common.hideLoader()
          return response.data.SignUp
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }

  public SignIn = (formIsValid: boolean) => {
    if (formIsValid) {
      Logic.Common.showLoader({
        loading: true,
      })
      return $api.auth
        .SignIn(this.SignInPayload)
        .then((response) => {
          this.SetUpAuth(response.data.SignIn)
          this.AuthUser = response.data?.SignIn.user

          this.GetAuthUser().then(() => {
            Logic.Common.GoToRoute('/')
            Logic.Common.hideLoader()
          })
          return response.data.SignIn
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }

  public ResendVerifyEmail = () => {
    Logic.Common.showLoader({
      loading: true,
    })
    return $api.auth
      .ResendVerifyEmail(this.ResendVerifyEmailPayload)
      .then((response) => {
        Logic.Common.hideLoader()
        response.data.ResendVerifyEmail
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  public SendResetPasswordEmail = (formIsValid: boolean) => {
    if (formIsValid) {
      Logic.Common.showLoader({
        loading: true,
      })
      return $api.auth
        .SendResetPasswordEmail(this.ResetPasswordEmailPayload)
        .then((response) => {
          Logic.Common.hideLoader()
          return response.data.SendResetPasswordEmail
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }

  public UpdatePassword = (formIsValid: boolean) => {
    if (formIsValid) {
      Logic.Common.showLoader({
        loading: true,
      })
      return $api.auth
        .UpdatePassword(this.UpdatePasswordPayload)
        .then((response) => {
          Logic.Common.hideLoader()
          return response.data.UpdatePassword
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }

  public VerifyEmailOtp = (formIsValid: boolean) => {
    if (formIsValid) {
      Logic.Common.showLoader({
        loading: true,
      })
      return $api.auth
        .VerifyEmailOtp(this.VerifyEmailOtpPayload)
        .then((response) => {
          this.AuthUser = response.data?.VerifyEmailOtp
          Logic.Common.hideLoader()
          response.data.VerifyEmailOtp
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }

  public SignOut = () => {
    $api.auth
      .SignOut()
      .then((response) => {
        localStorage.removeItem('AuthTokens')
        localStorage.removeItem('auth_user')
        Logic.Common.GoToRoute('/auth/login')
      })
      .catch((error) => {
        //
      })
  }
}
