import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { MySqlService } from '../../app.service';
import {MyData} from '../../StructData';


declare const CanvasJS: any;

@Component({
  selector: 'app-signal-strength',
  templateUrl: './signal-strength.component.html',
  styleUrls: ['./signal-strength.component.css']
})

export class SignalStrengthComponent implements OnInit {
 

  public dataSignalStrength ;
 
 myData:MyData[];

  
  
  constructor(
    private _MySqlService: MySqlService,
    private route: ActivatedRoute, 
    private router:Router ) { }


  //@Input() macid:String;

  
    ngOnInit(): any {
        
        this.route.params 
       .switchMap((params: Params) => this._MySqlService.getSignalStrength(String(params['id'])))
       .subscribe(myData => {
         this.myData=myData;

        let dataSignalStrength  = myData;
         console.log(dataSignalStrength);



  const chart = new CanvasJS.Chart("SignalStrength", 
            
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
       text: "Signal Strength", 
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



      dataPointMaxWidth: 20, 
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
        title: "Rssi (db)",
        tickLength: 15,
        titleFontSize: 20,
        includeZero: false,
        reversed: true,
        //tickColor: "DarkSlateBlue" ,
        tickThickness: 2,
        gridDashType:"dot"
      },

     data: [
             {  
      type: "column",
      color: "rgba(132,32,91,.6)",             
      //type: "line",
      lineThickness: 1,
      showInLegend: true,
      legendText: "Rssi (db)",
      xValueType: "dateTime",
      dataPoints: dataSignalStrength              
                           
              }]
      });
  chart.render();

  function rangeChange(e) {
      console.log(e);
    }  


});
}
 
}
