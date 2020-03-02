module.exports = {
  presets: [
    "@vue/app"
    // ['env',            //添加 babel-preset-env 配置
    // {
    //   'modules': false
    // }
    // ]
  ],
  plugins: [
    // [
    //   "import",
    //   {
    //     libraryName: "vant",
    //     libraryDirectory: "es",
    //     style: true
    //   },
    //   "vant"
    // ]
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ]
};
