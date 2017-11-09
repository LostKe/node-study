
function Hello(self){
    var location;
  this.setLocation=function(loc){
        location=loc;
    };

  this.sayHello=function(target){
      console.log("%s 对 %s 说hello,%s",self,target,location);
  };

  this.excute=function(invoke){
    var result=invoke+3;
    console.log("结果是%d,",result);
  }
}

module.exports=Hello;