const { src, dest, series } = require("gulp");
function html() {
 return src("app/**/*.html") 
 .pipe(dest("build/")); 
}
function img() {
 return src("app/img/*.{png,jpg,jpeg,gif}", 
 { base: "app" }) 
 .pipe(dest("build/")); 
}
exports.build = series(html, img);