let ApiErrorNames = {}

ApiErrorNames.UNKNOW_ERROR = 'unknowError'
ApiErrorNames.API_INTERNAL_ERROR = 'ApiInternalError'
ApiErrorNames.PERMISSION_DENIED = 'permissionDenied'
ApiErrorNames.PARAMS_ERROR = 'paramsError'
ApiErrorNames.SEND_EMAIL_ERROR = 'sendEmailError'
ApiErrorNames.GIT_UTIL_ERROR = 'gitUtilError'
ApiErrorNames.GIT_FLOW_ERROR = 'gitFlowError'
ApiErrorNames.DATABASE_ERROR = 'databaseError'
ApiErrorNames.KERBEROS_ERROR = 'kerberosError'
ApiErrorNames.RECORD_HAS_EXISTED = 'recordHasExisted'
ApiErrorNames.RECORD_MULTI_EXIST = 'recordMultiExist'
ApiErrorNames.RECORD_NOT_EXIST = 'recordNotExist'
ApiErrorNames.FILE_NOT_EXIST = 'fileNotExist'
ApiErrorNames.FILE_UPLOAD_FAILED = 'fileUploadFailed'
ApiErrorNames.VALIDATION_ERROR = 'validationError'
ApiErrorNames.PASSWORD_NOT_MATCH = 'passwordNotMatch'
ApiErrorNames.VERIFICATION_NOT_MATCH = 'verificationNotMatch'
ApiErrorNames.CLUSTER_NOT_EXIST = 'clusterNotExist'
ApiErrorNames.HTTP_REQUEST_ERROR = 'httpRequestError'
ApiErrorNames.PLATFORM_REQUEST_ERROR = 'platformRequestError'
ApiErrorNames.UPGRADE_CENTER_ERROR = 'upgradeCenterError'
ApiErrorNames.INTERNAL_CALL_ERROR = 'internalCallError'
ApiErrorNames.PYTHON_CALL_ERROR = 'pythonCallError'
ApiErrorNames.SHELL_COMMAND_ERROR = 'shellCommandError'
ApiErrorNames.APP_NOT_INSTALLED = 'appNotInstalledError'

/**
 * API error name: {status, message}
 */
const eMap = new Map()

eMap.set(ApiErrorNames.UNKNOW_ERROR, {status: '-1', message: 'Unknow error'})
eMap.set(ApiErrorNames.API_INTERNAL_ERROR, {status: '200000', message: 'API internal error'})
eMap.set(ApiErrorNames.PERMISSION_DENIED, {status: '210000', message: 'Permission denied'})
eMap.set(ApiErrorNames.PARAMS_ERROR, {status: '220000', message: 'Params error'})
eMap.set(ApiErrorNames.SEND_EMAIL_ERROR, {status: '230000', message: 'Send eamil error'})
eMap.set(ApiErrorNames.GIT_UTIL_ERROR, {status: '240000', message: 'Git util error'})
eMap.set(ApiErrorNames.GIT_FLOW_ERROR, {status: '250000', message: 'Git flow error'})
eMap.set(ApiErrorNames.DATABASE_ERROR, {status: '300000', message: 'Database error'})
eMap.set(ApiErrorNames.RECORD_HAS_EXISTED, {status: '310000', message: 'Record has existed'})
eMap.set(ApiErrorNames.RECORD_MULTI_EXIST, {status: '320000', message: 'Record multi exist'})
eMap.set(ApiErrorNames.RECORD_NOT_EXIST, {status: '330000', message: 'Record not exist'})
eMap.set(ApiErrorNames.FILE_NOT_EXIST, {status: '340000', message: 'File not exist'})
eMap.set(ApiErrorNames.FILE_UPLOAD_FAILED, {status: '350000', message: 'File upload failed'})
eMap.set(ApiErrorNames.APP_NOT_INSTALLED, {status: '360000', message: 'App not installed error'})
eMap.set(ApiErrorNames.KERBEROS_ERROR, {status: '390000', message: 'Kerberos error'})
eMap.set(ApiErrorNames.VALIDATION_ERROR, {status: '400000', message: 'Validation error'})
eMap.set(ApiErrorNames.PASSWORD_NOT_MATCH, {status: '410000', message: 'Username and password don\'t match'})
eMap.set(ApiErrorNames.VERIFICATION_NOT_MATCH, {status: '420000', message: 'Verification not match'})
eMap.set(ApiErrorNames.CLUSTER_NOT_EXIST, {status: '500000', message: 'Cluster not exist'})
eMap.set(ApiErrorNames.HTTP_REQUEST_ERROR, {status: '600000', message: 'Http request error'})
eMap.set(ApiErrorNames.PLATFORM_REQUEST_ERROR, {status: '700000', message: 'Platform request error'})
eMap.set(ApiErrorNames.UPGRADE_CENTER_ERROR, {status: '710000', message: 'Upgrade center error'})
eMap.set(ApiErrorNames.INTERNAL_CALL_ERROR, {status: '800000', message: 'Internal call error'})
eMap.set(ApiErrorNames.PYTHON_CALL_ERROR, {status: '810000', message: 'Python call error'})
eMap.set(ApiErrorNames.SHELL_COMMAND_ERROR, {status: '820000', message: 'Shell command error'})

// get error message by name
const getErrorInfo = (name) => {
  let info = name ? eMap.get(name) : undefined
  info = info || eMap.get('ApiInternalError')
  return info
}

/**
 * custom API error
 */
class ApiError extends Error {
  constructor (name, raw) {
    super()
    const info = getErrorInfo(name)
    let message = raw && typeof raw === 'object' ? raw.message : raw
    message = message || info.message
    this.status = info.status
    this.message = {name, desc: message, raw: message}
  }
}

module.exports = {ApiErrorNames, ApiError}
