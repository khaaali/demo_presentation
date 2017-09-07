import { Injectable }    from '@angular/core';
import { Headers, Http,Response } from '@angular/http';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {MyData} from './StructData';
import { MySQLTable } from './MySqlTable';
import {Thresholds} from './Threshold';
import {setThreshold} from './setThresholds';



@Injectable()
export class MySqlService {
public  filteredMac;


  private headers = new Headers({'Content-Type': 'application/json'});
  private _Url = 'http://localhost:3000';  // URL to web api
  myData:MyData[];

  constructor(
    private _http: Http,
    private route: ActivatedRoute, 
    private router:Router ) 
  {   
    this.route.params.subscribe((params: Params)=>{
    let filterMac = params['id'];
    //console.log("at get temp: "+ filterMac);
    this.filteredMac=String(filterMac);
    })
       }

getTable(): Observable<MySQLTable[]> {
  	const url = this._Url+'/senor_data';
    return this._http.get(url)
               .map(res => res.json())
               .catch(this.handleError);
               }



getTemperatures(id: String): Observable<MyData[]> {
    const url = this._Url+'/senor_data';              // should change here
    //console.log(url);
    let filter= `${id}`;
    let filtered=String(filter);
    //console.log("mac at temps "+ filtered);
    return this._http.get(url)
               .map(res =>{
                let data=res.json();
                //console.log(data);
                let parsedData = [];
                //console.log("mac at temps again "+ filtered);
                data.filter(function(el){ return el.mac_id== filtered })
                .forEach(function(item){ parsedData.push({ 
                          x:item.epoch_time_stamp, y:parseFloat(item.temperature_data) });  });
                          console.log(parsedData);
                return parsedData; })
               .catch(this.handleError);
               }  



getInclination(id: String): Observable<MyData[]> {
    const url = this._Url+'/senor_data';              // should change here
    //console.log(url);
    let filter= `${id}`;
    let filtered=String(filter);
    console.log("mac at incli "+ filtered);
    return this._http.get(url)
               .map(res =>{
                let data=res.json();
                let parsedData = []; 
               // let f=this.filteredMac;
                data.filter(function(el){ return el.mac_id==filtered})
                .forEach(function(item){ parsedData.push({ 
                          x:item.epoch_time_stamp, y:parseFloat(item.inclination_data_X) });  });
                         console.log(parsedData);
                return parsedData; })
               .catch(this.handleError);
               }   

  
getVoltageLevels(id: String): Observable<MyData[]> {
    const url = this._Url+'/energy';      //should change here
    //console.log(url);
    let filter= `${id}`;
    let filtered=String(filter);
    //console.log("mac at both "+ filtered);
    return this._http.get(url)
               .map(res =>{
                let data=res.json();
                //console.log(data);
                let parsedData = []; 
                //let f=this.filteredMac;
                data.filter(function(el){ return el.hr_macid==filtered})
                .forEach(function(item){ parsedData.push({ 
                          x:item.hr_epochStamp, y:parseFloat(item.hr_batt_voltage) });  });
                         console.log(parsedData);
                return parsedData; })
               .catch(this.handleError);
               } 


getSignalStrength(id: String): Observable<MyData[]> {
    const url = this._Url+'/avg_rssi';      //should change here
    //console.log(url);
    let filter= `${id}`;
    let filtered=String(filter);
    //console.log("mac at both "+ filtered);
    return this._http.get(url)
               .map(res =>{
                let data=res.json();
                //console.log(data);
                let parsedData = []; 
                //let f=this.filteredMac;
                data.filter(function(el){ return el.hr_macid==filtered})
                .forEach(function(item){ parsedData.push({ 
                          x:item.hr_epochStamp, y:parseInt(item.hr_avg_rssi) });  });
                         console.log(parsedData);
                return parsedData; })
               .catch(this.handleError);
               } 

getPacketLoss(id: String): Observable<MyData[]> {
    const url = this._Url+'/packet_loss';      //should change here
    //console.log(url);
    let filter= `${id}`;
    let filtered=String(filter);
    //console.log("mac at both "+ filtered);
    return this._http.get(url)
               .map(res =>{
                let data=res.json();
                //console.log(data);
                let parsedData = []; 
                //let f=this.filteredMac;
                data.filter(function(el){ return el.hr_macid==filtered})
                .forEach(function(item){ parsedData.push({ 
                          x:item.hr_epochStamp, y:parseInt(item.hr_packetloss) });  });
                         console.log(parsedData);
                return parsedData; })
               .catch(this.handleError);
               } 




















