
var width = 960,
    height = 500;

var direction="forward";

var projection = d3.geoOrthographic()
    .scale(248)
    .clipAngle(90);

var path = d3.geoPath(projection);

var graticule = d3.geoGraticule()
     .extent([[-180, -90], [180 - .1, 90 - .1]]);

var svg = d3.select("#svg1").append("svg")
    .attr("width", width)
    .attr("height", height);
   
var line = svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);
  
svg.append("circle")
    .attr("class", "graticule-outline")
    .attr("cx", width/2)
    .attr("cy", height/2)
    .attr("r", projection.scale());

var countries1=[];
var countries2=[];
var unit={};
var value={};
var unit2={};
var value2={};
var pos,n;




d3.csv("assets/data/data.csv", function(data) {
console.log("data="+data);



var o=0;

  data.forEach(function(d)
    {
      
      countries1[o]=d["Country or Area"];
      unit[o]=d["Unit"];
      value[o]=d["Value"];
      o++;
    
      

      });
  console.log("countries to show"+countries1);
   
      

    
  });

  
  var countries={};
  var country;
  var title;
  var position=[];
  var position2=[];
  var k=-1;

d3.json("assets/data/readme-world-110m.json", function(error, world) {
   countries = topojson.object(world, world.objects.countries).geometries,
      pos = 0,
      n = countries.length;
     

   country = svg.selectAll(".country")
      .data(countries)
    .enter().insert("path", ".graticule")
      .attr("class", "country")
      .attr("d", path);
  
   title = svg.append("text")
    .attr("x", width / 2)
    .attr("y", height * 3 / 5);


    

    
    for (var g=0; g<countries1.length; g++)
    {
    position[g]=findposition(countries1[g]);
    }    
    




    var s=0;
    for (g=0; g<countries1.length; g++)
    {
      if (position[g]!=9999)
        {
          countries2[s]=countries1[g];    //country has been indentified in db
          value2[s]=value[g];
          unit2[s]=unit[g];
          position2[s]=position[g];
          s++;}
    
    }
    console.log("g"+g+"s"+s);
     step(direction);
  });
    
 
  document.getElementById("buttonLeft").addEventListener("click", function(){
    direction="backward";
    step(direction);
  });

  document.getElementById("buttonRight").addEventListener("click", function(){
    direction="forward";
    step(direction);
  });



  function step(direction) {
    console.log("counter before check k="+k);
    console.log(direction);

    if  (direction==="forward"){
      if  (++k >= countries2.length) k = 0;}
      

      else {
        if (--k <0) k=countries2.length-1;}
    
    
  
    
    pos=position2[k];
    console.log("counter after check k="+k);
    console.log("position i="+pos);


    title.text(countries[pos].id);
    title.style("opacity",0.8);
    console.log("countries[pos]="+countries[pos].id);
    country.transition()
        .style("fill", function(d, j) { return j === pos ?"red" : "#4db8ff"; });

    
        

   

    d3.transition()
        .delay(500)
        .duration(1000)
        .tween("rotate", function() {
          var point = d3.geoCentroid(countries[pos]),
              rotate = d3.interpolate(projection.rotate(), [-point[0], -point[1]]);

          return function(t) {
            projection.rotate(rotate(t));
            line.attr("d", path);
            country.attr("d", path);
          };
        })
      .transition();
      

      d3.select("#toolt").html(tooltipHtml(countries[pos].id,unit[k],value[k]))
        .style("opacity",0.8)
        .style("left", 800 + "px")     
        .style("top", 500 + "px");
 

  }


 function tooltipHtml(f,d,e){ 
 
    return "<h4>"+f+"</h4><table>"+
      "<tr><td></td><td>"+d+"</td></tr>"+
      "<tr><td></td><td>"+e+"</td></tr>"+
      "</table>";
  }

  function hello(a)
  {
    console.log(a);
  }


    function findposition(c){
        var st;
        for (st = 0; st < 177; st++)
         {
        if (c===countries[st].id)
        {
            console.log(c+" "+st); //country indentified in db
            return st;
        }
        
       }
      console.log(c+" "+9999); //error code 9999
      return 9999; 
    }
