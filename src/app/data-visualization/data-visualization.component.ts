import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import {Thresholds} from '../Threshold';


@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.css']
})
export class DataVisualizationComponent {

  macAddress:Array<String>=[
  "00-17-0d-00-00-30-4d-94","00-17-0d-00-00-30-48-18", "00-17-0d-00-00-30-47-fa", "00-17-0d-00-00-30-49-58",
  "00-17-0d-00-00-30-4d-94","00-17-0d-00-00-30-48-18", "00-17-0d-00-00-30-47-fa", "00-17-0d-00-00-30-49-58",
  "00-17-0d-00-00-30-4d-94","00-17-0d-00-00-30-48-18", "00-17-0d-00-00-30-47-fa", "00-17-0d-00-00-30-49-58"
  ];
  
  //@Output OnSelect= new EventEmitter<String>()
  
  macIdTitle:String;
  model = new Thresholds(); 
  sendData:String;
  value = '';


  onEnter(value: string) { this.value = value;
    //console.log(value)
   //this.OnSelect.emit(value)
   }
  


  onClick(event){

   //let dateTime=this.model.timeStamp;
   
   //console.log(event);
   var idAttr =event.srcElement.attributes[3];
   var targetid=String(idAttr.value);
   //var value=idAttr.nodeValue;
   //console.log(targetid);
   var split=targetid.split('/');
   //console.log(split[2]);
   //this.macIdTitle=split[2];
   
   //this.macIdTitle=targetid;
   //this.sendData =dateTime
   this.macIdTitle=event.srcElement.childNodes["0"].data
   //console.log(this.macIdTitle);

    }
 
}
