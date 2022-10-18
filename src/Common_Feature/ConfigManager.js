import * as RNLocalize from "react-native-localize";
import Amplify, { Auth } from 'aws-amplify';
import StorageHelper from './StorageHelper'
import * as Config from 'pentair-dynamic-config/config'
import * as Config1 from 'pentair-dynamic-config/config-eu-west-1'
import { getWalkThroughURL, getDemoDevicesURL } from "pentair-dynamic-config/config";
// const to compare current aws region name 
export const AWS_REGION_NAMES = { US: 'US', EU: 'EU' }
export const STAGES = { DEV: 'dev', QA: 'qa', UAT: 'uat', PROD: 'prod' }

export const SUB_REGIONS = { LATAM:"LATAM", ANZ:"ANZ", SEA:"SEA"}

export const nonSMSCountries = [{countryName: "Mexico", countryCode: "mx"}, {countryName: "Malaysia", countryCode: "my"}, {countryName: "Thailand", countryCode: "th"},
  {countryName: "Vietnam", countryCode: "vn"}, {countryName: "Australia", countryCode: "au"}, {countryName: "New Zealand", countryCode: "nz"},
  {countryName: "Colombia", countryCode: "co"}, {countryName: "Dominican Republic",countryCode: "do"}, {countryName: "Costa Rica",countryCode: "cr"},
  {countryName: "Guatemala", countryCode: "gt"}, {countryName: "Panama", countryCode: "pa"}, {countryName: "Trinidad", countryCode: "tt"},
  {countryName: "Aruba", countryCode: "aw"}, {countryName: "Cayman Isl", countryCode: "ky"}, {countryName: "Barbados", countryCode: "bb"},
  {countryName: "Jamaica", countryCode: "jm"}, {countryName: "British Virgin Isl", countryCode: "vg"}];

export let isMultiConfig = !!Config?.stage && !!Config1?.stage && /* istanbul ignore next */ Config?.stage != 'dev' &&  /* istanbul ignore next */ Config1?.stage != 'STAGE'

export const regions = isMultiConfig ?  /* istanbul ignore next */[Config.region, Config1.region] : [Config.region]

const latamCountries = ['CO', 'DO', 'CR', 'GT', 'PA', 'TT', 'AW', 'KY', 'BB', 'JM', 'VG'];
const seaCountries = ['MY', 'TH', 'VN'];
const anzCountries = ['AU', 'NZ'];

const europeanCountries = ['RU', 'DE', 'GB', 'FR', 'IT', 'ES', 'UA', 'PL', 'RO', 'NL', 'BE', 'CZ', 'GR', 'PT', 'SE', 'HU', 'BY', 'RS', 'CH',
  'BG', 'DK', 'FI', 'SK', 'NO', 'IE', 'HR', 'MD', 'BA', 'AL', 'LT', 'MK', 'SI', 'LV', 'EE', 'ME', 'LU', 'MT', 'IS', 'AD', 'MC', 'LI', 'SM', 'VA']

  const UScountries = ['CA', 'MX', 'US', 'VI', 'GL', 'AI', 'AG', 'BS', 'BM', 
  'CU', 'CW', 'DM', 'GD', 'GP', 'HT', 'MQ', 'MS', 'PR', 'KN', 'LC', 'VC', 'BZ', 
  'SV', 'HN', 'NI', 'AR', 'BO', 'BR', 'CL', 'EC', 'GF', 'GY', 'PY', 'PE', 
  'SR', 'UY', 'VE', ...latamCountries, ...seaCountries, ...anzCountries];

const AsiaPacific = ['MY'];

export const getUserAWSRegion = () => {
  if (!isMultiConfig) {
    return regions[0]
  }
  const countryCode = RNLocalize.getCountry()
  /* istanbul ignore else */
  if (europeanCountries.includes(countryCode?.toUpperCase()) && Config1?.region == regions[0]) {
    return regions[0]
  }
  /* istanbul ignore else */
  if (UScountries.includes(countryCode?.toUpperCase()) && Config.region == regions[0]) {
    return regions[0]
  }
  /* istanbul ignore else */
  if (europeanCountries.includes(countryCode?.toUpperCase()) && Config1?.region == regions[1]) {
    return regions[1]
  }

  if (AsiaPacific.includes(countryCode?.toUpperCase()) && Config.region == regions[0]) {
    return regions[0]
  }

  if (UScountries.includes(countryCode?.toUpperCase()) && Config.region == regions[1]) {
    return regions[1]
  } else {
    return regions[0]
  }


}

let defaultRegion = getUserAWSRegion()

export var segmentAPIKey = Config.segmentAPIKey;
export var newrelicIosKeyHome = Config.newrelicIosKeyHome;
export var newrelicAndriodKeyHome = Config.newrelicAndriodKeyHome;
export var googleApiKey = Config.googleApiKey;
export var webSocketURL = Config.webSocketURL;
export var cdndeviceList = Config.cdndeviceList;
export var cdnSubdeviceList = Config.cdnSubdeviceList;
export var walkThroughURL = Config.walkThroughURL;
export var cdnDemoDevice = Config.cdnDemoDevice;
export const ConsumerDataPhrase = Config?.ConsumerDataPhrase ?? ''
export const magentoApiDomain = Config?.magentoApiDomain;
export const magentoMediaApiDomain = Config?.magentoMediaApiDomain;
export const cdnWaterTestKitInfo = Config?.cdnWaterTestKitInfo;
export const stripeSecretKey = Config?.stripeSecretKey;
export const magentoAdminTokenUsername = Config?.magentoAdminTokenUsername;
export const magentoAdminTokenPassword = Config?.magentoAdminTokenPassword;
export const SPDCDN_URL = Config?.SPD_CDN_URL

