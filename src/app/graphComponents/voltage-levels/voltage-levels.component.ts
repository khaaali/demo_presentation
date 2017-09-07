import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { MySqlService } from '../../app.service';
import {MyData} from '../../StructData';


declare const CanvasJS: any;


@Component({
  selector: 'app-voltage-levels',
  templateUrl: './voltage-levels.component.html',
  styleUrls: ['./voltage-levels.component.css']
})


export class VoltageLevelsComponent implements OnInit {
 

  public dataVoltage ;
 
 myData:MyData[];

  
  
  constructor(
    private _MySqlService: MySqlService,
    private route: ActivatedRoute, 
    private router:Router ) { }


  //@Input() macid:String;

  
    ngOnInit(): any {
        
        this.route.params 
       .switchMap((params: Params) => this._MySqlService.getVoltageLevels(String(params['id'])))
       .subscribe(myData => {
         this.myData=myData;

        let dataVoltage  = myData;
         //console.log(dataVoltage);



  const chart = new CanvasJS.Chart("VoltageLevel", 
            
        {
      animationEnabled: true,      
      zoomEnabled: true,
      theme: "theme",      
      backgroundColor: "#F1F1F1",
      legend: 
        {
            //dockInsidePlotArea: true,
            verticalAlign: "top",
            horizontalAlign: "centre"               
        },





      title:{
       text: "Energy Levels", 
       fontSize: 30,
       },
       exportEnabled: true,
       subtitles:[
        {
            //text: "Mac-ID: ce-35",
            //Uncomment properties below to see how they behave
            //fontColor: "red",
            fontSize: 20
        }
        ],



      dataPointMaxWidth: 10, 
      axisX:{
        title: "Time",     
        //tickColor: "red",
        //tickLength: 5,
        titleFontSize: 20,
        tickThickness: 2,
        gridDashType:"dot",
        interlacedColor: "#F1F1F1" 
      },
      axisY:{
        title: "Voltage (V)",
        tickLength: 15,
        titleFontSize: 20,
        includeZero: false,
        //tickColor: "DarkSlateBlue" ,
        tickThickness: 2,
        gridDashType:"dot"
      },

     data: [
             {  
      type: "area",
      color: "rgba(12,143,61,.8)",             
      //type: "line",
      lineThickness: 1,
      showInLegend: true,
      legendText: "Voltage (V)",
      xValueType: "dateTime",
      dataPoints: dataVoltage              
                           
              }]
      });
  chart.render();

  function rangeChange(e) {
      console.log(e);
    }  


});
}
 
}