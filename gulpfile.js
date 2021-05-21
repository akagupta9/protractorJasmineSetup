var gulp = require('gulp');
var del = require('del');
var { join } = require('path');

let rootFolder = join(__dirname);
let dataFolder = join(rootFolder, 'data/*.json');
let dataDestinationFolder = join(rootFolder, 'buildFolder');

gulp.task('copy:data', () => {
    return gulp.src(dataFolder).pipe(gulp.dest(join(dataDestinationFolder, 'data/')))
})

gulp.task('clean:dist' , ()=>{
    return del('buildFolder/**');
})

gulp.task('clean:temp' , ()=>{
    return del('Reports/**');
})