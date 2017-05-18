'use strict';

const express = require('express');
const app     = express();
const PORT    = 3000;
const router   = express.Router();

// implement your fib function and route here!
app.use('/fibonacci', router);

//listen
app.listen(PORT, function(){

	console.log("Listening on port:", PORT);
});

var num 	    = null;
var method      = null;
var fibNumber   = null;
var startHr     = null;
var endHr       = null;

//initialize cache
const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: 300, checkperiod: 0 } );//time set to 300 sec/5min

//get request
router.get('/', function (req, res) {

	num=req.query.nth ;
	method=req.query.method;

	if(num == null || num == 'undefined' || method == 'undefined' || method== null){
      	res.status(500).json({ 
      		error: 'Not a valid request, use: /?nth=n&method=iterative or recursive'
      						});
      	res.end();
    } 
    else {
    	//valid request so start timer
    	startHr=process.hrtime();
    	//check cache
    	myCache.get( num, function( err, value ){
	    	if( !err ){
    			if(value == undefined){

			    	//not found compute it now
			    	console.log("trace if compute");
			    	if(method === 'iterative')
			    		fibNumber= iterativeFibonacci(num);
			    	else if (method==='recursive')
			    		fibNumber= recursiveFibonacci(num);

					
			    	myCache.set( num, fibNumber, 300 );
	    		}
	    		else{
	    			fibNumber=value;
	    		}
	    	}
	    });
    	//stop time
    	endHr=process.hrtime(startHr);
    }
    //build response
    res.json(
    {
      nth: num,
      value:fibNumber ,
      timestamp: new Date().toISOString(),
      elapsed: endHr[0]*1000000 + endHr[1]/1000000 + 'ms'
    }
  );
    startHr=null;
    endHr=null;
});

//flush cache if out of get, not sure if it ever runs
myCache.flushAll()

function iterativeFibonacci(number){
	let x = 0, y = 1, z = 1;
	for(let i=2;i<number;i++){
		  x = y;
          y = z;
          z = x + y;
	}
	return z;
}
var cache = {}; //to optimize recursive calls
function recursiveFibonacci(number){
	if (number < 1)
        return 0;
    if (number <= 2)
        return 1;
    if (number in cache)
        return cache[number];

     let fib = recursiveFibonacci(number- 1) + recursiveFibonacci(number - 2);
        
    cache[number] = fib;

    return fib;
}

