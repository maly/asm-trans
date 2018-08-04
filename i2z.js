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
  "adc": function(par1,par2) {
    return["ADC","A",regZ(par1)]
  },
  "aci": function(par1,par2) {
    return["ADC","A",regZ(par1)]
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

  "inx": function(par1,par2) {
    return["INC",regPairZ(par1),""]
  },

  "dcx": function(par1,par2) {
    return["DEC",regPairZ(par1),""]
  },


  "ana": function(par1,par2) {
    return["AND",regZ(par1),""]
  },
  "ani": function(par1,par2) {
    return["AND",regZ(par1),""]
  },
  "xra": function(par1,par2) {
    return["XOR",regZ(par1),""]
  },
  "xri": function(par1,par2) {
    return["XOR",regZ(par1),""]
  },
  "ora": function(par1,par2) {
    return["OR",regZ(par1),""]
  },
  "ori": function(par1,par2) {
    return["OR",regZ(par1),""]
  },
  "cmp": function(par1,par2) {
    return["CP",regZ(par1),""]
  },
  "cpi": function(par1,par2) {
    return["CP",regZ(par1),""]
  },

  "jmp": function(par1,par2) {
    return["JP",par1,""]
  },
  "jnz": function(par1,par2) {
    return["JP","NZ",par1]
  },
  "jz": function(par1,par2) {
    return["JP","Z",par1]
  },
  "jnc": function(par1,par2) {
    return["JP","NC",par1]
  },
  "jc": function(par1,par2) {
    return["JP","C",par1]
  },
  "jpe": function(par1,par2) {
    return["JP","PE",par1]
  },
  "jpo": function(par1,par2) {
    return["JP","PO",par1]
  },
  "jp": function(par1,par2) {
    return["JP","P",par1]
  },
  "jm": function(par1,par2) {
    return["JP","M",par1]
  },


  "call": function(par1,par2) {
    return["CALL",par1,""]
  },
  "cnz": function(par1,par2) {
    return["CALL","NZ",par1]
  },
  "cz": function(par1,par2) {
    return["CALL","Z",par1]
  },
  "cnc": function(par1,par2) {
    return["CALL","NC",par1]
  },
  "cc": function(par1,par2) {
    return["CALL","C",par1]
  },
  "cpe": function(par1,par2) {
    return["CALL","PE",par1]
  },
  "cpo": function(par1,par2) {
    return["CALL","PO",par1]
  },
  "cp": function(par1,par2) {
    return["CALL","P",par1]
  },
  "cm": function(par1,par2) {
    return["CALL","M",par1]
  },


  "ret": function(par1,par2) {
    return["RET","",""]
  },
  "rnz": function(par1,par2) {
    return["RET","NZ",""]
  },
  "rz": function(par1,par2) {
    return["RET","Z",""]
  },
  "rnc": function(par1,par2) {
    return["RET","NC",""]
  },
  "rc": function(par1,par2) {
    return["RET","C",""]
  },
  "rpe": function(par1,par2) {
    return["RET","PE",""]
  },
  "rpo": function(par1,par2) {
    return["RET","PO",""]
  },
  "rp": function(par1,par2) {
    return["RET","P",""]
  },
  "rm": function(par1,par2) {
    return["RET","M",""]
  },

  "rst": function(par1,par2) {
    return["RST",(parseInt(par1)*8).toString(16)+"h",""]
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
