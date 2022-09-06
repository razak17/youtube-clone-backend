import { object, string, TypeOf } from "zod";

export const signUpSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    name: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Name is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    confirmPassword: string({
      required_error: "confirmPassword is required",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
});

export const signInSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Name is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
  }),
});

export type SignUpInput = Omit<
  TypeOf<typeof signUpSchema>,
  "body.confirmPassword"
>;

export type SignInInput = TypeOf<typeof signInSchema>;
