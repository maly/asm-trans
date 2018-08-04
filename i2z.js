var regZ = function(par) {
  par = par.toUpperCase();
  if(par=="M") return "(HL)";
  return par
}

var regPairZ = function(par) {
  par = par.toUpperCase();
  if(par=="PSW") return "AF"
  if(par=="B") return "BC"
  if(par=="D") return "DE"
  if(par=="H") return "HL"
  return par;
}

var doIndirect = function(par) {return "("+par+")"}


var transI2Z = {


  "mov": function(par1,par2) {
    return["LD",regZ(par1),regZ(par2)]
  },
  "mvi": function(par1,par2) {
    return["LD",regZ(par1),par2]
  },
  "ldax": function(par1,par2) {
    return["LD","A",doIndirect(regPairZ(par1))]
  },
  "lda": function(par1,par2) {
    return["LD","A",doIndirect(par1)]
  },
  "lhld": function(par1,par2) {
    return["LD","HL",doIndirect(par1)]
  },
  "stax": function(par1,par2) {
    return["LD",doIndirect(regPairZ(par1)),"A"]
  },
  "sta": function(par1,par2) {
    return["LD",doIndirect(par1),"A"]
  },
  "shld": function(par1,par2) {
    return["LD",doIndirect(par1),"HL"]
  },

  "lxi": function(par1,par2) {
    return["LD",regPairZ(par1),par2]
  },

  "dad": function(par1,par2) {
    return["ADD","HL",regPairZ(par1)]
  },



  "add": function(par1,par2) {
    return["ADD","A",regZ(par1)]
  },
  "adi": function(par1,par2) {
    return["ADD","A",regZ(par1)]
  },
  "sub": function(par1,par2) {
    return["SUB",regZ(par1),""]
  },
  "sui": function(par1,par2) {
    return["SUB",regZ(par1),""]
  },
  "sbb": function(par1,par2) {
    return["SBC",regZ(par1),""]
  },
  "sbi": function(par1,par2) {
    return["SBC",regZ(par1),""]
  },

  "inr": function(par1,par2) {
    return["INC",regZ(par1),""]
  },
  "dcr": function(par1,par2) {
    return["DEC",regZ(par1),""]
  },




  "push": function(par1,par2) {
    return["PUSH",regPairZ(par1),par2]
  },
  "pop": function(par1,par2) {
    return["POP",regPairZ(par1),par2]
  },
  "in": function(par1,par2) {
    return["IN","A",doIndirect(par1)]
  },
  "out": function(par1,par2) {
    return["OUT",doIndirect(par1),"A"]
  },


  "sphl": function(){return ["LD","SP","HL"]},
  "xchg": function(){return ["EX","DE","HL"]},
  "xthl": function(){return ["EX","(SP)","HL"]},
  "pchl": function(){return ["JP","(HL)",""]},
  "cma": function(){return ["CPL","",""]},
  "stc": function(){return ["SCF","",""]},
  "cmc": function(){return ["CCF","",""]},
  "rlc": function(){return ["RLCA","",""]},
  "rrc": function(){return ["RRCA","",""]},
  "ral": function(){return ["RLA","",""]},
  "rar": function(){return ["RLA","",""]}
}
module.exports = transI2Z