                        ///Handlers for Thresholds///


//////////     THIS CREATE THRESHOLD IS NOT IN USE(first set in loaded into data base manually and edited from the update threshold(). ////////////////

createThresholds(formTemp:string,formIncli:string): Observable<Thresholds[]> {
    const url = this._Url+'/setting';              // should change here 
    console.log(url);
    var formData={
      tempValue:formTemp,             
      incliValue:formIncli
    }
    console.log(formData);

     return this._http.post(url,JSON.stringify(formData),{ headers: this.headers })
                .map(res =>res.json())
                .catch(this.handleError);
                }


updateThresholds(formTemp_add:string,formTemp_sub:string,
                 formIncli_X_add:string,formIncli_X_sub:string
                 ): Observable<Thresholds[]> {
    const url = this._Url+'/setting'+'/edit';              // should change here
    console.log(url);

    var formData={

      tempValue_add:formTemp_add,
      tempValue_sub:formTemp_sub,

      incliValuex_add:formIncli_X_add,
      incliValuex_sub:formIncli_X_sub,
      
      //incliValuey:formIncli_Y

    }
    console.log("from service",formData);

     return this._http.put(url,JSON.stringify(formData),{ headers: this.headers })
                .map(res =>res.json())
                .catch(this.handleError);
                }



getThresholds():Observable<setThreshold[]>{
  const url = this._Url+'/setting'; 
  console.log(url);
  return this._http.get(url)
             .map(res =>res.json())
             .catch(this.handleError);
                
}

              /// getting data from configurations mean table has similar data type with the sensor data
              // in config.component

getConfigs():Observable<MyData[]>{
  const url = this._Url+'/config'; 
  console.log(url);
  return this._http.get(url)
             .map(res =>res.json())
             .catch(this.handleError);
                
}



