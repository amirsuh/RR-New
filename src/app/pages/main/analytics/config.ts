import { IForm } from "../../../shared/interfaces/dynamic-form/form.interface";


export const formConfigAnalytics:IForm = {
  formTitle: 'Analytics form',
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
    name: 'description',
    label: 'Description',
    value: '',
    palceholder: 'Enter description',
    class: 'col-md-6',
    type: 'text',
    validators: [
      {
        validationName: 'required',
        required: true,
        message: 'Description is required',
      }
    ],
  },
  {
    name: 'capacity',
    label: 'Capacity',
    value: '',
    palceholder: 'Enter capacity',
    class: 'col-md-4',
    type: 'number',
    validators: [
      {
        validationName: 'required',
        required: true,
        message: 'Capacity is required',
      }
    ],
  },
]
}
