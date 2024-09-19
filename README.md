# CDK 練習用のプロジェクト

## よく使うコマンド
* `npm run build`       Typescriptへコンパイルする
* `npm run test`        JestのUnitTestを実行する
* `npx cdk bootstrap`   初回デプロイに必要なリソースを準備する
* `npx cdk ls`          プロジェクト内のスタック一覧を表示する
* `npx cdk diff`        デプロイ済みのスタックとの差分を確認する
* `npx cdk synth`       CDKコードをCloudFormationテンプレートに出力する
* `npx cdk deploy`      スタックをAWSにデプロイ
* `npm run auto-synth`  スタックから構成図を自動生成する
* `npx cdk migrate`     CloudFormationテンプレートをCDKのL1コンストラクトに変換する。CDK Projectごと作成されるので、別ディレクトリでコマンドを流すことを推奨
* `npx cdk import`      リソースをCloudFormation管理下に置く

### 構成図の確認方法
- cdk.out にあるテンプレートファイルを右クリックして Open with Application Composer を選択

# あとで対応、もしくは調べること
- Defaultの使い方 Stackで呼び出すときはつかう。コンストラクタの定義時には使わないでよいかどうか調べる
- CDK側が更新はいってもリソースは更新したくないとき、Retainルールをいれたいときの手順
- CDK importを試す
- クロスアカウントにまたがるCDKPipelineの構築
- CDKをつかっている場合のTagづけ問題