export {
   getWalkThroughURL,
   getDemoDevicesURL
}

/** 
 * @returns region name EU or US
 */
export var getRegionName = () => {
  let regionName = AWS_REGION_NAMES.US
  let index = regions?.indexOf(defaultRegion)
  if (index > 0) {
    regionName = AWS_REGION_NAMES.EU
  }
  return regionName
}

export const switchRegion = (isDefault = false) => {
  if (isDefault) {
    defaultRegion = getUserAWSRegion()
  } else {
    defaultRegion = defaultRegion == Config.region ? Config1.region : Config.region
  }
  return defaultRegion
}

export var getWebSocketURL = () => {
  let socketUrl = ''
  if (!isMultiConfig) {
    socketUrl = Config.webSocketURL
  } else {
    let index = regions.indexOf(defaultRegion)
    if (index == 0) {
      socketUrl = Config.webSocketURL
    } else {
      socketUrl = Config1.webSocketURL
    }
  }
  return socketUrl
}
export const getConfigData = () => {
  let envConfigData = ''
  if (!isMultiConfig) {
    envConfigData = Config.configData
  } else {
    let index = regions.indexOf(defaultRegion)
    if (index == 0) {
      envConfigData = Config.configData
    } else {
      envConfigData = Config1.configData
    }
  }
  return envConfigData
}
export const configureAmplify = () => {
  if (defaultRegion == Config.region) {
    Amplify.configure(Config.configData)
  } else {
    Amplify.configure(Config1.configData)
  }
  Auth.configure({
    storage: new StorageHelper().getStorage()
  })
}

export const getCurrentStage = () => {
  let stage = ''
  if (!isMultiConfig) {
    stage = Config.stage
  } else {
    let index = regions.indexOf(defaultRegion)
    if (index == 0) {
      stage = Config.stage
    } else {
      stage = Config1.stage
    }
  }
  return stage
}

/** 
 * @returns if the region or country of device is Malaysia.
 */
export const isCountryInAsiaPacific = () => {
  const countryCode = RNLocalize.getCountry();
  if (AsiaPacific.includes(countryCode?.toUpperCase())) {
    return true;
  }
  return false;
}

export const isSmsPrefDisableCountry = (countryName="") => {

  if (!countryName)
    return true
  
  let country = nonSMSCountries.find(obj => (obj.countryName.toLowerCase() == countryName.toLowerCase() || obj.countryCode.toLowerCase() == countryName.toLowerCase()))
 
  if (country)
    return true
  else
    return false

}

// /** 
//  * @returns if the region or country of device LatamSeaAnzCountry.
//  */
//  export const isLatamSeaAnzCountry = () => {
//   const latamSeaAnzCountries = [...latamCountries, ...seaCountries, ...anzCountries];
//   const countryCode = RNLocalize.getCountry();
//   const isSeaLatamAnzFlag = store?.getState()?.comAccountReducer?.deviceConfigurationList?.profile?.isSeaLatamAnzFlag;
//   if (latamSeaAnzCountries.includes(countryCode?.toUpperCase()) && isSeaLatamAnzFlag) {
//     return true;
//   }
//   return false;
// }

// /** 
//  * @returns if the region or country of device is Latam.
//  */
//  export const isLatamCountry = () => {
//   const countryCode = RNLocalize.getCountry();
//   const isSeaLatamAnzFlag = store?.getState()?.comAccountReducer?.deviceConfigurationList?.profile?.isSeaLatamAnzFlag;
//   if (latamCountries.includes(countryCode?.toUpperCase()) && isSeaLatamAnzFlag) {
//     return true;
//   }
//   return false;
// }

// /** 
//  * @returns if the region or country of device is Sea.
//  */
//  export const isSeaCountry = () => {
//   const countryCode = RNLocalize.getCountry();
//   const isSeaLatamAnzFlag = store?.getState()?.comAccountReducer?.deviceConfigurationList?.profile?.isSeaLatamAnzFlag;
//   if (seaCountries.includes(countryCode?.toUpperCase()) && isSeaLatamAnzFlag) {
//     return true;
//   }
//   return false;
// }

// /** 
//  * @returns if the region or country of device is Anz.
//  */
//  export const isAnzCountry = () => {
//   const countryCode = RNLocalize.getCountry();
//   const isSeaLatamAnzFlag = store?.getState()?.comAccountReducer?.deviceConfigurationList?.profile?.isSeaLatamAnzFlag;
//   if (anzCountries.includes(countryCode?.toUpperCase()) && isSeaLatamAnzFlag) {
//     return true;
//   }
//   return false;
// }

export const isLatamCountryWithOutToken = () => {
  const countryCode = RNLocalize.getCountry();
  if (latamCountries.includes(countryCode?.toUpperCase())) {
    return true;
  }
  return false;
}
/** 
 * @returns if the region or country of device is Sea.
 */
 export const isSeaCountryWithOutToken = () => {
  const countryCode = RNLocalize.getCountry();
  if (seaCountries.includes(countryCode?.toUpperCase())) {
    return true;
  }
  return false;
}

/** 
 * @returns if the region or country of device is Anz.
 */
 export const isAnzCountryWithOutToken = () => {
  const countryCode = RNLocalize.getCountry();
  if (anzCountries.includes(countryCode?.toUpperCase())) {
    return true;
  }
  return false;
}

export const getRegionCode = () => {
  if(isLatamCountry()){
    return SUB_REGIONS.LATAM;
  } else if (isAnzCountry()) {
    return SUB_REGIONS.ANZ;
  } else if(isSeaCountry()){
    return SUB_REGIONS.SEA
  }else{
    return AWS_REGION_NAMES.US
  }
}