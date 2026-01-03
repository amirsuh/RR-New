import { Component } from '@angular/core';
import {z} from 'zod';

export type signupModel = z.infer<typeof signupSchema>;
export type ZodErrorMap = Record<string, string[]>;
export const signupSchema = z.object({
  username:z.string().min(3,'username must 3 chars long').regex(/^[a-zA-Z0-9_]+$/,'only letters,numbers and underscore allowed'),
  email:z.string().email('please enter valid email'),
})
@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

}
