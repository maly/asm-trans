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



  "or": function(par1) {
    if(isRegM(par1)) return["ORA",register(par1),""]
    return["ORI",par1,""]
  },
  "and": function(par1) {
    if(isRegM(par1)) return["ANA",register(par1),""]
    return["ANI",par1,""]
  },
  "xor": function(par1) {
    if(isRegM(par1)) return["XRA",register(par1),""]
    return["XRI",par1,""]
  },
  "cp": function(par1) {
    if(isRegM(par1)) return["CMP",register(par1),""]
    return["CPI",par1,""]
  },
  "sub": function(par1) {
    if(isRegM(par1)) return["SUB",register(par1),""]
    return["SUI",par1,""]
  },
  "sbc": function(par1) {
    if(isRegM(par1)) return["SBB",register(par1),""]
    return["SBI",par1,""]
  },
  "adc": function(par1) {
    if(isRegM(par1)) return["ADC",register(par1),""]
    return["ACI",par1,""]
  },
  "jp": function(par1,par2) {
    if(!par2) return ["JMP",par1,""]
    if(par1=="(HL)") return["PCHL","",""]
    return["J"+par1.toUpperCase(),par2,""]
  },
  "call": function(par1,par2) {
    if(!par2) return ["CALL",par1,""]
    return["C"+par1.toUpperCase(),par2,""]
  },
  "ret": function(par1,par2) {
    if(!par1) return ["RET","",""]
    return["R"+par1.toUpperCase(),"",""]
  },
  "push": function(par1,par2) {
    return["PUSH",regPairZ(par1),par2]
  },
  "pop": function(par1,par2) {
    return["POP",regPairZ(par1),par2]
  },
  "inc": function(par1,par2) {
    if(isRegPair(par1))return["INX",regPair(par1),par2]
    if(isRegM(par1)) return["INR",register(par1),""]
    croak("inc")
  },
  "dec": function(par1,par2) {
    if(isRegPair(par1))return["DCX",regPair(par1),par2]
    if(isRegM(par1)) return["DCR",register(par1),""]
    croak("inc")
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
