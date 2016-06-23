var fs = require("fs");
var result = [];
function csvJSON(file,callback){
    fs.readFile(file, function (err, data) {
        if (err) {
          throw err;
        }
        var csv_data = data.toString();
        var lines = csv_data.split("\n");
        var headers = lines[0].split(",");
        var obj = {};
		    for (var i = 1; i < lines.length; i++) {
          if(lines[i].includes("European Union")){
            continue;
          }
          else{
            var cline = lines[i].split(",");
    			  var obj = {};
    			  for(var j=0;j<cline.length;j++){
    				var str = cline[j].substring(1,cline[j].length-1);
    				var str_index = headers[j].substring(1,headers[j].length-1);
            obj[str_index] = str;
          }
          result.push(obj);
          }
		    }
		    callback(result);
      });
 }
function GDP_Pop(){
    csvJSON("datafile_2013.csv", function (result) {
        fs.writeFile("GDP_json_2013.json", JSON.stringify(result), function (err) {
            if (err) {
              throw err;
            }
        });
    });
}
GDP_Pop();
