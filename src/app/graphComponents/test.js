angular commands
-ng build && node server.js

-ng generate component my-new-component
-ng g component my-new-component # using the alias

# components support relative path generation
# if in the directory src/app/feature/ and you run
-ng g component new-cmp
# your component will be generated in src/app/feature/new-cmp
# but if you were to run
-ng g component ../newer-cmp
# your component will be generated in src/app/newer-cmp

files with shit test.js,bootstrap.html,untitled.css,


[
{x:1494005071,y:34},
{x:1494005971,y:12},
{x:1494087499,y:45},
{x:1494090200,y:76},
{x:1494091099,y:46},
{x:1494091999,y:35},
{x:1486257257025,y:34},
{x:1486257272041,y:77},
{x:1486257277050,y:57},
{x:1486257282052,y:35},
{x:1486257357132,y:27},
{x:1486257663995,y:47},
{x:1486257684007,y:65},
{x:1486257704029,y:87},
{x:1486257709034,y:36},
{x:1486257719046,y:27}
]
1494005071
1494005971
1494087499
1494090200
1494091099
1494091999


var chart = new CanvasJS.Chart("chartContainer",
    {
      title:{
        text: "Speed And Distance Time Graph"             
      },   
      animationEnabled: true,   
      toolTip: {
        shared: true,
        content: function(e){
          var body ;
          var head ;
          head = "<span style = 'color:DodgerBlue; '><strong>"+ (e.entries[0].dataPoint.x)  + " sec</strong></span><br/>";

          body = "<span style= 'color:"+e.entries[0].dataSeries.color + "'> " + e.entries[0].dataSeries.name + "</span>: <strong>"+  e.entries[0].dataPoint.y + "</strong>  m/s<br/> <span style= 'color:"+e.entries[1].dataSeries.color + "'> " + e.entries[1].dataSeries.name + "</span>: <strong>"+  e.entries[1].dataPoint.y + "</strong>  m";

          return (head.concat(body));
        }
      },   
      axisY:{ 
        title: "Speed",
        includeZero: false,
        suffix : " m/s",
        lineColor: "#369EAD"        
      },
      axisY2:{ 
        title: "Distance",
        includeZero: false,
        suffix : " m",
        lineColor: "#C24642"
      },
      axisX: {
        title: "Time",
        suffix : " s"
      },
      data: [
      {        
        type: "spline",
        name: "speed",
        dataPoints: [
        {x: 0 , y: 0} ,     
        {x: 11 , y: 8.2} ,     
        {x: 47 , y: 41.7} ,     
        {x: 56 , y: 16.7} ,     
        {x: 120 , y: 31.3} ,     
        {x: 131 , y: 18.2} ,     
        {x: 171 , y: 31.3} ,     
        {x: 189 , y: 61.1} ,     
        {x: 221 , y: 40.6} ,     
        {x: 232 , y: 18.2} ,     
        {x: 249 , y: 35.3} ,     
        {x: 253 , y: 12.5} ,     
        {x: 264 , y: 16.4} ,     
        {x: 280 , y: 37.5} ,     
        {x: 303 , y: 24.3} ,     
        {x: 346 , y: 23.3} ,     
        {x: 376 , y: 11.3} ,     
        {x: 388 , y: 8.3} ,     
        {x: 430 , y: 1.9} ,     
        {x: 451 , y: 4.8}      
        ]
      }, 
      {        
        type: "spline",  
        axisYType: "secondary"  ,
        name: "distance covered",
        dataPoints: [
        {x: 0 , y: 0},     
        {x: 11 , y: 90} ,     
        {x: 47 , y: 1590} ,     
        {x: 56 , y: 1740} ,     
        {x: 120 , y: 3740} ,     
        {x: 131 , y: 3940} ,     
        {x: 171 , y: 5190} ,     
        {x: 189 , y: 6290} ,     
        {x: 221 , y: 7590} ,     
        {x: 232 , y: 7790} ,     
        {x: 249 , y: 8390} ,     
        {x: 253 , y: 8440} ,     
        {x: 264 , y: 8620} ,     
        {x: 280 , y: 9220} ,     
        {x: 303 , y: 9780} ,     
        {x: 346 , y: 10780} ,     
        {x: 376 , y: 11120} ,     
        {x: 388 , y: 11220} ,     
        {x: 430 , y: 11300} ,     
        {x: 451 , y: 11400}      
        ]
      } 
      ]
    });

chart.render();
}