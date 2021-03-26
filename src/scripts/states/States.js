export default {
  // Framework
  profileMenu: null,
	messageMenu: null,
  profileMenuOpen: false,
  mobileMoreAnchorEl: null,
  drawerOpen: true,
  applicationsMenu: null,
  applicationsMenuOpen: false,
  openedSubMenu: null,
  authToken: null,
  top: false,
  left: false,
  bottom: false,
  right: false,
  open: false,
  isMenuOpen: false,
  isMobileMenuOpen: false,
  progressOpen: false,
  confirmationOpen: false,
  snackBarOpen: false,
  isPrintTemplate: false,

  // Alert Component
  alertOpen: false,
  alertMessage: '',
  alertTitle: '',
    
  // Notif Component
  notifOpen: false,
  notifMessage: '',
  notifTitle: '',

  // Login Page
  userName: '',
  password: '',
  loginLoading: false,

  // Add Hub Page
  hubName: '',
  hubType: '',
  hubParent: '',
  hubFleetManager: '',
  hubAddress: '',
  hubLatitude: '',
  hubLongitude: '',
  hubCountry: '',
  hubState: '',
  hubCity: '',
  hubZipCode: '',
  addHubLoadig: false,
  // Add Hub - Label Width Select Form
  labelWidthType: 0,
  labelWidthFleet: 0,
  labelWidthCountry: 0,
  labelWidthState: 0,
  labelWidthCity: 0,
  labelWidthParent: 0,
  // Add Hub - Get Data List
  hubStateList: [],
  hubCityList: [],

  //Fleets
  fleetUserID: '',
  profilePicture: '',
  companyName: '',
  email: '',
  phoneNumber: '',
  companyDescription: '',
  websiteURL: '',
  vatNumber: '',
  ccnNumber: '',
  ovl: '',
  userFirstName: '',
  userLastName: '',
  passwordFleet: '',
  referralCode: '',
  referrerName: '',
  referrerCode: '',
  fleetStatus: '',

  //Webstores
  webStoreHub: '',
  webStoreHubList: [],
  webStoreFirstName: '',
  webStoreLastName: '',
  webStoreEmail: '',
  webStorePassword: '',
  webStorePhone: '',
  webStoreAddress: '',
  webStoreLatitude: '',
  webStoreLongitude: '',
  webStoreCountry: '',
  webStoreState: '',
  webStoreCity: '',
  webStoreZipCode: '',
  webStorePostPaidPayment: '',
  webStoreAllowCOD: false,
  webStoreCODCommission: '',
  webStoreProductCategories: '',
  webStoreAverageWeight: '',
  webStoreInterests: '',
  webStorePricingType: '',
  webStoreReferralCode: '',
  webStoreReferrerName: '',
  webStoreReferrerCode: '',

  // Driver
  alertOpenReferralCode: false,
  // Edit Driver
  driverFirstName: '',
  driverLastName: '',
  driverEmail: '',
  driverPhoneNumber: '',
  driverStatus: '',
  driverAvailable: '',
  driverFleetCompany: '',
  driverCanTakeCOD: false,
  driverfleetManager: '',
  driverReferralCode: '',
  driverUserID: '',
  // Edit Driver - Label Width Select Form
  labelWidthStatus: 0,
  labelWidthAvailable: 0,
  labelWidthFleetCompany: 0,
  // Driver Details
  dateFrom: '',
  dateTo: '',
  // Edit Driver - Data List
  driverFleetList: [],
  driverStatusList: [],

  // Pricing Logistic
  logFleetManager: '',
  logVehicle: '',
  logPricePerKM: '',
  logMinimumFee: '',
  logPerItemFee: '',
  // Pricing Logistic - Label Width Select Form
  labelWidthFleetManager: 0,
  labelWidthVehicle: 0,
  // Pricing Logistic - Data List
  logFleetManagerList: [],
  logVehicleList: [],

  // Pricing Customer
  custWebstore: '',
  custPickUpType: '',
  custOriginPort: '',
  custDestinationZipCode: '',
  custPrice: '',
  custMinWeight: '',
  // Pricing Customer - Detail
  custThreeLetterCode: '',
  custDistrictName: '',
  custCityName: '',
  custStateName: '',
  // Pricing Customer - Label Width Select Form
  labelWidthWebstore: 0,
  labelWidthPickUpType: 0,
  labelWidthOriginPort: 0,
  labelWidthDestinationZipCode: 0,
  // Pricing Customer - Data List
  webstoreList: [],
  originPortList: [],
  destinationZipCodeList: [],

  // Pricing Ecommerce
  ecommWebstore: '',
  ecommPickUpType: '',
  ecommVehicle: '',
  ecommOrigin: '',
  ecommDestination: '',
  ecommDiscount: '',
  ecommPackageDimension: '',
  ecommMaxWeight: '',
  ecommPrice: '',
  ecommAdditionalPrice: '',
  // Pricing Ecommerce - Label Width
  labelWidthWebstoreEcomm: 0,
  labelWidthPickUpTypeEcomm: 0,
  labelWidthVehicleEcomm: 0,
  labelWidthOrigin: 0,
  labelWidthDestination: 0,
  labelWidthDiscount: 0,
  labelWidthPackageDimension: 0,
  // Pricing Ecommerce - Data List
  destinationList: [],
  originList: [],
  
  // Fleet Zip Code
  zipCodeFleet: '',
  zipCodeFleetList: [],
  zipCode: '',
  zipCodeHandlingPrice: '',
  zipCodeID: '',
	zipCodePrice: '',

  // Operational District
  operationalDistrictName: '',
  operationalDistrictCity: '',
  operationalDistrictProvince: '',
  operationalDistrictLat: '',
  operationalDistrictLng: '',

  // District Zip Code
  districtZipCodeDistrict: '',
  districtZipCodeDistrictList: null,
  districtZipCodeZipCode: '',

  // District
  districtName: '',
  districtCity: '',

  // City
  cityName: '',
  cityPort: '',
  cityPortList: null,
  cityState: '',
  cityStateList: null,
  cityEcommercePriceReferenced: false,

  // Hub Performances
  performancesTotal: [],
  performancesTotalPercentage: {},
  performancesRows: [],
  performancesDateRange: {},
  performancesDrpOpen: false,
};
