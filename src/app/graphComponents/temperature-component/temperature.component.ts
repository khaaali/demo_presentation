import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MySqlService } from '../../app.service';
import {MyData} from '../../StructData';
import {Thresholds} from '../../Threshold';


declare const CanvasJS: any;

@Component({
  selector: 'app-temperature-component',
  templateUrl: './temperature-component.html',
  styleUrls: ['./temperature-component.css'],
  providers: [ HttpModule,MySqlService ]
})


export class TemperatureComponent implements OnInit {
 

  public dataTemp ;
  myData:MyData[];
 // @Input() dateTime:String
  
  
  constructor(
    private _MySqlService: MySqlService,
    private route: ActivatedRoute, 
    private router:Router ) { }


  //@Input() macid:String;

  
    ngOnInit(): any {

        this.route.params 
       .switchMap((params: Params) => this._MySqlService.getTemperatures(String(params['id'])))
       .subscribe(myData => {
         this.myData=myData;

        let dataTemp  = myData;
         



  const chart = new CanvasJS.Chart("Temperature", 
            
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
       text: "Temperature", 
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
        title: "Temperature (°C)",
        tickLength: 15,
        titleFontSize: 20,
        includeZero: false,
        //tickColor: "DarkSlateBlue" ,
        tickThickness: 2,
        gridDashType:"dot"
      },

     data: [
             {  
      type: "line",
      color: "rgba(12,143,221,1)",             
      //type: "line",
      lineThickness: 1,
      showInLegend: true,
      legendText: "Temperature (°C)",
      xValueType: "dateTime",
      dataPoints: dataTemp              
                           
              }]
      });
  chart.render();
  

  function rangeChange(e) {
      console.log(e);
    }  


});
}
 
}















/*



   this._TabuleService
       .getTemperature()
       .subscribe(testings => {this.testings=testings; 
                               
           //console.log("testings: "+testings);

          let dataTemp  = testings;                                      
           this.dataTemp= testings;

           console.log(dataTemp);

  
//let dataTemp=this.datasetTemperature;
  const chart = new CanvasJS.Chart("chartContainer1", 
            
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
       text: "Temperature", 
       fontSize: 30,
       },
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
        title: "Temperature",
        tickLength: 15,
        titleFontSize: 20,
        //tickColor: "DarkSlateBlue" ,
        tickThickness: 2,
        gridDashType:"dot"
      },

     data: [
             {  
      type: "line",
      color: "rgba(12,143,221,1)",             
      //type: "line",
      lineThickness: 1,
      showInLegend: true,
      legendText: "Temperature",
      xValueType: "dateTime",
      dataPoints: dataTemp
                    
                           
              }]
      });

    chart.render();





    function rangeChange(e) {
      console.log(e);
    }  
   
}); 

}


}











*/