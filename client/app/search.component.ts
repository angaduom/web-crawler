import { ChangeDetectorRef , Component, OnInit } from '@angular/core';

@Component({
	selector:'search',
	template:`
	
	<div class="row margin-top-5">
		<div class="col-md-12 col-lg-12">
		<input [(ngModel)]="cData.searchString" class="text-input" placeholder="INSERT URL HERE">
		</div>
	</div>
	<div class="row margin-top-5">
		<div class="central-button center">
			<button class="btn btn-info btn-lg" (click)="clicked($event)"> CRAWL </button>
		</div>
	</div>
	<div class="row margin-top-5">
		<div class="col-md-12 col-lg-12 results">
		{{cData.results}}
		</div>
	</div>
	`
})

export class Search implements OnInit{

	constructor(private cdr:ChangeDetectorRef) {
  	}	


	cData = { 	searchString : "",
				hidden :false,
				results:"Your results here"	
	}

	changeData(data){
		this.cData.results = data;
		this.cdr.detectChanges();
	}
	ngOnInit(){
		console.log("Search Component initialized");
		//console.log("socket",socket);
		//get data back from the server;
		socket.on('crawl-output',(data)=>{
			console.log("this is the data that the sever spat back");
			console.log(data);
			this.changeData(data);
		});

		socket.on('component-contact',function(data){
			console.log("the server says",data)
		});
		socket.emit('component-contact',"search contact");
	}

	clicked(event){
		console.log("crawl initiated");
		console.log(this.cData.searchString);
		//emit url to server
		socket.emit('crawl-input',this.cData.searchString);
	}
}
