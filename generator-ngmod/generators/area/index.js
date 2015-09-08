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
      'Welcome to the Angular Sub-Generator for AREAS.  An area is similar to an controller/views in MVC.'
    ));

    var prompts = [
    {
      name: 'appFolderName',
      message: '\nWhat is the name of the root folder for your app?',
      
    },
    {
      name: 'name',
      message: '\nWhat is the name of the area?'
    },
    {
      name: 'nav',
      message: '\nWhere does this area appear in the main navigation?  \nIf you do not want the area to appear in the main navigation leave it blank'
    },
    {
      name: 'route',
      message: '\nEnter the custom route you want to use for the area.  \nThe default is /NameOfTheAreaYouEntered (Example: /Home or /About).  \nIf you want to use that route leave this blank, if not enter a custom route (Example: /About/Company).'
    }

  ];
  
  this.prompt(prompts, function (props) {
      this.appFolderName = props.appFolderName;
      this.name = props.name;
      this.nav = props.nav;      
      this.route = props.route;
      
      done();
    }.bind(this));
  },
  writing: function () {
      var area = this.name; 
      
      var sourcePath = this.sourceRoot();
      var areaDirectory = './' + this.appFolderName + '/src/client/app/areas/';
      var areaPath = areaDirectory + area + '/';
      var navOption = '';
      var routeOption = '/' + this.name;
      
      var moduleName = area + '.module.js';
      var areaName = area + '.js';
      this.nav = this.nav;
      this.route = this.route;
      console.log('NAV: ' + this.nav);
      console.log('ROUTE: ' + this.route);
      
      if(this.nav.length > 0){
        navOption = 'nav: ' + this.nav + ',';  
      }
      
      if(this.route.length > 0){
        routeOption = this.route;  
      }
      
      mkdirp(areaDirectory +  area);
            
      var newModuleFile =  areaPath + moduleName;
      var newAreaFile = areaPath + areaName;
      var newAreaIndexFile = areaPath + 'index.html';
      var newAreaConfigFile = areaPath + 'config.route.js'
      var areaMainModuleFile = areaDirectory + 'areas.module.js';
      var mainIndexFile = './' + this.appFolderName + '/src/client/index.html';
      var includeModule = '<script src="/src/client/app/areas/'+ area + '/' + area + '.module.js"></script>';
      var includeJs = '<script src="/src/client/app/areas/'+ area + '/' + area + '.js"></script>';
      var configJs = '<script src="/src/client/app/areas/'+ area + '/config.route.js"></script>';
      
      var moduleFile = wiring.readFileAsString(sourcePath + '/test.module.js');
      moduleFile = moduleFile.replace('!!NAME!!',area);

      var serviceFile = wiring.readFileAsString(sourcePath + '/test.js');
      serviceFile = serviceFile.split('!!NAME!!').join(area);

      var configFile = wiring.readFileAsString(sourcePath + '/config.route.js');
      configFile = configFile.split('!!NAME!!').join(area);
      configFile = configFile.split('!!NAV!!').join(navOption);
      configFile = configFile.split('!!ROUTE!!').join(routeOption);

      var indexFile = wiring.readFileAsString(sourcePath + '/index.html');
            
      var mainModule = wiring.readFileAsString(areaMainModuleFile);
      mainModule = mainModule.split('//!!AREA!!').join(',\'app.areas.' + area + '\'\n//!!AREA!!');

      var rootFile = wiring.readFileAsString(mainIndexFile);
      rootFile = rootFile.replace('<!-- !!AREA!! -->', includeModule + '\n<!-- !!AREA!! -->');
      rootFile = rootFile.replace('<!-- !!AREA!! -->', includeJs + '\n<!-- !!AREA!! -->');
      rootFile = rootFile.replace('<!-- !!AREA!! -->', configJs + '\n<!-- !!AREA!! -->');

      this.write(newModuleFile,moduleFile);
      this.write(newAreaFile,serviceFile);
      this.write(newAreaIndexFile, indexFile);
      this.write(newAreaConfigFile, configFile);
      this.write(areaMainModuleFile, mainModule);
      this.write(mainIndexFile, rootFile);
  }
});
