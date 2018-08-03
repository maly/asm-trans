var transZ2I = {
  "ex": function(par1,par2) {
    if ((par1.toUpperCase()=="DE") && (par2.toUpperCase()=="HL")) return ["XCHG","",""]
    if ((par1.toUpperCase()=="(SP)") && (par2.toUpperCase()=="HL")) return ["XTHL","",""]
    croak("EX "+par1+","+par2)
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
    return["PUSH",regPair(par1),par2]
  },
  "pop": function(par1,par2) {
    return["POP",regPair(par1),par2]
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
    return["IN",noIndirect(par2),""]
  },
  "out": function(par1,par2) {
    return["OUT",noIndirect(par1),""]
  },
  "add": function(par1,par2) {
    var reg1 = isRegM(par1);
    var reg2 = isRegM(par2);
    var regpair1 = isRegPair(par1);
    var ind1 = isIndirect(par1);
    var ind2 = isIndirect(par2);
    if (regpair1) return ["DAD",regPair(par2),""]
    if (reg1 && reg2) return ["ADD",register(par1),register(par2)]
    if (reg1 && !reg2) return ["ADI",register(par1),par2]
    croak("add "+par1+","+par2)
  },
  "ld": function(par1,par2) {
    var reg1 = isRegM(par1);
    var reg2 = isRegM(par2);
    var regpair1 = isRegPair(par1);
    var ind1 = isIndirect(par1);
    var ind2 = isIndirect(par2);
    if (par1=="SP" && par2=="HL") return ["SPHL","",""]
    if (reg1 && reg2) return ["MOV",register(par1),register(par2)]
    if (reg1 && !reg2 && ind2 && par2=="(BC)") return ["LDAX","B",""]
    if (reg1 && !reg2 && ind2 && par2=="(DE)") return ["LDAX","D",""]
    if (reg1 && !reg2 && ind2) return ["LDA",noIndirect(par2),""]
    if (!reg1 && reg2 && ind1 && par1=="(BC)") return ["STAX","B",""]
    if (!reg1 && reg2 && ind1 && par1=="(DE)") return ["STAX","D",""]
    if (!reg1 && ind1 && reg2) return ["STA",noIndirect(par1),""]
    if (reg1 && !reg2 && !regpair1) return ["MVI",register(par1),par2]
    if (regpair1) return ["LXI",regPair(par1),par2]
    croak("ld "+par1+","+par2)
  },
  "cpl": function(){return ["CMA","",""]},
  "scf": function(){return ["STC","",""]},
  "ccf": function(){return ["CMC","",""]},
  "rlca": function(){return ["RLC","",""]},
  "rrca": function(){return ["RRC","",""]},
  "rla": function(){return ["RAL","",""]},
  "rra": function(){return ["RAR","",""]}
}
