function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
  /*!**************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
    \**************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppAppComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n<app-navbar></app-navbar>\n\n<main role=\"main\" class=\"container\">\n\n    <app-engine></app-engine>\n  \n</main>\n\n\n\n\n\n\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/engine/engine.component.html":
  /*!************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/engine/engine.component.html ***!
    \************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppEngineEngineComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"engine-wrapper\">\n  <canvas #rendererCanvas id=\"renderCanvas\" \n    (mousedown)=\"mousedown($event)\" \n    (mousemove)=\"mousemove($event)\" >\n  </canvas>\n</div>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/navbar/navbar.component.html":
  /*!************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/navbar/navbar.component.html ***!
    \************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppNavbarNavbarComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<nav class=\"navbar navbar-expand-sm navbar-light bg-light\" style=\"z-index: 1;\">\n\n    <a class=\"navbar-brand\" href=\"#\">Maximum Coverage using GA</a>\n    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n        <span class=\"navbar-toggler-icon\"></span>\n    </button>\n\n    <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n        <button type=\"button\" class=\"btn btn-outline-primary btn-sm\" (click)=\"clear_clickHandler()\">Clear</button>\n    </div>\n\n</nav> ";
    /***/
  },

  /***/
  "./package.json":
  /*!**********************!*\
    !*** ./package.json ***!
    \**********************/

  /*! exports provided: name, version, license, scripts, private, dependencies, devDependencies, default */

  /***/
  function packageJson(module) {
    module.exports = JSON.parse("{\"name\":\"ng-three-template\",\"version\":\"0.0.0\",\"license\":\"MIT\",\"scripts\":{\"ng\":\"ng\",\"start\":\"ng serve\",\"build\":\"ng build\",\"build:prod\":\"ng build --prod\",\"build:both\":\"npm run build && npm run build:prod\",\"test\":\"ng test\",\"lint\":\"ng lint\",\"e2e\":\"ng e2e\",\"postinstall\":\"ngcc\"},\"private\":true,\"dependencies\":{\"@angular/animations\":\"~9.1.3\",\"@angular/common\":\"~9.1.3\",\"@angular/compiler\":\"~9.1.3\",\"@angular/core\":\"~9.1.3\",\"@angular/forms\":\"~9.1.3\",\"@angular/platform-browser\":\"~9.1.3\",\"@angular/platform-browser-dynamic\":\"~9.1.3\",\"@angular/router\":\"~9.1.3\",\"bootstrap\":\"^4.4.1\",\"rxjs\":\"~6.5.5\",\"three\":\"^0.115.0\",\"tslib\":\"^1.11.1\",\"zone.js\":\"~0.10.3\"},\"devDependencies\":{\"@angular-devkit/build-angular\":\"~0.901.3\",\"@angular/cli\":\"~9.1.3\",\"@angular/compiler-cli\":\"~9.1.3\",\"@angular/language-service\":\"~9.1.3\",\"@types/jasmine\":\"~3.5.10\",\"@types/jasminewd2\":\"~2.0.8\",\"@types/node\":\"^12.12.37\",\"@types/three\":\"^0.103.2\",\"@types/webgl2\":\"^0.0.5\",\"codelyzer\":\"^5.2.2\",\"jasmine-core\":\"~3.5.0\",\"jasmine-spec-reporter\":\"~5.0.2\",\"karma\":\"~4.4.1\",\"karma-chrome-launcher\":\"~3.1.0\",\"karma-coverage-istanbul-reporter\":\"~2.1.1\",\"karma-jasmine\":\"~3.1.1\",\"karma-jasmine-html-reporter\":\"~1.5.3\",\"protractor\":\"~5.4.4\",\"ts-node\":\"~8.9.1\",\"tslint\":\"~6.1.2\",\"typescript\":\"~3.8.3\"}}");
    /***/
  },

  /***/
  "./src/$$_lazy_route_resource lazy recursive":
  /*!**********************************************************!*\
    !*** ./src/$$_lazy_route_resource lazy namespace object ***!
    \**********************************************************/

  /*! no static exports found */

  /***/
  function src$$_lazy_route_resourceLazyRecursive(module, exports) {
    function webpackEmptyAsyncContext(req) {
      // Here Promise.resolve().then() is used instead of new Promise() to prevent
      // uncaught exception popping up in devtools
      return Promise.resolve().then(function () {
        var e = new Error("Cannot find module '" + req + "'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
      });
    }

    webpackEmptyAsyncContext.keys = function () {
      return [];
    };

    webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
    module.exports = webpackEmptyAsyncContext;
    webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
    /***/
  },

  /***/
  "./src/app/app.component.ts":
  /*!**********************************!*\
    !*** ./src/app/app.component.ts ***!
    \**********************************/

  /*! exports provided: AppComponent */

  /***/
  function srcAppAppComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
      return AppComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var AppComponent = function AppComponent() {
      _classCallCheck(this, AppComponent);
    };

    AppComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-root',
      template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! raw-loader!./app.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html"))["default"]
    })], AppComponent);
    /***/
  },

  /***/
  "./src/app/app.module.ts":
  /*!*******************************!*\
    !*** ./src/app/app.module.ts ***!
    \*******************************/

  /*! exports provided: AppModule */

  /***/
  function srcAppAppModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppModule", function () {
      return AppModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
    /* harmony import */


    var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./app.component */
    "./src/app/app.component.ts");
    /* harmony import */


    var _engine_engine_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./engine/engine.component */
    "./src/app/engine/engine.component.ts");
    /* harmony import */


    var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./navbar/navbar.component */
    "./src/app/navbar/navbar.component.ts");

    var AppModule = function AppModule() {
      _classCallCheck(this, AppModule);
    };

    AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"], _engine_engine_component__WEBPACK_IMPORTED_MODULE_4__["EngineComponent"], _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_5__["NavbarComponent"]],
      imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"]],
      providers: [],
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
    })], AppModule);
    /***/
  },

  /***/
  "./src/app/engine/engine.component.ts":
  /*!********************************************!*\
    !*** ./src/app/engine/engine.component.ts ***!
    \********************************************/

  /*! exports provided: EngineComponent */

  /***/
  function srcAppEngineEngineComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EngineComponent", function () {
      return EngineComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _engine_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./engine.service */
    "./src/app/engine/engine.service.ts");
    /* harmony import */


    var _services_message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../services/message.service */
    "./src/app/services/message.service.ts");
    /* harmony import */


    var _services_function_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../services/function.service */
    "./src/app/services/function.service.ts");
    /* harmony import */


    var _polygon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./polygon */
    "./src/app/engine/polygon.ts");

    var EngineComponent = /*#__PURE__*/function () {
      function EngineComponent(engServ, MS, FS) {
        _classCallCheck(this, EngineComponent);

        this.engServ = engServ;
        this.MS = MS;
        this.FS = FS; // subscribe to component messages

        this.subscription = this.MS.getMessage().subscribe(function (message) {
          if (message == '') {}
        });
        this.polygon = new _polygon__WEBPACK_IMPORTED_MODULE_5__["Polygon"](this.engServ, this.FS);
      }

      _createClass(EngineComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.engServ.createScene(this.rendererCanvas);
          this.engServ.animate();
        }
      }, {
        key: "mousedown",
        value: function mousedown(e) {
          var relative = this.engServ.get3DPosition(e.clientX, e.clientY); //left mouse click

          if (e.button == 0) {
            this.polygon.onMouseDown(relative);
          } //right mouse click
          else if (e.button == 2) {
              this.polygon.onStop(relative);
            }
        }
      }, {
        key: "mouseup",
        value: function mouseup(e) {}
      }, {
        key: "mousemove",
        value: function mousemove(e) {
          var relative = this.engServ.get3DPosition(e.clientX, e.clientY);
          this.polygon.onMouseMove(relative);
        }
      }]);

      return EngineComponent;
    }();

    EngineComponent.ctorParameters = function () {
      return [{
        type: _engine_service__WEBPACK_IMPORTED_MODULE_2__["EngineService"]
      }, {
        type: _services_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"]
      }, {
        type: _services_function_service__WEBPACK_IMPORTED_MODULE_4__["FunctionService"]
      }];
    };

    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('rendererCanvas', {
      "static": true
    }), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])], EngineComponent.prototype, "rendererCanvas", void 0);
    EngineComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-engine',
      template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! raw-loader!./engine.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/engine/engine.component.html"))["default"]
    }), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_engine_service__WEBPACK_IMPORTED_MODULE_2__["EngineService"], _services_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"], _services_function_service__WEBPACK_IMPORTED_MODULE_4__["FunctionService"]])], EngineComponent);
    /***/
  },

  /***/
  "./src/app/engine/engine.service.ts":
  /*!******************************************!*\
    !*** ./src/app/engine/engine.service.ts ***!
    \******************************************/

  /*! exports provided: EngineService */

  /***/
  function srcAppEngineEngineServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EngineService", function () {
      return EngineService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! three */
    "./node_modules/three/build/three.module.js");

    var EngineService = /*#__PURE__*/function () {
      function EngineService(ngZone) {
        _classCallCheck(this, EngineService);

        this.ngZone = ngZone;
        this.frameId = null;
      }

      _createClass(EngineService, [{
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          if (this.frameId != null) {
            cancelAnimationFrame(this.frameId);
          }
        }
      }, {
        key: "createScene",
        value: function createScene(canvas) {
          this.canvasRef = canvas; // The first step is to get the reference of the canvas element from our HTML document

          this.canvas = canvas.nativeElement;
          this.renderer = new three__WEBPACK_IMPORTED_MODULE_2__["WebGLRenderer"]({
            canvas: this.canvas,
            alpha: true,
            antialias: true // smooth edges

          });
          this.renderer.setSize(window.innerWidth, window.innerHeight);
          this.renderer.setClearColor("#000", 1); // create the scene

          this.scene = new three__WEBPACK_IMPORTED_MODULE_2__["Scene"]();
          this.camera = new three__WEBPACK_IMPORTED_MODULE_2__["OrthographicCamera"](this.canvas.clientWidth / -20, this.canvas.clientWidth / 20, this.canvas.clientHeight / 20, this.canvas.clientHeight / -20, 1, 1000);
          this.camera.position.z = 400;
          this.scene.add(this.camera); // soft white light

          this.light = new three__WEBPACK_IMPORTED_MODULE_2__["AmbientLight"](0x404040);
          this.light.position.z = 10;
          this.scene.add(this.light);
          this.group = new three__WEBPACK_IMPORTED_MODULE_2__["Group"]();
          this.scene.add(this.group); //background image

          this.loadTransparentBackground();
        }
      }, {
        key: "loadTransparentBackground",
        value: function loadTransparentBackground() {
          // Load a custom material
          var material = new three__WEBPACK_IMPORTED_MODULE_2__["MeshLambertMaterial"]({
            color: 0xFFE000,
            opacity: 0.1,
            transparent: true,
            wireframe: false
          });
          var aspect = this.canvas.clientWidth / this.canvas.clientHeight;
          var heightSegments = Math.round(this.canvas.clientHeight / 10);
          var widthSegments = Math.round(heightSegments * aspect); // create a plane geometry

          var geometry = new three__WEBPACK_IMPORTED_MODULE_2__["PlaneGeometry"](this.canvas.clientWidth / 15, this.canvas.clientHeight / 15, widthSegments, heightSegments);
          var background = new three__WEBPACK_IMPORTED_MODULE_2__["Mesh"](geometry, material); // set the position of the background mesh in the x,y,z dimensions

          background.position.set(0, 0, 0);
          background.name = "Background"; // add the image to the scene

          this.scene.add(background);
          this.loadPoints(geometry);
        }
      }, {
        key: "loadPoints",
        value: function loadPoints(planeGeometry) {
          var vertices = planeGeometry.vertices;
          var positions = new Float32Array(vertices.length * 3);
          var colors = new Float32Array(vertices.length * 3);
          var vertex;
          var color = new three__WEBPACK_IMPORTED_MODULE_2__["Color"]();

          for (var i = 0; i < vertices.length; i++) {
            vertex = vertices[i];
            vertex.toArray(positions, i * 3);
            color.setRGB(255, 0, 0);
            color.toArray(colors, i * 3);
          }

          var geometry = new three__WEBPACK_IMPORTED_MODULE_2__["BufferGeometry"]();
          geometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_2__["BufferAttribute"](positions, 3));
          geometry.setAttribute('color', new three__WEBPACK_IMPORTED_MODULE_2__["BufferAttribute"](colors, 3));
          var material = new three__WEBPACK_IMPORTED_MODULE_2__["PointsMaterial"]({
            size: 2,
            opacity: 0.5,
            transparent: true,
            vertexColors: true
          });
          var points = new three__WEBPACK_IMPORTED_MODULE_2__["Points"](geometry, material);
          points.name = "Points";
          this.group.add(points);
        }
      }, {
        key: "animate",
        value: function animate() {
          var _this = this;

          // We have to run this outside angular zones,
          // because it could trigger heavy changeDetection cycles.
          this.ngZone.runOutsideAngular(function () {
            if (document.readyState !== 'loading') {
              _this.render();
            } else {
              window.addEventListener('DOMContentLoaded', function () {
                _this.render();
              });
            }

            window.addEventListener('resize', function () {
              _this.resize();
            });
          });
        }
      }, {
        key: "render",
        value: function render() {
          var _this2 = this;

          this.frameId = requestAnimationFrame(function () {
            _this2.render();
          });
          this.renderer.render(this.scene, this.camera);
        }
      }, {
        key: "resize",
        value: function resize() {
          var width = this.canvas.clientWidth;
          var height = this.canvas.clientHeight;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(width, height);
        }
      }, {
        key: "get3DPosition",
        value: function get3DPosition(clientX, clientY) {
          var position = {
            x: (clientX - this.getCurrentOffset(this.canvasRef).left) / this.canvas.clientWidth * 2 - 1,
            y: -((clientY - this.getCurrentOffset(this.canvasRef).top) / this.canvas.clientHeight) * 2 + 1
          };
          var rayCaster = new three__WEBPACK_IMPORTED_MODULE_2__["Raycaster"]();
          rayCaster.setFromCamera(position, this.camera);
          var intersects = rayCaster.intersectObjects(this.scene.children, true);

          if (intersects.length > 0) {
            //if canvas has multiple Object, then find the background object to get exact mouse osition
            for (var i = 0; i < intersects.length; i++) {
              if (intersects[i].object.name == "Background") {
                return intersects[i].point;
              }
            }
          }
        }
      }, {
        key: "getCurrentOffset",
        value: function getCurrentOffset(element) {
          var rect = element.nativeElement.getBoundingClientRect();
          var top = rect.top + window.pageYOffset - document.documentElement.clientTop;
          var left = rect.left + window.pageXOffset - document.documentElement.clientLeft;
          return {
            left: left,
            top: top
          };
        }
      }]);

      return EngineService;
    }();

    EngineService.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]
      }];
    };

    EngineService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    }), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])], EngineService);
    /***/
  },

  /***/
  "./src/app/engine/polygon.ts":
  /*!***********************************!*\
    !*** ./src/app/engine/polygon.ts ***!
    \***********************************/

  /*! exports provided: Polygon */

  /***/
  function srcAppEnginePolygonTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Polygon", function () {
      return Polygon;
    });
    /* harmony import */


    var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! three */
    "./node_modules/three/build/three.module.js");

    var Polygon = /*#__PURE__*/function () {
      function Polygon(engServ, FS) {
        _classCallCheck(this, Polygon);

        this.engServ = engServ;
        this.FS = FS;
        this.count = 0;
        this.MAX_POINTS = 100;
      }

      _createClass(Polygon, [{
        key: "onMouseDown",
        value: function onMouseDown(relative) {
          // on first click add an extra point
          if (this.count === 0) {
            this.engServ.group.remove(this.line);
            this.line = this.lineGeometry();
            this.line.name = 'Polygon';
            this.engServ.group.add(this.line);
            this.addPoint(relative);
          }

          this.addPoint(relative); // when drawing of a line segment is completed 
          // then call this function recursively to start drawing a new line segment

          if (this.count > this.MAX_POINTS) {
            this.onStop(relative); //bounding sphere is set so that line can be selected using mouse
            //this.line.geometry.computeBoundingSphere();       
            //this.onMouseDown(relative);
          }
        }
      }, {
        key: "onMouseMove",
        value: function onMouseMove(relative) {
          if (this.count !== 0) {
            if (!relative) {
              return;
            }

            this.updateLine(relative);
          }
        }
      }, {
        key: "onStop",
        value: function onStop(relative) {
          //if line is already drawing
          if (this.count > 0) {
            //remove unused line geometry array space
            var lineArray = new Float32Array(this.line.geometry.attributes.position.array);
            lineArray = lineArray.slice(0, this.count * 3);
            lineArray[this.count * 3 - 3] = lineArray[0];
            lineArray[this.count * 3 - 2] = lineArray[1];
            lineArray[this.count * 3 - 1] = lineArray[2];
            this.line.geometry.attributes.position.array = lineArray;
            this.line.geometry.attributes.position.needsUpdate = true;
            this.count = 0; //this.MS.sendMessage( "show_points_in_polygon" );

            this.FS.show_points_in_polygon();
          }
        }
      }, {
        key: "lineGeometry",
        value: function lineGeometry() {
          // geometry
          var geometry = new three__WEBPACK_IMPORTED_MODULE_0__["BufferGeometry"]();
          this.positions = new Float32Array(this.MAX_POINTS * 3);
          geometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_0__["BufferAttribute"](this.positions, 3)); // material

          var material = new three__WEBPACK_IMPORTED_MODULE_0__["LineBasicMaterial"]({
            color: 0x49BFFE
          }); // line

          var line = new three__WEBPACK_IMPORTED_MODULE_0__["Line"](geometry, material);
          return line;
        } // update line

      }, {
        key: "updateLine",
        value: function updateLine(relative) {
          this.positions[this.count * 3 - 3] = relative.x;
          this.positions[this.count * 3 - 2] = relative.y;
          this.positions[this.count * 3 - 1] = relative.z;
          this.line.geometry.attributes.position.needsUpdate = true;
        } // add point

      }, {
        key: "addPoint",
        value: function addPoint(relative) {
          this.positions[this.count * 3 + 0] = relative.x;
          this.positions[this.count * 3 + 1] = relative.y;
          this.positions[this.count * 3 + 2] = relative.z;
          this.count++;
          this.line.geometry.setDrawRange(0, this.count);
          this.line.geometry.attributes.position.needsUpdate = true;
        }
      }]);

      return Polygon;
    }();
    /***/

  },

  /***/
  "./src/app/navbar/navbar.component.scss":
  /*!**********************************************!*\
    !*** ./src/app/navbar/navbar.component.scss ***!
    \**********************************************/

  /*! exports provided: default */

  /***/
  function srcAppNavbarNavbarComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL25hdmJhci9uYXZiYXIuY29tcG9uZW50LnNjc3MifQ== */";
    /***/
  },

  /***/
  "./src/app/navbar/navbar.component.ts":
  /*!********************************************!*\
    !*** ./src/app/navbar/navbar.component.ts ***!
    \********************************************/

  /*! exports provided: NavbarComponent */

  /***/
  function srcAppNavbarNavbarComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NavbarComponent", function () {
      return NavbarComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _engine_engine_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../engine/engine.service */
    "./src/app/engine/engine.service.ts");

    var NavbarComponent = /*#__PURE__*/function () {
      function NavbarComponent(engServ) {
        _classCallCheck(this, NavbarComponent);

        this.engServ = engServ;
      }

      _createClass(NavbarComponent, [{
        key: "clear_clickHandler",
        value: function clear_clickHandler() {
          this.engServ.group.remove(this.engServ.group.getObjectByName("Polygon"));
          var points = this.engServ.group.getObjectByName("Points");
          var pointPosition = points.geometry.attributes.position.array;

          for (var i = 0; i < pointPosition.length;) {
            var pointColor = points.geometry.attributes.color.array;
            pointColor[i] = 255;
            pointColor[i + 1] = 0;
            pointColor[i + 2] = 0;
            points.geometry.attributes.color.needsUpdate = true;
            i = i + 3;
          }
        }
      }]);

      return NavbarComponent;
    }();

    NavbarComponent.ctorParameters = function () {
      return [{
        type: _engine_engine_service__WEBPACK_IMPORTED_MODULE_2__["EngineService"]
      }];
    };

    NavbarComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-navbar',
      template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! raw-loader!./navbar.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/navbar/navbar.component.html"))["default"],
      styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! ./navbar.component.scss */
      "./src/app/navbar/navbar.component.scss"))["default"]]
    }), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_engine_engine_service__WEBPACK_IMPORTED_MODULE_2__["EngineService"]])], NavbarComponent);
    /***/
  },

  /***/
  "./src/app/services/function.service.ts":
  /*!**********************************************!*\
    !*** ./src/app/services/function.service.ts ***!
    \**********************************************/

  /*! exports provided: FunctionService */

  /***/
  function srcAppServicesFunctionServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "FunctionService", function () {
      return FunctionService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _engine_engine_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../engine/engine.service */
    "./src/app/engine/engine.service.ts");

    var FunctionService = /*#__PURE__*/function () {
      function FunctionService(engServ) {
        _classCallCheck(this, FunctionService);

        this.engServ = engServ;
      }

      _createClass(FunctionService, [{
        key: "show_points_in_polygon",
        value: function show_points_in_polygon() {
          var points = this.engServ.group.getObjectByName("Points");
          var pointPosition = points.geometry.attributes.position.array;
          var polygon = this.engServ.group.getObjectByName("Polygon");
          var polygonPosition = polygon.geometry.attributes.position.array;

          for (var i = 0; i < pointPosition.length;) {
            var pointX = pointPosition[i];
            var pointY = pointPosition[i + 1];
            var point_in_polygon = this.is_point_in_polygon(pointX, pointY, polygonPosition);

            if (point_in_polygon) {
              var pointColor = points.geometry.attributes.color.array;
              pointColor[i] = 0;
              pointColor[i + 1] = 255;
              pointColor[i + 2] = 255;
              points.geometry.attributes.color.needsUpdate = true;
            }

            i = i + 3;
          }
        }
      }, {
        key: "is_point_in_polygon",
        value: function is_point_in_polygon(pointX, pointY, vs) {
          var inside = false;

          for (var i = 0, j = vs.length - 6; i < vs.length - 3;) {
            var xi = vs[i],
                yi = vs[i + 1];
            var xj = vs[j],
                yj = vs[j + 1];
            var intersect = yi > pointY != yj > pointY && pointX < (xj - xi) * (pointY - yi) / (yj - yi) + xi;
            if (intersect) inside = !inside;
            j = i;
            i = i + 3;
          }

          return inside;
        }
      }]);

      return FunctionService;
    }();

    FunctionService.ctorParameters = function () {
      return [{
        type: _engine_engine_service__WEBPACK_IMPORTED_MODULE_2__["EngineService"]
      }];
    };

    FunctionService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    }), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_engine_engine_service__WEBPACK_IMPORTED_MODULE_2__["EngineService"]])], FunctionService);
    /***/
  },

  /***/
  "./src/app/services/message.service.ts":
  /*!*********************************************!*\
    !*** ./src/app/services/message.service.ts ***!
    \*********************************************/

  /*! exports provided: MessageService */

  /***/
  function srcAppServicesMessageServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MessageService", function () {
      return MessageService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");

    var MessageService = /*#__PURE__*/function () {
      function MessageService() {
        _classCallCheck(this, MessageService);

        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
      }

      _createClass(MessageService, [{
        key: "sendMessage",
        value: function sendMessage(message) {
          this.subject.next(message);
        }
      }, {
        key: "getMessage",
        value: function getMessage() {
          return this.subject.asObservable();
        }
      }]);

      return MessageService;
    }();

    MessageService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], MessageService);
    /***/
  },

  /***/
  "./src/environments/environment.ts":
  /*!*****************************************!*\
    !*** ./src/environments/environment.ts ***!
    \*****************************************/

  /*! exports provided: environment */

  /***/
  function srcEnvironmentsEnvironmentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "environment", function () {
      return environment;
    }); // The file contents for the current environment will overwrite these during build.
    // The build system defaults to the dev environment which uses `environment.ts`, but if you do
    // `ng build --env=prod` then `environment.prod.ts` will be used instead.
    // The list of which env maps to which file can be found in `.angular-cli.json`.


    var environment = {
      production: false,
      version: __webpack_require__(
      /*! ../../package.json */
      "./package.json").version
    };
    /***/
  },

  /***/
  "./src/main.ts":
  /*!*********************!*\
    !*** ./src/main.ts ***!
    \*********************/

  /*! no exports provided */

  /***/
  function srcMainTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/platform-browser-dynamic */
    "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
    /* harmony import */


    var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./app/app.module */
    "./src/app/app.module.ts");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./environments/environment */
    "./src/environments/environment.ts");

    if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
      Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
    }

    Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"], [{
      defaultEncapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
    }])["catch"](function (err) {
      return console.log(err);
    });
    /***/
  },

  /***/
  0:
  /*!***************************!*\
    !*** multi ./src/main.ts ***!
    \***************************/

  /*! no static exports found */

  /***/
  function _(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(
    /*! D:\Research\max-coverage-ga\src\main.ts */
    "./src/main.ts");
    /***/
  }
}, [[0, "runtime", "vendor"]]]);
//# sourceMappingURL=main-es5.js.map