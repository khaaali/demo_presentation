import { Component, OnInit } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { MySqlService } from '../app.service';
import {MyData} from '../StructData';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit{

	configs:MyData[];


	constructor(
    private _MySqlService: MySqlService,
    private _route: ActivatedRoute, 
    private _router:Router 
    ) { }


ngOnInit(): void{
	this._MySqlService.getConfigs()
      .subscribe(configs => this.configs=configs);
}
  
}
