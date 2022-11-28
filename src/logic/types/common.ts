export interface FormRule {
	type: 'isRequired' | 'isGreaterThan' | 'isLessThan' | 'isEqualsTo' | 'isGreaterThanOrEqualsTo' | 'isLessThanOrEqualsTo' | 'isRegex' | 'isCondition'
	value: any | undefined
	errorMessage: string | undefined
}

export interface SelectOption {
	key: any,
	value: string,
	extras?: string,
	hasIcon?: boolean,
	isImage?: boolean
}

export interface LoaderSetup {
	show: boolean,
	useModal: boolean,
	loading: boolean,
	hasError?: boolean,
	message?: string,
	ctaText?: string,
	ctaFunction?: any
	icon?: 'success-kite' | 'error-kite' | 'error-alert' | 'success-thumb'
	title?: string
}
