import { object, string, TypeOf } from "zod";

export const registerUserSchema = {
  body: object({
    email: string({
      required_error: "email is required",
    }).email("Not a valid email"),
    username: string({
      required_error: "username is required",
    }).min(2, "username must be at least 2 characters long"),
    password: string({
      required_error: "password is required",
    })
      .min(6, "password must be at least 6 characters long")
      .max(64, "password should not be longer than 64 characters"),
    confirmPassword: string({
      required_error: "confirmPassword is required",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  }),
};

export const updateUserSchema = {
  body: object({
    email: string({
      required_error: "email is required",
    }).email("Not a valid email"),
    username: string({
      required_error: "username is required",
    }),
  }),
  params: object({
    userId: string(),
  }),
};

export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>;
export type UpdateUserBody = TypeOf<typeof updateUserSchema.body>;
export type UpdateUserParams = TypeOf<typeof updateUserSchema.params>;
