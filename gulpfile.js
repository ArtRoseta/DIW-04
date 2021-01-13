const {watch, src, dest, series, parallel} = require('gulp');
const del = require('delete');
const sass = require('gulp-dart-scss');
const pleeease = require('gulp-pleeease');
const sassdoc = require('sassdoc');
const rename = require('gulp-rename')
const ssh = require('gulp-ssh');
const processhtml = require('gulp-processhtml');
const autoprefix = require('gulp-autoprefixer');

//Borrar lo que está en el directorio dist
function borrar(cb){
  del('./dist/*');
  cb();
}

//Construir el class
function build_css(){
  return src('scss/base.scss')
  .pipe(sass())
  .pipe(pleeease())
  .pipe(
    rename({
    basename: "style",
    suffix: ".min",
    extname: ".css"
  }))
  .pipe(dest('dist/css'));
}

//Construir la documentación
function build_docs(){
  var doc_options = {
    dest: "./dist/docs",
    verbose: true
  }
  return src("./scss/*.scss")
  .pipe(sassdoc(doc_options));
}

//Mover las imagenes de -img a -/dist/img
function move_img(){
  return src('./img/*')
  .pipe(dest('./dist/img'));
}

//Mover el html a la carpeta dist
function move_html(){
  return src('./index.html')
  .pipe(dest('./dist'));
}

//Mover el JS a -/dist/js
function move_js(){
  return src('./js/*')
  .pipe(dest('./dist/js'));
}

//Mover las fuentes a -/dist/fonts
function move_fonts(){
  return src('./fonts/*')
  .pipe(dest('./dist/fonts'));
}

//Mapa de configuración
var config = {
  host: '127.0.0.1',
  port: '22',
  username: 'root',
  password: '12345678'
}

//ssh
var gulpSSH = new ssh({
  ignoreError: false,
  sshConfig: config
});

//Subir al servidor
function upload_server(){
  return src('./dist/*', './dist/**/*')
  .pipe(gulpSSH.dest('/usr/local/apache2/htdocs'));
}

exports.borrar = borrar;
exports.build_css = build_css;
exports.build_docs= build_docs;
exports.move_img = move_img;
exports.move_html = move_html;
exports.move_js = move_js;
exports.move_fonts = move_fonts;
exports.upload_server = upload_server;
exports.process = series(borrar,
  parallel(build_css, build_docs), parallel(move_img, move_html,move_js,move_fonts));

exports.default = function(){
  watch("./scss/*.scss", build_css);
}
