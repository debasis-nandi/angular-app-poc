/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
        'npm:': '/node_modules/'
         //'npm:': '../syngenta/node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
        //'app': '../syngenta/src/app',
        'app': 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
      '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
      '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      'fusioncharts': 'npm:fusioncharts/',
      'angular2-fusioncharts': 'npm:angular2-fusioncharts/dist/',
      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'primeng': 'npm:primeng',
      'ng2-popover': 'npm:ng2-popover',
      'nouislider': 'npm:nouislider',
      'ng2-nouislider': 'npm:ng2-nouislider',
      'underscore': 'npm:underscore',
      'mydaterangepicker': 'npm:mydaterangepicker/bundles/mydaterangepicker.umd.js',
      'mydatepicker': 'npm:mydatepicker/bundles/mydatepicker.umd.min.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        defaultExtension: 'js',
        meta: {
          './*.js': {
           // loader: 'systemjs-angular-loader.js'
          }
        }
      },
      rxjs: {
        defaultExtension: 'js'
      },
      fusioncharts: {
          main: './fusioncharts.js',
          defaultExtension: 'js'
      },
      'angular2-fusioncharts': {
          main: './index.js',
          defaultExtension: 'js'
      },
      'primeng': { defaultExtensio: "js" },
      'ng2-popover': { "main": "index.js", "defaultExtension": "js" },
      'nouislider': { main: 'distribute/nouislider.js', defaultExtension: 'js' },
      'ng2-nouislider': { main: 'src/nouislider.js', defaultExtension: 'js' },
      'underscore': { main: 'underscore.js', defaultExtension: 'js' }
    }
  });
})(this);
