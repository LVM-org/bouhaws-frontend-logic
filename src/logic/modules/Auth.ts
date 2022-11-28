import { $api } from "../../services"
import { AuthResponse, AuthUser } from "../../gql/graphql"
import { CombinedError } from "urql"
import Common from "./Common"
import {
	SignUpForm,
	SignInForm,
	VerifyPhoneOTPForm,
	ResendPhoneOTPForm,
	PersonalizeAccountForm,
	ResendVerifyEmailForm,
	SendResetPasswordEmailForm,
	UpdatePasswordForm
} from "../types/forms/auth"
import { Logic } from ".."

export default class Auth extends Common {

	constructor() {
		super()
		this.AccessToken = localStorage.getItem('access_token')
		this.AuthUser = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user') || '{}') : undefined
	}

	public AccessToken: string | null = null
	public AuthUser: AuthUser | undefined = undefined

	public SignUpForm: SignUpForm = {
		password: '',
		phone_number: ''
	}

	public SignInForm: SignInForm = {
		email: '',
		password: ''
	}

	public VerifyPhoneOTPForm: VerifyPhoneOTPForm = {
		otp: '',
		user_uuid: ''
	}

	public ResendPhoneOTPForm: ResendPhoneOTPForm = {
		phone_number: '',
		user_uuid: ''
	}

	public PersonalizeAccountForm: PersonalizeAccountForm = {
		email: '',
		first_name: '',
		last_name: '',
		password: '',
		user_uuid: ''
	}

	public ResendVerifyEmailForm: ResendVerifyEmailForm = {
		user_uuid: ''
	}

	public SendResetPasswordEmailForm: SendResetPasswordEmailForm = {
		user_uuid: ''
	}

	public UpdatePasswordForm: UpdatePasswordForm = {
		user_uuid: '',
		password: ''
	}

	public setUpIsDone = (type: 'set_passcode' | 'verify_email' | 'transaction_pin' | 'verify_identity' | 'biometrics') => {
		if (type == 'set_passcode') {
			if (localStorage.getItem('passcode')) {
				return true
			} else {
				return false
			}
		}

		if (type == 'verify_email') {
			if (this.AuthUser?.email_verified_at) {
				return true
			} else {
				return false
			}
		}

		if (type == 'transaction_pin') {
			if (Logic.User.Profile?.profile.pin_set_at) {
				return true
			} else {
				return false
			}
		}

		if (type == 'verify_identity') {
			if (Logic.User.Profile?.is_verified) {
				return true
			} else {
				return false
			}
		}

		if (type == 'biometrics') {
			if (localStorage.getItem('biometrics')) {
				return true
			} else {
				return false
			}
		}

	}

	public verificationIsDone = () => {
		const allVerifications = ['set_passcode', 'verify_email', 'transaction_pin', 'verify_identity', 'biometrics']
		let finalStatus = true
		allVerifications.forEach((type: any) => {
			const verificationStatus = this.setUpIsDone(type)
			if (verificationStatus == false) {
				finalStatus = false
			}
		})

		return finalStatus
	}

	private SetUpAuth = (AuthResponse: AuthResponse | undefined) => {
		if (AuthResponse) {
			this.AccessToken = AuthResponse.token
			this.AuthUser = AuthResponse.user
			// save to localstorage
			localStorage.setItem('access_token', this.AccessToken)
			localStorage.setItem('auth_user', JSON.stringify(this.AuthUser))
		}
	}

	public SignUp = (formIsValid: boolean) => {
		if (formIsValid) {
			Logic.Common.showLoader({
				loading: true,
				show: true,
				useModal: true
			})
			$api.auth.SignUp(this.SignUpForm).then((response) => {
				this.AuthUser = response.data?.SignUp
				localStorage.setItem('auth_user', JSON.stringify(this.AuthUser))
				localStorage.setItem('acc_password', this.SignInForm.password);
				Logic.Common.hideLoader()
				Logic.Common.GoToRoute('/onboarding/verify-phone-otp');
			}).catch((error: CombinedError) => {
				Logic.Common.showError(error, "Oops!", "error-alert")
			})
		}
	}

