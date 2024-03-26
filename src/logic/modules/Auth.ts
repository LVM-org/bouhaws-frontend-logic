import { $api } from "../../services";
import { CombinedError } from "urql";
import Common from "./Common";
import {
  MutationSignUpArgs,
  MutationSignInArgs,
  MutationResendVerifyEmailArgs,
  MutationSendResetPasswordEmailArgs,
  MutationUpdatePasswordArgs,
  MutationVerifyEmailOtpArgs,
} from "../../gql/graphql";
import { Logic } from "..";

export default class Auth extends Common {
  constructor() {
    super();
  }

  public AccessToken: string | null = null;
  public AuthUser: any | undefined = undefined;

  public SignUpPayload: MutationSignUpArgs = {
    email: "",
    password: "",
    username: "",
    type: "",
  };
  public SignInPayload: MutationSignInArgs = {
    email: "",
    password: "",
  };
  public ResendVerifyEmailPayload: MutationResendVerifyEmailArgs = {
    user_uuid: "",
  };
  public ResetPasswordEmailPayload: MutationSendResetPasswordEmailArgs = {
    email: "",
  };
  public UpdatePasswordPayload: MutationUpdatePasswordArgs = {
    old_password: "",
    password: "",
    otp: "",
    user_uuid: "",
  };
  public VerifyEmailOtpPayload: MutationVerifyEmailOtpArgs = {
    email: "",
    otp: "",
  };

  public HasCheckedUser: boolean = false;

  private SetUpAuth = (AuthResponse: any | undefined) => {
    if (AuthResponse) {
      this.AccessToken = AuthResponse.token;
      this.AuthUser = AuthResponse.user;
      // save to localstorage
      localStorage.setItem(
        "access_token",
        this.AccessToken ? this.AccessToken : ""
      );
      localStorage.setItem("auth_user", JSON.stringify(this.AuthUser));
    }
  };

  //
  public SignUp = (formIsValid: boolean) => {
    if (formIsValid) {
      Logic.Common.showLoader({ loading: true, show: false, useModal: true });
      $api.auth
        .SignUp(this.SignUpPayload)
        .then((response) => {
          this.AuthUser = response.data?.SignUp;
          console.log("signup  response", response);
          Logic.Common.hideLoader();
          Logic.Common.GoToRoute("/auth/verify-email");
          localStorage.setItem(
            "pending-verification",
            JSON.stringify({
              email: this.SignUpPayload.email,
              password: this.SignUpPayload.password,
            })
          );
          localStorage.setItem("auth_user", JSON.stringify(this.AuthUser));
        })

        .catch((error: CombinedError) => {
          Logic.Common.showError(error, "Oops!", "error-alert");
        });
    }
  };

  //
  public SignIn = (formIsValid: boolean) => {
    if (formIsValid) {
      Logic.Common.showLoader({ loading: true, show: false, useModal: true });
      $api.auth
        .SignIn(this.SignInPayload)
        .then((response) => {
          console.log("signin  response", response, {
            authUser: this.AuthUser,
          });

          if (response?.data?.SignIn?.token) {
            this.SetUpAuth(response?.data?.SignIn);
            Logic.Common.hideLoader();
            Logic.Common.GoToRoute("/");
          } else {
            const customError = {
              name: "Error",
              message: "Invalid login credentials",
              graphQLErrors: [{ message: "Invalid login credentials" }],
            } as unknown as CombinedError;

            Logic.Common.showError(customError, "Oops!", "error-alert");
          }
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, "Oops!", "error-alert");
        });
    }
  };

  //
  public ResendVerifyEmail = () => {
    Logic.Common.showLoader({ loading: true, show: false, useModal: true });
    $api.auth
      .ResendVerifyEmail(this.ResendVerifyEmailPayload)
      .then((response) => {
        this.AuthUser = response.data?.ResendVerifyEmail;
        console.log("ResendVerifyEmail  response", response);
        const userDetails = (
          localStorage.getItem("auth_user")
            ? JSON.parse(localStorage.getItem("auth_user") || "")
            : {}
        ) as { email: string; password: string };
        Logic.Common.showLoader({
          loading: false,
          show: true,
          useModal: true,
          message: `OTP link sent to ${userDetails.email}`,
        });
      })
      .catch((error: CombinedError) => {
        Logic.Common.showError(error, "Oops!", "error-alert");
      });
  };

  //
  public SendResetPasswordEmail = (formIsValid: boolean) => {
    if (formIsValid) {
      Logic.Common.showLoader({ loading: true, show: true, useModal: true });
      $api.auth
        .SendResetPasswordEmail(this.ResetPasswordEmailPayload)
        .then((response) => {
          this.AuthUser = response.data?.SendResetPasswordEmail;
          console.log("SendResetPasswordEmail  response", response);
          Logic.Common.hideLoader();
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, "Oops!", "error-alert");
        });
    }
  };

  //
  public UpdatePassword = (formIsValid: boolean) => {
    if (formIsValid) {
      Logic.Common.showLoader({ loading: true, show: true, useModal: true });
      $api.auth
        .UpdatePassword(this.UpdatePasswordPayload)
        .then((response) => {
          this.AuthUser = response.data?.UpdatePassword;
          console.log("UpdatePassword  response", response);
          const { email, password } = (
            localStorage.getItem("pending-verification")
              ? JSON.parse(localStorage.getItem("pending-verification") || "")
              : {}
          ) as { email: string; password: string };

          Logic.Auth.SignInPayload = {
            email,
            password,
          };
          Logic.Auth.SignIn(true);
          Logic.Common.hideLoader();
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(error, "Oops!", "error-alert");
        });
    }
  };

  //
  public VerifyEmailOtp = (formIsValid: boolean) => {
    if (formIsValid) {
      Logic.Common.showLoader({ loading: true, show: false, useModal: true });
      $api.auth
        .VerifyEmailOtp(this.VerifyEmailOtpPayload)
        .then((response) => {
          this.AuthUser = response.data?.VerifyEmailOTP;
          console.log("VerifyEmailOtp  response", response);
          Logic.Common.hideLoader();
        })
        .catch((error: CombinedError) => {
          Logic.Common.showError(
            error,
            "Oops!",
            "error-alert",
            "Something went wrong"
          );
        });
    }
  };

  public GetCurrentUser = () => {
    if (!this.HasCheckedUser) {
      const access_token =
        localStorage.getItem("access_token") || ("" as string);
      if (access_token) {
        this.AccessToken = access_token;
        const authUser = localStorage.getItem("auth_user") as any;
        this.AuthUser = (authUser ? JSON.parse(authUser) : {}) as any;
        // Logic.Common.showLoader({ loading: true, show: false, useModal: true });
        $api.auth
          .GetUserData()
          .then((response) => {
            console.log(response?.data?.AuthUser);
            this.AuthUser = response?.data?.AuthUser;
            this.HasCheckedUser = true;
            localStorage.setItem("auth_user", JSON.stringify(this.AuthUser));
            // Logic.Common.hideLoader();
          })
          .catch((error: CombinedError) => {
            Logic.Common.showError(error, "Oops!", "error-alert");
            localStorage.removeItem("access_token");
          });
      } else {
        localStorage.removeItem("access_token");
      }
    }
  };
}
