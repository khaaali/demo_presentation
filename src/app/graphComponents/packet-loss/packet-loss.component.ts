import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { MySqlService } from '../../app.service';
import {MyData} from '../../StructData';


declare const CanvasJS: any;


@Component({
  selector: 'app-packet-loss',
  templateUrl: './packet-loss.component.html',
  styleUrls: ['./packet-loss.component.css']
})

 export class PacketLossComponent implements OnInit {
 

  public dataPacketloss ;
 
 myData:MyData[];

  
  
  constructor(
    private _MySqlService: MySqlService,
    private route: ActivatedRoute, 
    private router:Router ) { }


  //@Input() macid:String;

  
    ngOnInit(): any {
        
        this.route.params 
       .switchMap((params: Params) => this._MySqlService.getPacketLoss(String(params['id'])))
       .subscribe(myData => {
         this.myData=myData;

        let dataPacketloss  = myData;
         //console.log(dataPacketloss);



  const chart = new CanvasJS.Chart("Packetloss", 
            
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
       text: "Packet Loss", 
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
        title: "Packets",
        tickLength: 15,
        titleFontSize: 20,
        includeZero: false,
        //tickColor: "DarkSlateBlue" ,
        tickThickness: 2,
        gridDashType:"dot"
      },

     data: [
             {  
      type: "column",
      color: "rgba(29,132,134,.7)",            
      //type: "line",
      lineThickness: 1,
      showInLegend: true,
      legendText: "packet",
      xValueType: "dateTime",
      dataPoints: dataPacketloss              
                           
              }]
      });
  chart.render();

  function rangeChange(e) {
      console.log(e);
    }  


});
}
 
}