import path from 'path'
import fs from 'fs'

/**
 * 蛇形转小驼峰
 */
function snakeToCamel(str: string) {
  return str.replace(/([-_]\w)/g, function (match) {
    return match.toUpperCase().replace('-', '').replace('_', '')
  })
}

/**
 * 小驼峰转蛇形
 * @param str
 * @returns
 */
function camelToSnake(str) {
  return str.replace(/[A-Z]/g, function (match) {
    return '_' + match.toLowerCase()
  })
}

/**
 * 转成大驼峰格式化
 */
function toUpperCaseCamelCase(string) {
  // 分割字符串，以小驼峰形式的分隔符为准
  const words = string.split(/[_\s]+|(?=[A-Z])/)

  // 将每个单词的首字母大写
  const upperCaseWords = words.map(
    word => word.charAt(0).toUpperCase() + word.slice(1)
  )

  // 将单词拼接在一起，组成大驼峰形式
  return upperCaseWords.join('')
}

const urlSplit = (url: string): string[] => {
  return url.split('/').filter(Boolean)
}

function writeFileInMultiLevelDirectorySync(filePath, content) {
  try {
    // 确保目录存在，如果不存在则创建
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    // 写入文件
    fs.writeFileSync(filePath, content, 'utf8')
  } catch (err) {
    console.log(`写入文件失败: \n${filePath}\n`)
    console.error(`Failed to write file: ${err.message}`)
    throw err
  }
}

/**
 * 计算相对路径
 * @param from
 * @param to
 * @returns
 */
function getRelativePath(from: string, to: string) {
  // 使用path.relative计算相对路径
  const relativePath = path.relative(path.dirname(from), to)
  return relativePath
}

function deleteFilesInDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return
  }

  try {
    console.log('删除目录: ' + dirPath)
    fs.rmSync(dirPath, { recursive: true })
  } catch (err) {
    console.error('删除文件夹时出错：', err)
    throw err
  }
}

function normalizeUrl(url) {
  // 使用正则表达式匹配一个或多个斜杠，并替换为单个斜杠
  // g 代表全局匹配，即替换所有匹配项
  return url.replace(/\/{2,}/g, '/')
}

export {
  snakeToCamel,
  urlSplit,
  camelToSnake,
  toUpperCaseCamelCase,
  writeFileInMultiLevelDirectorySync,
  getRelativePath,
  deleteFilesInDirectory,
  normalizeUrl,
}
