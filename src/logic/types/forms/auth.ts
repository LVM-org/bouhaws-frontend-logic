export interface SignUpForm {
	phone_number: string,
	password: string
}

export interface SignInForm {
	password: string,
	email: string
}

export interface VerifyPhoneOTPForm {
	user_uuid: string,
	otp: string
}

export interface ResendPhoneOTPForm {
	user_uuid: string,
	phone_number: string
}

export interface PersonalizeAccountForm {
	user_uuid: string,
	first_name: string,
	last_name: string,
	email: string,
	password: string
}

export interface ResendVerifyEmailForm {
	user_uuid: string
}

export interface SendResetPasswordEmailForm {
	user_uuid: string
}

export interface UpdatePasswordForm {
	user_uuid: string
	password: string
}
