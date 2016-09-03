'use strict'

module.exports = function(grunt) {
//	grunt.loadNpmTasks("grunt-contrib-less"); //подключение плагина
//	grunt.loadNpmTasks("grunt-postcss");
//	grunt.loadNpmTasks("grunt-contrib-watch");
//	grunt.loadNpmTasks("grunt-browser-sync");
	require("load-grunt-tasks")(grunt);
	
	
	grunt.initConfig ({
		less: {   //конфигурация
			style: {
				files: {
					"css/style.css" : "less/style.less"
				}
			}
		},
		postcss: {
			options: {
				map: true,
				processors: [
					require('autoprefixer')({browsers: 'last 2 versions'}),  //нужно уст. с postcss
					require('css-mqpacker')({
						sort: true
					})
				]
			},
			dist: {src: 'css/*.css'}
		},
		watch: {
			style: {
				files: ["less/**/*.less"],
				tasks: ["less", "postcss"]
			}
		},
		browserSync: {
			server: {
				bsFiles: {
					src: ["*.html", "*css/*.css"]   //слежение
				},
				options: {
					server: ".", //корень проекта
					watchTask: true  
				}
			}
		},
		csso: {
			style: {
				options: {
					report: "gzip"
				},
				files: {
					"css/style.min.css" : ["css/style.css"]
				}
			}
		},
		imagemin: {
			images: {
				options: {
					optimizationLevel: 3
				},
				files: [{
					expand: true,
					src: ["img/**/*.{png, jpg, gif}"]
				}]
			}
		},
		svgstore: {
			options: {
				svg: {
					style: "display: none"
				}
			},
			symbols: {
				files: {
					"img/symbols.svg" : ["img/icons/*.svg"]
				}
			}
		},
		svgmin: {
			symbols: {
				files: {
					expand: true,
					src: ["img/icons/*.svg"]
				}
			}
		},
		copy: {
			build: {
				files: [{
					expand: true,
					src: [
						"fonts/**/*.{woff,woff2}",
						"img/**",
						"js/**",
						"*.html"
					],
					dest: "build"
				}]
			}
		},
		clean: {
			build: ["build"]
		}
		
	});
	
	
	grunt.registerTask("symbols", ["svgmin", "svgstore"]); // alias - таск symbols
	grunt.registerTask("serve", ["browserSync", "watch"]);
	grunt.registerTask("build", [
		"less",
		"postcss",
		"csso",
		"symbols",         //Это сборка не в продакш  (grunt build)
		"imagemin"         //Сборку в продакшн не делал
	]);
	
};