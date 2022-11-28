import currency from "currency.js"
import moment from "moment"
import { CombinedError } from "urql"
import { reactive } from "vue"
import { NavigationGuardNext, RouteLocationNormalized, Router } from "vue-router"
import { Logic } from ".."
import { LoaderSetup } from "../types/common"

export default class Common {
	public router: Router | undefined = undefined

	public apiUrl: string | undefined = undefined

	public watchInterval: number | undefined = undefined

	public loadingState = false

	public SetRouter = (router: Router) => {
		this.router = router
	}

	public loaderSetup: LoaderSetup = reactive({
		show: false,
		useModal: false,
		hasError: false,
		loading: false,
		message: '',
		ctaText: '',
		ctaFunction: () => { },
		icon: 'success-thumb',
		title: ''
	})

	public SetApiUrl = (apiUrl: string) => {
		this.apiUrl = apiUrl;
	}

	public GoToRoute = (path: string) => {
		this.router?.push(path)
	}

	public showError = (error: CombinedError, title: string, icon: 'error-alert' | 'error-kite' | 'success-kite' | 'success-thumb', fallbackMsg = '') => {
		const message = error.graphQLErrors[0].message
		this.showLoader({
			show: true,
			useModal: true,
			loading: false,
			hasError: true,
			message: message != 'null' ? message : fallbackMsg,
			icon,
			title
		})
	}

	public getLabel = (data: any, key: string) => {
		const thisData = data.filter((Option: any) => {
			return Option.key == key;
		});

		return thisData.length > 0 ? thisData[0].value : "";
	};

	public showLoader = (loaderSetup: LoaderSetup) => {
		this.loaderSetup = loaderSetup
	}

	public goBack = () => {

		window.history.length > 1 ? this.router?.go(-1) : this.router?.push("/");

	};

	public hideLoader = () => {
		const Loader: LoaderSetup = {
			show: false,
			useModal: false,
			loading: false
		}
		this.loaderSetup = Loader
	}

	public globalParameters = reactive<{
		currency: string
	}>({
		currency: 'ngn'
	})

	public momentInstance = moment

	public convertToMoney = (float: any, withZeros = true, currencyType = 'ngn', withSymbol = true) => {
		let currencySymbol = '';
		if (currencyType == 'usd') {
			currencySymbol = '$ ';
		} else if (currencyType == 'ngn') {
			currencySymbol = '₦ ';
		}
		if (!withSymbol) {
			currencySymbol = ''
		}
		if (withZeros) {
			return currency(float, { separator: ",", symbol: currencySymbol }).format();
		} else {
			return currencySymbol + new Intl.NumberFormat().format(
				parseFloat(float)
			)
		}

	};

	private isString = (x: any) => {
		return Object.prototype.toString.call(x) === "[object String]"
	}

	public searchArray = (arr: any[], searchKey: string) => {
		return arr.filter((obj) => {
			return Object.keys(obj).some((key) => {
				return this.isString(obj[key]) ? obj[key].includes(searchKey) : false
			})
		});
	}

	public debounce = (method = () => {
		//
	}, delay = 500) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		if (typeof window.LIT !== "undefined") {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			clearTimeout(window.LIT);
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		window.LIT = setTimeout(() => {
			method()
		}, delay);
	}

	public watchProperty = (objectToWatch: any, objectToUpdate: any) => {
		let upatedValue = (this as any)[`${objectToWatch}`];
		const watchAction = () => {
			upatedValue = (this as any)[`${objectToWatch}`];
			if (objectToUpdate) {
				objectToUpdate.value = upatedValue;
			}
			this.watchInterval = window.requestAnimationFrame(watchAction)
		}

		watchAction()
	}

	public stopWatchAction = () => {
		if (this.watchInterval != undefined) {
			window.cancelAnimationFrame(this.watchInterval);
		}
	}

	private fetchFile = (url: string) => {
		return new Promise(function (resolve, reject) {
			// Get file name from url.
			const xhr = new XMLHttpRequest();
			xhr.responseType = 'blob';
			xhr.onload = function () {
				resolve(xhr);
			};
			xhr.onerror = reject;
			xhr.open('GET', url);
			xhr.send();
		}).then(function (xhr: any) {
			const filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
			const a = document.createElement('a');
			a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
			a.download = filename; // Set the file name.
			a.style.display = 'none';
			document.body.appendChild(a);
			a.click();
			return xhr;
		});
	}

