module.exports = {
  lintOnSave: false,
  pluginOptions: {
    electronBuilder: {
      chainWebpackMainProcess: (config) => {
      },
      chainWebpackRendererProcess: (config) => {
      },
      mainProcessWatch: [],
      mainProcessArgs: [],
      builderOptions: {
        productName: 'ENote',
        appId: 'com.ENote',
        mac: {
          icon: 'public/static/images/icons/icon.icns',
        },
      },
    },
  },
};
