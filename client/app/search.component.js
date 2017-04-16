"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Search = (function () {
    function Search(cdr) {
        this.cdr = cdr;
        this.cData = { searchString: "",
            hidden: false,
            results: "Your results here"
        };
    }
    Search.prototype.changeData = function (data) {
        this.cData.results = data;
        this.cdr.detectChanges();
    };
    Search.prototype.ngOnInit = function () {
        var _this = this;
        console.log("Search Component initialized");
        //console.log("socket",socket);
        //get data back from the server;
        socket.on('crawl-output', function (data) {
            console.log("this is the data that the sever spat back");
            console.log(data);
            _this.changeData(data);
        });
        socket.on('component-contact', function (data) {
            console.log("the server says", data);
        });
        socket.emit('component-contact', "search contact");
    };
    Search.prototype.clicked = function (event) {
        console.log("crawl initiated");
        console.log(this.cData.searchString);
        console.log(document.getElementById("respect").value);
        var respect = document.getElementById("respect").value;
        socket.emit('crawl-input', this.cData.searchString, respect);
    };
    Search = __decorate([
        core_1.Component({
            selector: 'search',
            template: "\n\t\n\t<div class=\"row margin-top-5\">\n\t\t<div class=\"col-md-10 col-lg-10\">\n\t\t<input [(ngModel)]=\"cData.searchString\" class=\"text-input\" placeholder=\"INSERT URL HERE\">\n\t\t</div>\n\t\t<div class=\"col-md-2 col-lg-2\">\n\t\t\t<select id=\"respect\" class=\"selection\">\n\t\t\t\t  <option value=true>TRUE</option>\n\t\t\t\t  <option value=false>FALSE</option>\n\t\t\t</select>\n\t\t</div>\n\t\t\n\t</div>\n\t<div class=\"row margin-top-5\">\n\t\t<div class=\"central-button center\">\n\t\t\t<button class=\"myButton\" (click)=\"clicked($event)\"> CRAWL </button>\n\t\t</div>\n\t</div>\n\t<div class=\"row margin-top-5\">\n\t\t<div class=\"col-md-12 col-lg-12 results max-height-autoscroll\">\n\t\t{{cData.results}}\n\t\t</div>\n\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], Search);
    return Search;
}());
exports.Search = Search;
//# sourceMappingURL=search.component.js.map