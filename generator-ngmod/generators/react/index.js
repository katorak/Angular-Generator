'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var generators = yeoman.generators;
var yosay = require('yosay');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var wiring = require('html-wiring');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the Angular Modular Sub-Generator for REACT.JS TEMPLATES'
    ));

    var prompts = [{
      name: 'appFolderName',
      message: 'What is the name of the root folder for your app?'
    },{
      name: 'name',
      message: '\nWhat is the name of the react.js component?',
    }
];
  
  this.prompt(prompts, function (props) {
      this.appFolderName = props.appFolderName;
      this.name = props.name;      
      done();
    }.bind(this));
  },
  writing: function () {
      var reactDirectory = './' + this.appFolderName + '/src/client/app/reactComponents/';
      mkdirp(reactDirectory +  this.name);
      
      var sourcePath = this.sourceRoot();
      var newModuleFile = reactDirectory + this.name + '/' + this.name + '.module.js';
      var newServiceFile = reactDirectory + this.name + '/' + this.name + '.js';
      var serviceModuleFile = reactDirectory + 'react.module.js';
      var indexPath = './' + this.appFolderName + '/src/client/index.html';
      var includeModule = '<script src="/src/client/app/reactComponents/'+ this.name + '/' + this.name + '.module.js"></script>';
      var includeJs = '<script src="/src/client/app/reactComponents/'+ this.name + '/' + this.name + '.js"></script>';
      
      var moduleFile = wiring.readFileAsString(sourcePath + '/hello.module.js');
      moduleFile = moduleFile.replace('!!NAME!!',this.name);

      var serviceFile = wiring.readFileAsString(sourcePath + '/hello.js');
      serviceFile = serviceFile.split('!!NAME!!').join(this.name);

      var mainModule = wiring.readFileAsString(serviceModuleFile);
      mainModule = mainModule.split('//!!REACT!!').join(',\'app.react.' + this.name + '\'\n//!!REACT!!');

      var indexFile = wiring.readFileAsString(indexPath);
      indexFile = indexFile.replace('<!-- !!REACT!! -->', includeModule + '\n<!-- !!REACT!! -->');
      indexFile = indexFile.replace('<!-- !!REACT!! -->', includeJs + '\n<!-- !!REACT!! -->');

      this.write(newModuleFile,moduleFile);
      this.write(newServiceFile,serviceFile);
      this.write(serviceModuleFile, mainModule);
      this.write(indexPath, indexFile);
  }
});
