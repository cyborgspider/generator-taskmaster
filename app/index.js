'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var TaskmasterGenerator = module.exports = function TaskmasterGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(TaskmasterGenerator, yeoman.generators.Base);

TaskmasterGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
  {
    name:    'siteName',
    message: 'What is the name of your site or project?',
  },
  {
    name:    'authorName',
    message: 'Who is the creator of this site?',
    default: "Carlos Ortega"
  }
  ];

  this.prompt(prompts, function (props) {
    this.siteName   = props.siteName;
    this.authorName = props.authorName;
    cb();
  }.bind(this));
};

TaskmasterGenerator.prototype.app = function app() {
  this.mkdir('src');
  this.mkdir('src/styles');
  this.mkdir('src/scripts');
  this.mkdir('src/images');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('_GruntFile.js', 'GruntFile.js');
  this.copy('_gitignore', '.gitignore');

  this.copy('_script.coffee', 'src/scripts/scripts.coffee');
  this.copy('_style.styl', 'src/styles/styles.styl');
  this.template('_index.jade', 'src/index.jade');
};

// TaskmasterGenerator.prototype.projectfiles = function projectfiles() {
//   this.copy('editorconfig', '.editorconfig');
//   this.copy('jshintrc', '.jshintrc');
// };
