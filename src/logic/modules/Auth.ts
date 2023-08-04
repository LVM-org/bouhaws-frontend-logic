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
    $api.auth.GetAuthUser().then((response) => {
      if (response.data?.GetAuthUser) {
        this.AuthUser = response.data?.GetAuthUser
        localStorage.setItem('auth_user', JSON.stringify(this.AuthUser))
      } else {
        localStorage.removeItem('auth_user')
        Logic.Common.GoToRoute('/auth/login')
      }
    })
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
        show: true,
        useModal: true,
      })
      $api.auth
        .SignUp(this.SignUpPayload)
        .then((response) => {
          this.SetUpAuth(response.data)
          this.AuthUser = response.data?.SignUp.user
          Logic.Common.hideLoader()
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
        show: true,
        useModal: true,
      })
      $api.auth
        .SignIn(this.SignInPayload)
        .then((response) => {
          this.SetUpAuth(response.data)
          this.AuthUser = response.data?.SignIn.user
          Logic.Common.hideLoader()
          Logic.Common.GoToRoute('/')
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }

  public ResendVerifyEmail = () => {
    Logic.Common.showLoader({
      loading: true,
      show: true,
      useModal: true,
    })
    $api.auth
      .ResendVerifyEmail(this.ResendVerifyEmailPayload)
      .then((response) => {
        Logic.Common.hideLoader()
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, 'Oops!', 'error-alert')
      })
  }

  public SendResetPasswordEmail = (formIsValid: boolean) => {
    if (formIsValid) {
      Logic.Common.showLoader({
        loading: true,
        show: true,
        useModal: true,
      })
      $api.auth
        .SendResetPasswordEmail(this.ResetPasswordEmailPayload)
        .then((response) => {
          Logic.Common.hideLoader()
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
        show: true,
        useModal: true,
      })
      $api.auth
        .UpdatePassword(this.UpdatePasswordPayload)
        .then((response) => {
          Logic.Common.hideLoader()
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
        show: true,
        useModal: true,
      })
      $api.auth
        .VerifyEmailOtp(this.VerifyEmailOtpPayload)
        .then((response) => {
          this.AuthUser = response.data?.VerifyEmailOtp

          Logic.Common.hideLoader()
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
