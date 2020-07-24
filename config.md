### 搭建es6调试环境

1. 安装babel-cli和babel-preset-es2015。  
`npm i -D babel-cli babel-preset-es2015`

2. 根目录新建`.babelrc`文件
```json
{
  "presets": [
    "es2015"
  ],
  "plugins": []
}
```

3. 调试  
`npx babel-node ./test.js`

### 搭建ts调试环境
1. 安装typescript和ts-node  
`npm i -D typescript ts-node`

2. 调试  
`npx ts-node ./test.ts`