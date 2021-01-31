module.exports = {
  default: "nps help",
  scripts: {
    api: {
      deploy: {
        script: "firebase deploy",
        description: "deploy static content"
      }
    }
  },
  options: {
    silent: true
  }
};