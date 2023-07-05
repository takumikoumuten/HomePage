import { Command } from "commander"
import inquirer from "inquirer"
import * as fs from "fs"
import * as path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const program = new Command()

program
  .command("news add")
  .description("サイトにニュースを追加します。")
  .action(() => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "ニュースのタイトルを入力してください！🗒️",
        },
        {
          type: "input",
          name: "date",
          message: "ニュースの日付を入力してください！📅 {yyyy/MM/dd}",
          validate: value => {
            const pass = value.match(
              /^(\d{4})\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/
            )
            if (pass) return true

            return "yyyy/MM/ddの形式で入力してください😔"
          },
        },
        {
          type: "input",
          name: "description",
          message: "ニュースの詳細を入力してください！😚",
        },
      ])
      .then(answers => {
        const parsed = {
          ...answers,
          date: new Date(answers.date).toJSON(),
        }

        const newsPath = path.join(__dirname, "../../src/data/news.json")
        const newsJson = fs.readFileSync(newsPath, "utf8")
        type NewsItem = { title: string; date: string; description: string }
        const news: NewsItem = JSON.parse(newsJson)

        if (
          !Array.isArray(news) ||
          !news.every(
            item => "title" in item && "date" in item && "description" in item
          )
        ) {
          console.error("ニュースのフォーマットが不正です")
          return
        }

        const newItem: NewsItem = parsed
        news.push(newItem)

        fs.writeFileSync(newsPath, JSON.stringify(news, null, 2))
      })
      .catch(error => {
        console.error(error)
      })
  })

program
  .command("help")
  .description("helpを表示します。")
  .action(() => {
    console.log(`
使い方: reform-site <コマンド>

コマンド一覧:
news add: ニュースを追加します。タイトル・日付(yyyy/MM/dd形式)・詳細を順に入力してください。
help:     このヘルプを表示します。

ちょっとしたヒント:
日付は'yyyy/MM/dd'の形式で正しく入力してくださいね。どんな小さなニュースでも、共有する価値があります😄！
`)
  })

program.parse(process.argv)
