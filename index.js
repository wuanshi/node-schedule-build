const schedule = require('node-schedule')
const { exec } = require('child_process')
const fs = require('fs')

const rule = new schedule.RecurrenceRule()
rule.hour = 0
rule.minute = 26

const filePath = 'build-log.txt'
// 创建一个定时任务
const job = schedule.scheduleJob(rule, () => {
  console.log('定时任务执行了')
  fs.appendFileSync(filePath, `定时任务执行 ${new Date().toLocaleString()}\n`, (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
  exec('cd /Users/xxx/xxx/xxx && rm -r ./node_modules/.cache && npm run build', (error, stdout, stderr) => {
    if (error) {
      console.error(`执行出错: ${error}`)
      return
    }
    console.log(`执行结果: ${stdout}`)
    fs.appendFileSync(filePath, `定时任务执行完成 ${new Date().toLocaleString()}\n`, (err) => {
      if (err) {
        console.error(err)
        return
      }
    })
  })

})
