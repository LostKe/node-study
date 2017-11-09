
function Hello(self){
    var location;
  this.setLocation=function(loc){
        location=loc;
    };

  this.sayHello=function(target){
      console.log("%s 对 %s 说hello,%s",self,target,location);
  };
}

module.exports=Hello;