	public downloadFiles = (urls = []) => {
		return Promise.all(urls.map(this.fetchFile));
	}

	public fomartDate = (date: string, format: string) => {
		return moment(date).format(format)
	}

	public countDownTime = (endTime: string) => {
		return moment(moment(endTime).diff(moment.now())).format('mm:ss')
	}

	public timeFromNow = (time: string) => {
		return moment(time).fromNow()
	}

	public updatedData = (oldData: any, newData: any) => {
		if (oldData != undefined && newData != undefined) {
			return { ...oldData, ...newData }
		}
		return oldData;
	}

	public preFetchRouteData = (routeTo: RouteLocationNormalized, next: NavigationGuardNext, routeFrom: RouteLocationNormalized) => {
		const allActions: Promise<any>[] = []
		if (this.loaderSetup.loading) {
			return;
		}
		this.hideLoader();

		if (routeFrom.name == 'SavingHomeEquityPlanDetailsPage' && routeTo.name == 'ReviewSavingsPlanPage') {
			this.GoToRoute('/savings')
		}

		if (routeFrom.name == 'RentSavingsPlanDetailsPage' && routeTo.name == 'ReviewRentSavingsPlanPage') {
			this.GoToRoute('/savings')
		}

		if (routeFrom.name == 'MyPropertyInformationPage' && routeTo.name == 'ProjectInformationPage') {
			this.GoToRoute('/invest')
		}

		if (routeFrom.name == 'IncomePlanDetailsPage' && routeTo.name == 'ReviewIncomePlanPage') {
			this.GoToRoute('/invest')
		}


		if (routeTo.fullPath == '/') {
			if (Logic.Auth.AuthUser) {
				if (Logic.User.DashboardOverview == undefined) {
					allActions.push(new Promise((resolve) => {
						const request = Logic.User.GetDashboardOverview(this.globalParameters.currency)
						request?.then((value) => {
							resolve(value)
						})

					}))
				}
			} else {
				return next()
			}
		}

		if (routeTo.fullPath == '/onboarding') {
			if (Logic.Auth.AuthUser) {
				if (Logic.User.Profile == undefined) {
					allActions.push(new Promise((resolve) => {
						const request = Logic.User.GetProfile()
						request?.then((value) => {
							resolve(value)
						})

					}))
				}
			} else {
				return next()
			}
		}

		if (routeTo.fullPath == '/sub-onboarding') {
			if (Logic.Auth.AuthUser) {
				if (Logic.User.Profile == undefined) {
					allActions.push(new Promise((resolve) => {
						const request = Logic.User.GetProfile()
						request?.then((value) => {
							resolve(value)
						})

					}))
				}
			} else {
				return next()
			}
		}

		if (routeTo.fullPath == '/savings/create-savings/home-equity/type') {
			if (Logic.Auth.AuthUser) {

				allActions.push(new Promise((resolve) => {
					const request = Logic.Plan.GetActiveHomeEquityProducts(this.globalParameters.currency)
					request?.then((value) => {
						resolve(value)
					})

				}))

			} else {
				return next()
			}
		}

		if (routeTo.fullPath == "/savings/create-savings/home-equity/finalize") {
			if (Logic.Auth.AuthUser) {

				if (Logic.Wallet.UserWallet == undefined) {
					allActions.push(new Promise((resolve) => {
						const request = Logic.Wallet.GetUserWallet()
						request?.then((value) => {
							resolve(value)
						})

					}))
				}

				if (Logic.Wallet.UserCards == undefined) {
					allActions.push(new Promise((resolve) => {
						const request = Logic.Wallet.GetUserCards()
						request?.then((value) => {
							resolve(value)
						})

					}))
				}


			} else {
				return next()
			}
		}

		if (routeTo.fullPath.includes('/savings/home-equity/')) {
			if (routeTo.params.id) {
				if (Logic.Plan.HomeSavingsPlan == undefined) {
					allActions.push(new Promise((resolve) => {
						const request = Logic.Plan.GetHomeSavingsPlan(routeTo.params.id.toString())
						request?.then((value) => {
							resolve(value)
						})

					}))
				}
			}
		}

		if (routeTo.fullPath == '/savings') {
			if (Logic.Plan.SavingsOverview == undefined) {
				allActions.push(new Promise((resolve) => {
					const request = Logic.Plan.GetSavingsOverview(this.globalParameters.currency)
					request?.then((value) => {
						resolve(value)
					})

				}))
			}
		}

		if (routeTo.fullPath == '/savings/create-savings/rent/frequency') {
			if (Logic.Plan.ActiveRentProducts == undefined) {
				allActions.push(new Promise((resolve) => {
					const request = Logic.Plan.GetActiveRentProducts(this.globalParameters.currency)
					request?.then((value) => {
						resolve(value)
					})

				}))
			}
		}

		if (routeTo.fullPath == '/invest/co-own') {

			if (Logic.Project.Projects == undefined) {
				allActions.push(new Promise((resolve) => {
					const request = Logic.Project.GetProjects()
					request?.then((value) => {
						resolve(value)
					})
				}))
			}
		}

		if (routeTo.fullPath.includes('/invest/co-own') && routeTo.fullPath != '/invest/co-own') {
			if (routeTo.params.id) {

				allActions.push(new Promise((resolve) => {
					const request = Logic.Project.GetProject(routeTo.params.id.toString(), parseInt(Logic.Auth.AuthUser?.id || '0'))
					request?.then((value) => {
						resolve(value)
					})
				}))

				if (Logic.Wallet.UserWallet == undefined) {
					allActions.push(new Promise((resolve) => {
						const request = Logic.Wallet.GetUserWallet()
						request?.then((value) => {
							resolve(value)
						})

					}))
				}

				if (Logic.Wallet.UserCards == undefined) {
					allActions.push(new Promise((resolve) => {
						const request = Logic.Wallet.GetUserCards()
						request?.then((value) => {
							resolve(value)
						})

					}))
				}

			}
		}

		if (routeTo.fullPath == '/invest/create-income') {
			if (Logic.Portfolio.ActiveFixedIncomeProducts == undefined) {
				allActions.push(new Promise((resolve) => {
					const request = Logic.Portfolio.GetActiveFixedIncomeProducts(this.globalParameters.currency)
					request?.then((value) => {
						resolve(value)
					})
				}))
			}
		}

		if (routeTo.fullPath == '/invest/create-income/finalize') {
			if (Logic.Portfolio.ActiveFixedIncomeProducts == undefined) {
				allActions.push(new Promise((resolve) => {
					const request = Logic.Portfolio.GetActiveFixedIncomeProducts(this.globalParameters.currency)
					request?.then((value) => {
						resolve(value)
					})
				}))
			}

			if (Logic.Wallet.UserWallet == undefined) {
				allActions.push(new Promise((resolve) => {
					const request = Logic.Wallet.GetUserWallet()
					request?.then((value) => {
						resolve(value)
					})

				}))
			}

			if (Logic.Wallet.UserCards == undefined) {
				allActions.push(new Promise((resolve) => {
					const request = Logic.Wallet.GetUserCards()
					request?.then((value) => {
						resolve(value)
					})

				}))
			}
		}

		if (routeTo.fullPath == '/invest/create-income/review') {
			if (Logic.Portfolio.ActiveFixedIncomeProducts == undefined) {
				allActions.push(new Promise((resolve) => {
					const request = Logic.Portfolio.GetActiveFixedIncomeProducts(this.globalParameters.currency)
					request?.then((value) => {
						resolve(value)
					})
				}))
			}
		}

		if (routeTo.fullPath == "/savings/create-savings/rent/finalize") {
			if (Logic.Auth.AuthUser) {

				if (Logic.Wallet.UserWallet == undefined) {
					allActions.push(new Promise((resolve) => {
						const request = Logic.Wallet.GetUserWallet()
						request?.then((value) => {
							resolve(value)
						})

					}))
				}

				if (Logic.Wallet.UserCards == undefined) {
					allActions.push(new Promise((resolve) => {
						const request = Logic.Wallet.GetUserCards()
						request?.then((value) => {
							resolve(value)
						})

					}))
				}
			} else {
				return next()
			}
		}

		if (routeTo.fullPath == "/invest") {
			if (Logic.Auth.AuthUser) {

				if (Logic.Portfolio.PortfolioOverview == undefined) {
					allActions.push(new Promise((resolve) => {
						const request = Logic.Portfolio.GetInvestmentOverview(this.globalParameters.currency)
						request?.then((value) => {
							resolve(value)
						})

					}))
				}

			} else {
				return next()
			}
		}

		if (routeTo.fullPath == "/wallet") {
			if (Logic.Auth.AuthUser) {

				if (Logic.Wallet.UserWallet == undefined) {
					allActions.push(new Promise((resolve) => {
						const request = Logic.Wallet.GetUserWallet()
						request?.then((value) => {
							resolve(value)
						})

					}))
				}

			} else {
				return next()
			}
		}

		if (routeTo.fullPath == "/more/payments/banks/add") {
			if (Logic.Wallet.CommercialBanks == undefined) {
				allActions.push(new Promise((resolve) => {
					const request = Logic.Wallet.GetCommercialBanks()
					request?.then((value) => {
						resolve(value)
					})
				}))
			}
		}

		if (routeTo.fullPath == '/more/my-account') {
			if (Logic.User.Profile == undefined) {
				allActions.push(new Promise((resolve) => {
					const request = Logic.User.GetProfile()
					request?.then((value) => {
						resolve(value)
					})
				}))
			}
		}

		if (routeTo.fullPath.includes('/invest/property') && routeTo.fullPath != '/invest/property') {

			if (routeTo.params.id) {

				allActions.push(new Promise((resolve) => {
					const request = Logic.Portfolio.GetPortfolio(routeTo.params.id.toString())
					request?.then((value) => {
						resolve(value)
					})

				}))

			}
		}

		if (routeTo.fullPath.includes('/invest/property/plan') && routeTo.fullPath != '/invest/property/plan') {

			if (routeTo.params.id) {

				allActions.push(new Promise((resolve) => {
					const request = Logic.Portfolio.GetPlanPortfolio(routeTo.params.id.toString())
					request?.then((value) => {
						resolve(value)
					})

				}))

			}
		}

		if (routeTo.fullPath.includes('savings/home-equity/') && routeTo.fullPath != '/savings/home-equity') {
			if (routeTo.params.id) {

				allActions.push(new Promise((resolve) => {
					const request = Logic.Plan.GetHomeSavingsPlan(routeTo.params.id.toString())
					request?.then((value) => {
						resolve(value)
					})

				}))

			}
		}

		if (routeTo.fullPath.includes('/savings/rent') && routeTo.fullPath != '/savings/rent') {
			if (routeTo.params.id) {

				allActions.push(new Promise((resolve) => {
					const request = Logic.Plan.GetRentSavingsPlan(routeTo.params.id.toString())
					request?.then((value) => {
						resolve(value)
					})

				}))

			}
		}

		if (routeTo.fullPath.includes('/invest/income') && routeTo.fullPath != '/invest/income') {
			if (routeTo.params.id) {

				allActions.push(new Promise((resolve) => {
					const request = Logic.Portfolio.GetFixedIncomePlan(routeTo.params.id.toString())
					request?.then((value) => {
						resolve(value)
					})

				}))
			}
		}

		if (routeTo.fullPath.includes('/more/payments/cards') && routeTo.fullPath != '/more/payments/cards') {
			if (routeTo.params.id) {

				allActions.push(new Promise((resolve) => {
					const request = Logic.Wallet.GetCard(routeTo.params.id.toString())
					request?.then((value) => {
						resolve(value)
					})

				}))
			}
		}

		if (routeTo.fullPath.includes('/more/payments/banks') && routeTo.fullPath != '/more/payments/banks') {
			if (routeTo.params.id) {

				allActions.push(new Promise((resolve) => {
					const request = Logic.Wallet.GetBank(routeTo.params.id.toString())
					request?.then((value) => {
						resolve(value)
					})

				}))
			}
		}

		if (routeTo.fullPath.includes('/wallet/transactions') && routeTo.fullPath != '/wallet/transactions') {
			if (routeTo.params.id) {

				allActions.push(new Promise((resolve) => {
					const request = Logic.Wallet.GetTransaction(routeTo.params.id.toString())
					request?.then((value) => {
						resolve(value)
					})

				}))
			}
		}

		if (routeTo.fullPath == '/wallet/transactions') {

			allActions.push(new Promise((resolve) => {
				const request = Logic.Wallet.GetTransactions(parseInt(Logic.Auth.AuthUser?.id || '0'), 30, 1)
				request?.then((value) => {
					resolve(value)
				})

			}))

		}

		if (routeTo.fullPath == '/invest/property') {

			if (Logic.Portfolio.MyProperty == undefined) {
				allActions.push(new Promise((resolve) => {
					const request = Logic.Portfolio.GetMyProperty(this.globalParameters.currency)
					request?.then((value) => {
						resolve(value)
					})
				}))
			}

		}

		if (routeTo.fullPath == '/invest/income') {

			if (Logic.Portfolio.FixedIncomePlans == undefined) {
				allActions.push(new Promise((resolve) => {
					const request = Logic.Portfolio.GetFixedIncomePlans(this.globalParameters.currency)
					request?.then((value) => {
						resolve(value)
					})
				}))
			}

		}

		if (routeTo.fullPath == '/savings/home-equity') {

			if (Logic.Plan.HomeSavings == undefined) {
				allActions.push(new Promise((resolve) => {
					const request = Logic.Plan.GetHomeSavings(this.globalParameters.currency)
					request?.then((value) => {
						resolve(value)
					})
				}))
			}

		}

		if (routeTo.fullPath == '/savings/rent') {

			if (Logic.Plan.RentSavings == undefined) {
				allActions.push(new Promise((resolve) => {
					const request = Logic.Plan.GetRentSavings(this.globalParameters.currency)
					request?.then((value) => {
						resolve(value)
					})
				}))
			}

		}

		if (routeTo.fullPath == '/wallet/fund/ngn') {
			if (Logic.Wallet.UserWallet == undefined) {
				allActions.push(new Promise((resolve) => {
					const request = Logic.Wallet.GetUserWallet()
					request?.then((value) => {
						resolve(value)
					})

				}))
			}

			if (Logic.Wallet.UserCards == undefined) {
				allActions.push(new Promise((resolve) => {
					const request = Logic.Wallet.GetUserCards()
					request?.then((value) => {
						resolve(value)
					})

				}))
			}
		}

		if (routeTo.fullPath == '/wallet/fund/usd') {
			if (Logic.Wallet.UserWallet == undefined) {
				allActions.push(new Promise((resolve) => {
					const request = Logic.Wallet.GetUserWallet()
					request?.then((value) => {
						resolve(value)
					})

				}))
			}

			allActions.push(new Promise((resolve) => {
				const request = Logic.Wallet.GetLatestExchangeRate()
				request?.then((value) => {
					resolve(value)
				})

			}))

		}

		if (routeTo.fullPath == '/wallet/withdraw') {
			if (Logic.Wallet.UserWallet == undefined) {
				allActions.push(new Promise((resolve) => {
					const request = Logic.Wallet.GetUserWallet()
					request?.then((value) => {
						resolve(value)
					})

				}))
			}
		}

		if (routeTo.fullPath == '/wallet/withdraw') {
			if (Logic.Wallet.UserWallet == undefined) {
				allActions.push(new Promise((resolve) => {
					const request = Logic.Wallet.GetUserWallet()
					request?.then((value) => {
						resolve(value)
					})

				}))
			}
		}

		if (routeTo.fullPath == '/wallet/withdraw/ngn') {
			if (Logic.Wallet.UserWallet == undefined) {
				allActions.push(new Promise((resolve) => {
					const request = Logic.Wallet.GetUserWallet()
					request?.then((value) => {
						resolve(value)
					})

				}))
			}

			if (Logic.Wallet.UserBanks == undefined) {
				allActions.push(new Promise((resolve) => {
					const request = Logic.Wallet.GetUserBanks()
					request?.then((value) => {
						resolve(value)
					})

				}))
			}
		}

		if (routeTo.fullPath == '/wallet/withdraw/usd') {
			if (Logic.Wallet.UserWallet == undefined) {
				allActions.push(new Promise((resolve) => {
					const request = Logic.Wallet.GetUserWallet()
					request?.then((value) => {
						resolve(value)
					})

				}))
			}

			allActions.push(new Promise((resolve) => {
				const request = Logic.Wallet.GetLatestExchangeRate()
				request?.then((value) => {
					resolve(value)
				})

			}))
		}

		if (allActions.length > 0) {
			this.showLoader({
				show: true,
				useModal: false,
				loading: true
			})
			Promise.all(allActions).then(() => {
				this.hideLoader()
				return next()
			})
		} else {
			return next()
		}


	}

}