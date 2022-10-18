import { Auth } from 'aws-amplify'
import { configureAmplify, isMultiConfig, switchRegion, regions } from '../ConfigManager'

/**
 * @description this is used to check provided user in all AWS region integrated in app. 
 * @param {*} email check if email belong to existing user
 * @returns Boolean true/false
 */
export const checkIfUserExist = async (email) => {
    let length = regions?.length
    let isUser = false
    let i
    switchRegion(true)
    for (i = 0; i < length; i++) {
        if (!isUser) {
            configureAmplify()
            isUser = await checkAWS(email)
        } else {
            break
        }
        if (!isUser && isMultiConfig) {
            switchRegion()
        }
    }
    if (!isUser && isMultiConfig) {
        switchRegion(true)
        configureAmplify()
    }
    return isUser
}

/**
 * 
 * @param {*} email wrapper around Cognito signin returns true if user exist in cognito
 * @returns 
 */
const checkAWS = async (email) => {
    try {
        await Auth.signIn(email.toLowerCase(), '*');
    } catch (error) {
        console.log('checkAWS====>', error)
        if (error?.code === 'NotAuthorizedException') {
            return true;
        } else if (error?.code === 'UserNotFoundException') {
            return false;
        } else {
            console.log(error.code);
            throw error;
        }
    }
}