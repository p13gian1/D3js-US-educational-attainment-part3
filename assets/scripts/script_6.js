
var colors = d3.scaleOrdinal()
.range(["#312ed1", "#cd02d1", "#4d6331", "#09f2ea", "#ff9400", "#f9f91b", "#ff4b41"]);

var percentage2="";

  function tooltipHtml(n, d){ 
 
    return "<h4>"+n+"</h4><table>"+
      "<tr><td nowrap>in preschool             </td><td>"+(d.perc1)+percentage2+"</td></tr>"+
      "<tr><td nowrap>in kindergarten          </td><td>"+(d.perc2)+percentage2+"</td></tr>"+
      "<tr><td nowrap>in grade 1 to grade 4    </td><td>"+(d.perc3)+percentage2+"</td></tr>"+
      "<tr><td nowrap>in grade 5 to grade 8    </td><td>"+(d.perc4)+percentage2+"</td></tr>"+
      "<tr><td nowrap>in high school           </td><td>"+(d.perc5)+percentage2+"</td></tr>"+
      "<tr><td nowrap>in college, undergraduate</td><td>"+(d.perc6)+percentage2+"</td></tr>"+
      "<tr><td nowrap>in graduate school       </td><td>"+(d.perc7)+percentage2+"</td></tr>"+
      "</table>";
  }

var chosenCat="bycount";
var newData={};



d3.tsv("assets/data/data.tsv", function(error, data) {

  var categories = d3.keys(data[0]).filter(function(key) { return key !== "state" && key !== "National"; });

  
  var parsedata = categories.map(function(name) { return { "state": name }; });
  data.forEach(function(d) {   

    parsedata.forEach(function(pd) {
      pd[d["state"]] = d[pd["state"]];  
    });
      
  });



parsedata.forEach(function(pd) { 
  

    
   
      if (chosenCat === "bypercent"){
    var perc1=(100* (pd["in preschool"] / pd["Base: All Respondents"])).toFixed(2);
    var perc2=(100* (pd["in kindergarten"] / pd["Base: All Respondents"])).toFixed(2);
    var perc3=(100* (pd["in grade 1 to grade 4"]/pd["Base: All Respondents"])).toFixed(2);
    var perc4=(100* (pd["in grade 5 to grade 8"]/pd["Base: All Respondents"])).toFixed(2);
    var perc5=(100* (pd["in high school "]/pd["Base: All Respondents"])).toFixed(2);
    var perc6=(100* (pd["in college, undergraduate"]/pd["Base: All Respondents"])).toFixed(2);
    var perc7=(100* (pd["in graduate school"]/pd["Base: All Respondents"])).toFixed(2);
    percentage2="%";
      }
      else
      {
    var perc1=pd["in preschool"] ;
    var perc2=pd["in kindergarten"];
    var perc3=pd["in grade 1 to grade 4"];
    var perc4=pd["in grade 5 to grade 8"];
    var perc5=pd["in high school "];
    var perc6=pd["in college, undergraduate"];
    var perc7=pd["in graduate school"];
    percentage2=""; 
      }

    newData[pd["state"]]={perc1:perc1,perc2:perc2,perc3:perc3,perc4:perc4,perc5:perc5,perc6:perc6,perc7:perc7,
      color:d3.interpolate("#ffffcc", "#800026")(100*(pd["Base: All Respondents"]/83054762))};

    
    });




 uStates.draw("#statesvg", newData, tooltipHtml);
  
  d3.select(self.frameElement).style("height", "600px");


            
  
 

});
