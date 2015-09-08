'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var generators = yeoman.generators;
var yosay = require('yosay');
var chalk = require('chalk');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the Angular Modular Generator: ' + chalk.blue('Ngmod')
    ));

    var prompts = [{
      name: 'appName',
      message: 'What is your app\'s name?'
    }];
  
  this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.generateHomeArea = props.autoGenerateHome;
      
      done();
    }.bind(this));
  },
  scaffoldFolders: function () {
    
        var sourcePath = this.sourceRoot();
        
        var sourceFolder = sourcePath + '/baseApp';
        var destFolder = './' + this.appName;
        
        console.log(chalk.red('\nSource Folder: ' + sourceFolder));
        console.log(chalk.red('\nDestination Folder: ' + destFolder));
        
        mkdirp('./' + this.appName);
        this.directory(sourceFolder, destFolder);
        
        console.log(chalk.green('\nFolder Structure Setup\n'));
    },
  runNpm: function () {
        console.log(chalk.blue('\nStarting npm and bower installs\n'));
        var npmdir = process.cwd() + '/' + this.appName;
          process.chdir(npmdir);
      
          this.installDependencies({
            bower: true,
            npm: true
          });
        console.log(chalk.green('Completed running npm and bower installs\n'));
        console.log(chalk.red('\n\nEverything Setup !!!\n'));
    }
});
