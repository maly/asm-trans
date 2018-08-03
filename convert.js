
var findFirstPos = function(line,xs) {
  var pos = -1;
  for (var i=0;i<xs.length;i++) {
    var test = xs[i]
    var apos = line.indexOf(test);
    if (apos<0) continue;
    if (pos==-1) pos = apos;
    if (apos<pos) pos = apos;
  }
  return pos;
}
var trans;
var croak = function(m) {
  throw new Error("Cannot convert "+m)
}

var isReg = function(par) {
  return ("ABCDEHL".indexOf(par.toUpperCase()))<0?false:true
}
var isRegM = function(par) {
  if(par.toUpperCase()=="(HL)") return true;
  return ("ABCDEHL".indexOf(par.toUpperCase()))<0?false:true
}
var isRegPair = function(par) {
  return (["BC","DE","HL","SP","AF"].indexOf(par.toUpperCase()))<0?false:true
}
var isIndirect = function(par) {
  par = par.trim();
  if(par[0]!="(") return false;
  if(par[par.length-1]==")") return true;
  return false;
}

var register = function(par) {
  par = par.toUpperCase();
  if (!isRegM(par)) croak ("cannot determine register " +par)
  if(par=="(HL)") return "M";
  return par
}

var noIndirect = function(par) {
  return par.substr(1,par.length-2)
}

var regPair = function(par) {
  par = par.toUpperCase();
  if (!isRegPair(par)) croak ("cannot determine register pair " +par)
  if(par=="AF") return "PSW"
  if(par=="SP") return "SP"
  return par[0];
}


var conv = function(op,par1,par2) {

  var lop = op.toLowerCase();
  if (trans[lop]) {
    return trans[lop](par1.trim(),par2.trim())
  }

  return[op,par1,par2];
}

var convline = function(line) {
  //parse line
  var label="", op="", par1="",par2="",remainder="";
  var s;
  if (line[0]!=" ") {
    if (line[0]==";") return line; //whole line is a remark
    //label?
    s = findFirstPos(line,[" ",":","\t"])
    label = line.substr(0,s).trim();
    line = line.substr(s+1);
  }
  line = line.trim();
  s = findFirstPos(line,[" ",":","\t"])
  op = line.substr(0,s);
  line = line.substr(s+1).trim();

  s = findFirstPos(line,[",",";"])
  if(line[s]==",") {
    //2 params
    par1 = line.substr(0,s);
    line = line.substr(s+1).trim();
    s = findFirstPos(line,[";"])
    if (s<0) {
      par2 = line;
      line="";
    } else {
      par2 = line.substr(0,s);
      line = line.substr(s+1).trim();
    }
  } else if(line[s]==";") {
    //1 param
    par1 = line.substr(0,s);
    line = line.substr(s+1).trim();
    par2="";
  } else if(s<0) {
    //1 param, no remark
    if (!op) {
      op = line
      par1=""
    } else {
      par1 = line
    }
    par2="";
    line=""
  }

  remainder = line
  console.log("L",label,"O",op,"1",par1,"2",par2,"R",remainder)
  var cx = conv(op,par1,par2);
  op = cx[0]
  par1 = cx[1].trim()
  par2 = cx[2].trim();


  //hex fix
  if (par1[0]=="#") par1 = "$"+par1.substr(1);
  if (par2[0]=="#") par2 = "$"+par2.substr(1);
  if (par2) par2 = ","+par2;

  //console.log("L",label,"O",op,"1",par1,"2",par2,"R",remainder)

  if (label && label[label.length-1]!=":") label+=":";

  return label+"\t"+op+"\t"+par1+par2+ "\t" + remainder;
}

var convert = function(txt,transTab) {
  var lines = txt.split("\n")
  trans = transTab
  return lines.map(convline).join("\n")
}
