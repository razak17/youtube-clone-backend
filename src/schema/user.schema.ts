import { object, string, TypeOf } from "zod";

export const registerUserSchema = {
  body: object({
    email: string({
      required_error: "email is required",
    }).email("Not a valid email"),
    name: string({
      required_error: "name is required",
    }).min(2, "name must be at least 2 characters long"),
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

export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>;
