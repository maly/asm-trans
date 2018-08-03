var fs = require("fs")
var f = (fs.readFileSync("mnemo.tsv").toString()).split("\n")
var instr = f.map(function(v){return v.split("\t")})
//console.log(instr[0])
fs.writeFileSync("./mnemo.json",JSON.stringify(instr))


instr = instr.filter(function(v){return (v[0]!="---")})
//testsuite z->i
var t1 = instr.map(function(v) {return " "+v[2]+" "+v[3]}).join("\n");
fs.writeFileSync("./z2i.z80",t1)
var t1o = instr.map(function(v) {return " "+v[0]+" "+v[1]}).join("\n");
fs.writeFileSync("./i2z.a80",t1o)
