import { $api } from '../../services'
import { CombinedError } from 'urql'
import Common from './Common'
import { SignUpForm, SignInForm } from '../types/forms/auth'
import { Logic } from '..'

export default class Auth extends Common {
  constructor() {
    super()
  }

  public AccessToken: string | null = null
  public AuthUser: any | undefined = undefined

  public SetAuthDataFromLocal = () => {
    this.AccessToken = localStorage?.getItem('access_token')
    this.AuthUser = localStorage?.getItem('auth_user')
      ? JSON.parse(localStorage?.getItem('auth_user') || '{}')
      : undefined
  }

  public SignUpForm: SignUpForm = {
    password: '',
    phone_number: '',
  }

  public SignInForm: SignInForm = {
    email: '',
    password: '',
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

  public SignUp = (formIsValid: boolean) => {
    if (formIsValid) {
      Logic.Common.showLoader({
        loading: true,
        show: true,
        useModal: true,
      })
      $api.auth
        .SignUp(this.SignUpForm)
        .then((response) => {
          this.AuthUser = response.data?.SignUp
          Logic.Common.hideLoader()
          Logic.Common.GoToRoute('/')
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }

  public SignIn = (formIsValid: boolean) => {
    if (formIsValid) {
      Logic.Common.showLoader({
        show: true,
        useModal: true,
        loading: true,
      })
      $api.auth
        .SignIn(this.SignInForm)
        .then((response) => {
          if (response.data?.SignIn) {
            this.SetUpAuth(response.data.SignIn)
            Logic.Common.GoToRoute('/')
            Logic.Common.hideLoader()
          }
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, 'Oops!', 'error-alert')
        })
    }
  }
}
