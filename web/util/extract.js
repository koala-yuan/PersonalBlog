const path = require('path')
const config = require('config')
const { get } = require('lodash')
const { USER } = config.get('BACKEND')
const {
  readFileJSON,
  readImage,
  readCsv,
  existsFile
} = require(path.join(global.UTILPATH, 'file'))

const LOCALMODE = global.LOCALMODE !== '0'
const BASE = LOCALMODE ? global.RESULTDATAROOT : `/home/${USER}/backtesting`

const checkRead = async (file, func, opt) => {
  const uri = path.join(BASE, file)
  console.log('check read:', { uri })

  let ret = existsFile(uri) || null

  if (ret) {
    try {
      ret = await func(uri, opt)
    } catch (e) {
      ret = null
      console.log(`Read file ${uri} failed: `, JSON.stringify(e))
    }
  }

  return ret
}

const extractBacktestingResult = async (data) => {
  const csvOpt = {
    noheader: true,
    output: 'csv'
  }

  const folder = LOCALMODE ? '' : get(data, 'backtestingSavePath', '').replace(`hdfs://default/user/${USER}/backtesting/`, '/')

  const evaluationData = await checkRead(`${folder}/evaluation_data.json`, readFileJSON)
  const fundDaily = await checkRead(`${folder}/fund_daily.png`, readImage)
  const netValueDaily = await checkRead(`${folder}/netValue_daily.png`, readImage)
  const position = await checkRead(`${folder}/Position.csv`, readCsv, csvOpt)
  const profitAndLoss = await checkRead(`${folder}/ProfitAndLoss.csv`, readCsv, csvOpt)
  const trading = await checkRead(`${folder}/Trading.csv`, readCsv, csvOpt)

  data.raw = {
    evaluationData,
    fundDaily,
    netValueDaily,
    position,
    profitAndLoss,
    trading
  }

  return data
}

const getBacktestingResultArchive = async (data) => {
  const folder = LOCALMODE ? '' : get(data, 'backtestingSavePath', '').replace(`hdfs://default/user/${USER}/backtesting/`, '/')

  return path.join(BASE, folder, 'archive.zip')
}

module.exports = { extractBacktestingResult, getBacktestingResultArchive }
