import { Component } from '@angular/core';
import { Search } from './search.component';

@Component({
	selector:'my-dashboard',
	template:`
	<div class="container margin-top-5">
		<h1>{{title}}</h1>
		<search></search>
	</div>
	`
})

export class Dashboard{
	title="WEB CRAWLER"
}