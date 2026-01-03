import { IForm } from "../../../shared/interfaces/dynamic-form/form.interface";


export const formUserConfig:IForm = {
  formTitle: 'User form',
  saveBtnTitle: 'Register',
  resetBtnTitle: 'Reset',
  formControls: [
  {
    name: 'name',
    label: 'Name',
    value: '',
    palceholder: 'Enter name',
    class: 'col-md-6',
    type: 'text',
    validators: [
      {
        validationName: 'required',
        required: true,
        message: 'Name is required',
      }
    ],
  },
  {
    name: 'email',
    label: 'Email',
    value: '',
    palceholder: 'Enter email',
    class: 'col-md-6',
    type: 'email',
    validators: [
      {
        validationName: 'required',
        required: true,
        message: 'Email is required',
      }
    ],
  },
  {
    name: 'role',
    label: 'Role',
    value: '',
    palceholder: 'Enter role',
    class: 'col-md-4',
    type: 'text',
    validators: [
      {
        validationName: 'required',
        required: true,
        message: 'Role is required',
      }
    ],
  },
]
}
