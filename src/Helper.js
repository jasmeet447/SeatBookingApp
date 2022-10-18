import _ from 'lodash'

export const getAuthErrorMessage = (code) => {
  switch (code) {
    case 'NotAuthorizedException':
      return 'Sorry, your username or password is incorrect. Please try again.'
    case 'UserNotFoundException':
      return 'Sorry, your username or password is incorrect. Please try again.'
    case 'CodeMismatchException':
      return 'Sorry, the code you entered was incorrect. Please enter a valid code'
    case 'LimitExceededException':
      return 'You’ve exceeded the number of allowed attempts. Please try again later.'
    case 'AliasExistsException':
      return 'An account with the given email already exists. Can you please sign in with your password or reset your password?'
    case 'UsernameExistsException':
      return 'An account with the given email already exists. Can you please sign in with your password or reset your password?'
    case 'UserNotConfirmedException':
      return 'Please activate your account by clicking link in your email'
    default:
      return 'Oh no! Something went wrong. Can you please try again?'
  }
}
