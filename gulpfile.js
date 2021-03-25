
const use_preprocessor = "scss";

const css_preprocessor = (use_preprocessor === "less" ? "less" : "sass");


const { src, dest, series } = require("gulp");

const browser_sync = require("browser-sync").create();

const gh_pages = require("gh-pages");

const sass = require("gulp-sass");
const less = require("gulp-less");

function browserSync() {
    browser_sync.init({                
        server: { baseDir: "build/" }, 
        notify: false,                 
        online: true                   
                                        
    })
}

function html() {
    return src("app/**/*.html")  
          .pipe(dest("build/")); 
}

function css() {
    return src("app/css/*.css",  
               { base: "app" })  
          .pipe(dest("build/")); 
}

function preprocessCss() {
    return src(`app/${use_preprocessor}/*.${use_preprocessor}`) 
                                                                
          .pipe(eval(css_preprocessor)())                       
          .pipe(dest("build/css/"));                            
}

function img() {
    return src("app/img/*.{png,jpg,jpeg,gif}", 
               { base: "app" })                
          .pipe(dest("build/"));               
}

function deployOnGitHub() {
return gh_pages.publish("build",                                  
                       { message: "Auto-generated commit" },      
                       (err) => {                                 
                          if (err) { console.log(`Error: ${err}`); }
                       });
}

exports.default = series(html, css, preprocessCss, img, browserSync);

exports.build = series(html, css, preprocessCss, img);

exports.deploy = series(html, css, preprocessCss, img, deployOnGitHub);
© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
