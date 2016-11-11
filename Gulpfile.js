var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename');

var tuts = [
	{
		nombre: "navbar basica",
		img: "WIP",
		descripcion: "lorem ipsum aqui",
		tut: "asdasd<code>computadora.romper();</code>asdasd"
	},
	{
		nombre: "navbar animaciones",
		img: "WIP",
		descripcion: "css3 es genial",
		tut: "Por favor, creen un tutorial, y pull request</br>"
	}
];

gulp.task('express', function() {
	var express = require('express'),
		Handlebars = require('handlebars'),
		exphbs = require('express-handlebars'),
		path = require('path');

	var app = express(),
		hbs = exphbs.create({
			defaultLayout: 'default',
			extname: '.hbs',
			layoutsDir: path.join(__dirname, 'views/layouts'),
			helpers: {
				active: function(name, active) {
					console.log("[Debug] " + name + " " + active);
					if(name == active) return Handlebars.SafeString('class="active"');
					else
						return "";
				}
			}
		});

	app.engine('.hbs', hbs.engine);

	app.set('view engine', '.hbs');
	app.set('views', path.join(__dirname, 'views'));
	app.use(express.static(__dirname));

	app.get('/', (request, response) => {
		response.render('index', {
			title: "Home",
			navActive: "home"
		});
	});

	app.get('/tutoriales', (request, response) => {
		response.render('tutoriales', {
			title: "Tutoriales",
			navActive: "tutoriales"
		});
	});

	app.get("/tuts.json", function(req, res){
		page = req.query.page;
		if(!page) {
			res.send(JSON.stringify(tuts));
			return;
		}
		toSend = {tuts: []};
		for (var i = page; i < page*10; i++) {
			toSend.tuts.push(tuts[i]);
		}
		res.send(JSON.stringify(toSend));
	});

	app.listen(8080, function(){
		console.log("[Express] Running on port 8080");
	});
});

gulp.task('default', ['styles', 'express', 'watch'], function() {

});

gulp.task('styles', function() {
	return sass('scss', { style: 'expanded' })
		.pipe(gulp.dest('css'))
    	.pipe(rename({suffix: '.min'}))
    	.pipe(minifycss())
    	.pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
	gulp.watch('scss/*.scss', ['styles']);
});