	public SignIn = (formIsValid: boolean) => {
		if (formIsValid) {
			Logic.Common.showLoader({
				show: true,
				useModal: true,
				loading: true
			})
			$api.auth.SignIn(this.SignInForm).then((response) => {
				if (response.data?.SignIn) {
					this.SetUpAuth(response.data.SignIn)
					Logic.Common.GoToRoute('/')
					Logic.Common.hideLoader()
				}
			}).catch((error: CombinedError) => {
				Logic.Common.showError(error, "Oops!", "error-alert")
			})
		}
	}

	public VerifyPhoneOTP = (formIsValid: boolean) => {
		if (formIsValid) {
			Logic.Common.showLoader({
				loading: true,
				show: true,
				useModal: true
			})
			$api.auth.VerifyPhoneOTP(this.VerifyPhoneOTPForm).then((response) => {
				this.AuthUser = this.updatedData(this.AuthUser, response.data?.VerifyPhoneOTP)
				Logic.Common.hideLoader()
				Logic.Common.GoToRoute('/onboarding/personalize');
			}).catch((error: CombinedError) => {
				Logic.Common.showError(error, "Oops!", "error-alert")
			})
		}
	}

	public ResendPhoneOTP = () => {
		Logic.Common.showLoader({
			loading: true,
			show: true,
			useModal: true
		})
		$api.auth.ResendPhoneOTP(this.ResendPhoneOTPForm).then((response) => {
			Logic.Common.showLoader({
				loading: false,
				show: true,
				useModal: true,
				icon: "success-kite",
				title: "Success",
				message: "Phone verification OTP resent"
			})
		}).catch((error: CombinedError) => {
			Logic.Common.showError(error, "Oops!", "error-alert")
		})
	}

	public PersonalizeAccount = (formIsValid: boolean) => {
		if (formIsValid) {
			Logic.Common.showLoader({
				loading: true,
				show: true,
				useModal: true
			})
			$api.auth.PersonalizeAccount(this.PersonalizeAccountForm).then((response) => {
				this.SetUpAuth(response.data?.PersonalizeAccount)
				this.AuthUser = this.updatedData(this.AuthUser, response.data?.PersonalizeAccount.user)
				localStorage.setItem('acc_email', this.PersonalizeAccountForm.email);
				Logic.Common.hideLoader()
				Logic.Common.GoToRoute('/onboarding/set-passcode');
				Logic.User.GetProfile()
			}).catch((error: CombinedError) => {
				Logic.Common.showError(error, "Oops!", "error-alert")
			})
		}

	}

	public ResendVerifyEmail = (formIsValid: boolean) => {
		if (formIsValid) {
			Logic.Common.showLoader({
				loading: true,
				show: true,
				useModal: true
			})
			$api.auth.ResendVerifyEmail(this.ResendVerifyEmailForm).then((response) => {
				Logic.Common.showLoader({
					loading: false,
					show: true,
					useModal: true,
					icon: "success-kite",
					title: "Success",
					message: "Email verification link was sent to your email"
				})
			}).catch((error: CombinedError) => {
				Logic.Common.showError(error, "Oops!", "error-alert")
			})
		}
	}

	public SendResetPasswordEmail = (formIsValid: boolean) => {
		if (formIsValid) {
			Logic.Common.showLoader({
				loading: true,
				show: true,
				useModal: true
			})
			$api.auth.SendResetPasswordEmail(this.SendResetPasswordEmailForm).then((response) => {
				Logic.Common.showLoader({
					loading: false,
					show: true,
					useModal: true,
					icon: "success-kite",
					title: "Success",
					message: "Password Reset link was sent to your email"
				})
			}).catch((error: CombinedError) => {
				Logic.Common.showError(error, "Oops!", "error-alert")
			})
		}
	}

	public UpdatePassword = (formIsValid: boolean) => {
		if (formIsValid) {
			Logic.Common.showLoader({
				loading: true,
				show: true,
				useModal: true
			})
			$api.auth.UpdatePassword(this.UpdatePasswordForm).then((response) => {
				Logic.Common.showLoader({
					loading: false,
					show: true,
					useModal: true,
					icon: "success-kite",
					title: "Success",
					message: "Your password was updated"
				})
				Logic.Common.GoToRoute('/auth/login')

			}).catch((error: CombinedError) => {
				Logic.Common.showError(error, "Oops!", "error-alert")
			})
		}
	}
}