                      ////// Getting thresholds and filtering data to show in html tables////////////


DownloadSensorData(): Observable<MyData[]> {
const url = this._Url+'/senor_data'; 
return this._http.get(url)
           .map(res =>res.json())
           .catch(this.handleError);

}

DownloadHealthData(): Observable<MyData[]> {
const url = this._Url+'/health_report_table'; 
return this._http.get(url)
           .map(res =>res.json())
           .catch(this.handleError);

}


DisplayData(): Observable<MyData[]> {
const url = this._Url+'/senor_data';              // should change here
return this._http.get(url)
           .map(res =>res.json())
           .catch(this.handleError);
               }  















// returns temperature data greater than or equal to the filtered temperature data



/*
getTemperatureInclination(id: String): Observable<MyData[]> {
    const url = this._Url+'/senor_data';      //should change here
    //console.log(url);
    let filter= `${id}`;
    let filtered=String(filter);
    console.log("mac at both "+ filtered);
    return this._http.get(url)
               .map(res =>{
                let data=res.json();
                let parsedData = []; 
                //let f=this.filteredMac;
                data.filter(function(el){ return el.mac_id==filtered})
                .forEach(function(item){ parsedData.push({ 
                          x:item.hr_epochStamp, y:parseFloat(item.hr_batt_voltage) });  });
                         // console.log(parsedData);
                return parsedData; })
               .catch(this.handleError);
               }  */









/*
DisplayTemperatures(): Observable<MyData[]> {
    const url = this._Url+'/senor_data';              // should change here
    //console.log(url);
    //let filter1= `${id}`;
    //let filtered1=parseFloat(filter1);
    
    return this._http.get(url)
               .map(res =>{
                let data=res.json();
                console.log(data);
                let parsedData = [];


                //console.log("setvalue at incli again "+ filtered1);
               //data.filter(function(el){ return el.temperature_data >=filtered1 && el.temperature_data <=filtered1+1 })
               data.filter(function(el){ return el.temperature_data })
                .forEach(function(item){ parsedData.push(item);  });
                          console.log(parsedData);
                return parsedData; })
               .catch(this.handleError);
               }  

// returns inclination data greater than or equal to the filtered nclination data
DisplayInclinationX(): Observable<MyData[]> {
    const url = this._Url+'/senor_data';              // should change here
    //console.log(url);
    //let filter2= `${id}`;
    //let filtered2=parseFloat(filter2);
    //console.log("mac at temps "+ filtered);
    return this._http.get(url)
               .map(res =>{
                let data=res.json();
                console.log(data);
                let parsedData = [];
               // console.log("setvalue at incli again "+ filtered2);
               //data.filter(function(el){ return (el.inclination_data_X >=filtered2 && el.inclination_data_X <=filtered2+1)})
               data.filter(function(el){ return el.inclination_data_X})
                .forEach(function(item){ parsedData.push(item);  });
                          console.log(parsedData);
                return parsedData; })
               .catch(this.handleError);
               }  


DisplayInclinationY(): Observable<MyData[]> {
    const url = this._Url+'/senor_data';              // should change here
    //console.log(url);
    //let filter2= `${id}`;
    //let filtered2=parseFloat(filter2);
    //console.log("mac at temps "+ filtered);
    return this._http.get(url)
               .map(res =>{
                let data=res.json();
                console.log(data);
                let parsedData = [];
               // console.log("setvalue at incli again "+ filtered2);
               //data.filter(function(el){ return (el.inclination_data_X >=filtered2 && el.inclination_data_X <=filtered2+1)})
               data.filter(function(el){ return el.inclination_data_Y})
                .forEach(function(item){ parsedData.push(item);  });
                          console.log(parsedData);
                return parsedData; })
               .catch(this.handleError);
               }                 

*/









private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }


}





//

//getTemperatures(id: String): Observable<MyData[]> {
//    const url = this._Url+'/temperature';              // should change here
//    //console.log(url);
//    let filter= `${id}`;
//    let filtered=String(filter);
//    //console.log("mac at temps "+ filtered);
//    return this._http.get(url)
//               .map(res =>{
//                let data=res.json();
//                //console.log(data);
//                //let parsedData = [];
//                console.log("mac at temps again "+ filtered);
//                data.filter(function(el){ return el.mac_id== filtered })
//                //console.log("filetrredddd: ",data);
//                return data; })
//               .catch(this.handleError);
//               }  
















           //    <app-temperature-component></app-temperature-component>
             //   <app-inclination-component></app-inclination-component>
    //           


//private extractData(res: Response){
//  let body =res.json();//console.log(body);
//  body.filter(function(da){ return da.mac=="3s-ds-23-sf-25-ce-35";
//  }).map(function(data)
//  { return { X:data.epoch_time_stamp, Y:parseFloat(data.temp)};
//  });//

//}





//temp:parseFloat(item.temperature_data),


////for selec ting a specif mac
//private extractData(res: Response){
//  let body =res.json();
//  console.log(body);
//  return body.filter(function(macs){
//  return (macs.mac=="3s-ds-23-sf-23-ce-32");
//  }) || { };


//.function(macs){
//    xTime=macs.epoch_time_stamp;
//    yTemp=macs.temp;
//    console.log(xTime);
//  return {Xtime: xTime ,Ytemp:yTemp } ; 
//} 








//data2.forEach((el) => { data.push({time:el.time, temp:el.temp}) });











//private extractData(res: Response){
//  let body =res.json();//console.log(body);
//  var parsedData=[];
//  var xTime; var yTemp;
// return body.filter(function(macs){
//     return (macs.mac=="3s-ds-23-sf-25-ce-35")  ;
//  
//  })
//}


