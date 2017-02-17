(function ( window){
	var arr = [],
    push = arr.push;
    //对外公开的函数，但是原型与构造函数相同，而且construtor也是该函数
    //因此Itcast函数也是构造函数
	function Itcast (selector){
		return new Itcast.fn.init(selector);
	}
	//原型设置
	Itcast.fn = Itcast.prototype ={
		constructor: Itcast,
		init:function(selector){
			//获得元素 设置this  
			//Itcast获取元素用push的方法添加在init这个构造函数中
			push.apply(this,Itcast.select(selector));
		},
		//实例也应该增加each 与map 等方法
		each:function(callback){
			return Itcast.each(this,callback);
		},
		map:function(callback){
			return Itcast.map(this,callback);
		}
	}
	//共享原型
	// 就是把Itcast构造函数和init这两个够早函数的原型同时指向一个原型
	Itcast.fn.init.prototype = Itcast.fn;

   //已经写好的工具方法
   Itcast.select =function(selector) {
   	   return document.querySelectorAll(selector);
   };
   Itcast.isArrayLike = function(obj) {
   	//判断是不是一个数组
   	 if(Object.prototype.toString.call(obj)=="[Object,Array]"){
   	 	return true;
   	 } 
   	 //这是一个逻辑与，在这里我们找的就是假，当我们这个是这个对象的长度我们就
   	 //返回true 否则就返回false 那么就是返回的"length"in obj
   	 var length = "length" in obj && obj.length;
   	  return typeof length === "numeber"  && length >=0;
   	  //我们返回的length类型
   }
  Itcast.each= function (arr,callback){  
   	if(Itcast.isArrayLike(arr)){  //判断是不是数组中的每一项
   		for(var i = 0;i<arr.length;i++){
   			//call就是为了改变this的指向  如果当前arr[i]不是这个数组中的那么我们就让他false
   			//并且跳出这个循环 执行下面的代码
   			if(callback.call(arr[i],arr[i],i)===false)break;
   		}
   	}else{
   		//判断是不是一个对象
   		for(var k in arr){
   			if(callback.call(arr[k],k,arr[k])===false)break;
   		}
   	}
   	return arr;
   }
   Itcast.map = function(arr,callback){
   	if(Itcast.isArrayLike(arr)){
   		var newArr = [],tmp;
   		if(Itcast.isArrayLike(arr)){
   			for(var i=0;i<arr.length;i++){
   				tmp = callback(arr[i],i);
   				if(tmp !=null){
   					newArr.push(tmp);
   				}
   			}
   		}else{
   			for(var k in arr){
   				tmp = callback(arr[i],i);
   				if(tmp != null){
   					newArr.push(tmp);
   				}
   			}
   		}
   	}
   	return newArr;
   }
   window.Itcast = window.I= Itcast;




})(window);