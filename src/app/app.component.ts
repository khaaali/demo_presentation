import { Component,OnInit,Output,EventEmitter } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { MySqlService } from './app.service';
import {MyData} from './StructData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ HttpModule,MySqlService ]


})


export class AppComponent  { 
	
 //macAddress:Array<String>=["3s-ds-23-sf-23-ce-33", "3s-ds-23-sf-23-ce-34", "3s-ds-23-sf-23-ce-35"];
 myData:MyData[];
 //macIdTitle:String;

// @Output() notify:EventEmitter<string>= new EventEmitter<string>();
  
  constructor(
    private _MySqlService: MySqlService,
    private route: ActivatedRoute, 
    private router:Router      
    ) { }

  ////life cycle hooks are used to make components look cleaner. Used to be notifed when component is first instantiated 
  
  

}

/*ngOnInit(): void {
    this._TabuleService
        .getTable()
        .subscribe(tabules => {this.tabules=tabules; //console.log(tabules);
              });
        //.subscribe(temps => console.log(temps));
  }*/




/*ngOnInit(){

this.route.params
      .switchMap((params: Params) => this._TabuleService.getTemperatures(+params['id']))
      .subscribe(tempTest => this.tempTest = tempTest);
this.route.params.subscribe((params:Params)=>{
      let id=String(params['id']);
      this.macIdTitle=id;
    })
}
onclick(){
    
    let id2;
    this.route.params.subscribe(params=>{
    this.id=params['id'];
    id2=this.id;
    console.log("data at temp "+ id2);
    })
    
    }

  ida2="youth";
this.route.params
    .switchMap((params:Params)=>this._TabuleService.getTemperatures(+params['id']))
    .subscribe(tempTest => this.tempTest = tempTest);
    
     }
let id2;
    this.route.params.subscribe(params=>{
    this.id=params['id'];
    id2=this.id;
    })
    console.log("data at temp "+ id2);
let id2;
    let macID=this.macIdTitle;
    this.router.navigate(['/mac',macID]);
    this.route.params.subscribe(params=>{
    this.id=params['id'];
    id2=this.id;
    })

*/





     
    