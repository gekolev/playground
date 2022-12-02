export default [
  {
    class: 'group-1',
    fields: {
      'firstName': {
        model: null,
        rules: 'required',
        placeholder: 'First Name',
        class: 'small',
        type: 'input'
      },

      'lastName': {
        model: null,
        rules: 'required',
        placeholder: 'Last Name',
        class: 'small',
        type: 'input'
      },

      'email': {
        model: null,
        rules: 'required|email',
        placeholder: 'Email Address',
        class: 'small',
        type: 'input'
      },
    }
  }, 
  {
    class: 'group-2',
    fields: {
      'password': {
        model: null,
        rules: 'required|password:@confirm',
        placeholder: 'New Password',
        class: 'small',
        type: 'input',
        inputType: 'password'
      },

      'confirm': {
        model: null,
        rules: 'required',
        placeholder: 'Confirm Password',
        class: 'small',
        type: 'input',
        inputType: 'password'
      },
    }
  }
]