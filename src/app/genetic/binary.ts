export class Binary {

    private setCharAt(str,index,chr) {
        if(index > str.length-1) return str;
        return str.substr(0,index) + chr + str.substr(index+1);
    }
    
    private getCharAt(str,index) {
        if(index > str.length-1) return str;
        
        
        return str.substr(index,1);
    }
    
    private binaryToDecimal(binaryNo)
    {
    
        var digit = parseInt(binaryNo.toString(), 2);
        return digit;
    }
    
    
    
    //this private will return the binary format of Decimal no
    private latlongToBinaryConversion(decimalNo)
    {
        var bno = parseInt(decimalNo);
        var binaryNo = bno.toString(2);
        //console.log("DecimalNo");
        //console.log(decimalNo);
        //console.log("Binary No");
        //console.log(binaryNo);
        return binaryNo;
    }
    
    
    
    //-------------this is random one bit Binary Swapping function result two new Strings-------------
    //---------------One String = Pakistan   2nd String = Olympics
    //------------------------Random bits = 1 to 4
    //----if Random bit = 2 then 2,3 swap bits generated, if Random bit = 3 then 3,4 swap bits generated---
    //-----If swap bits are 2,3 then offspring1 = Oaympics  ,Offspring2 = Payistan are generated
    private binarySwappingOneBit(binaryFather,binaryMother)
    {
       //console.log("In Function binarySwappingOneBit");
       
        var resultArray = new Array();
    
        var randomNo = Math.floor((Math.random() * 4) + 1);
        var swapNoSecond = randomNo+1;
        
        var ranCharN1 = this.getCharAt(binaryFather,randomNo-1);//Starting from 1 ,2, 3
        //console.log("random no First");
        //console.log(randomNo);
        //console.log(ranCharN1);
    
        var SwappedN2 = this.setCharAt(binaryMother,randomNo-1,ranCharN1);
    
    
        var ranCharN2 = this.getCharAt(binaryMother,swapNoSecond-1);//Starting from 1 ,2, 3
        //console.log("random no Second");
        //console.log(swapNoSecond);
        //console.log(ranCharN2);
    
        var SwappedN1 = this.setCharAt(binaryFather,swapNoSecond-1,ranCharN2);
    
        //console.log("swapped N2");
        //console.log(SwappedN2);
    
    
        //console.log("swapped N1");
        //console.log(SwappedN1);
    
        resultArray.push(SwappedN1);
        resultArray.push(SwappedN2);
    
        return resultArray;
    }
    
    //------this function takes First four bits of Father and append remaining bits of Mother
    //-------Similarly takes First four bits of mother and appends remaining bits of Father
    //------Selection of 4 bit first or three bit first are random based
    
    private binarySwappingfourBitFirstThreeBitLast(binaryFather,binaryMother)
    {
        
        
        //console.log("In Function binarySwappingfourBitFirstThreeBitLast");
    
        //console.log("Right Portion First Point");
        //console.log(binaryFather);
        //console.log("Right portion Second Point");
        //console.log(binaryMother);
    
        var resultArray = new Array();
    
        var randomNo = Math.floor((Math.random() * 2) + 1);
        var swapNoSecond;
        
        if(randomNo == 3)    
            swapNoSecond = 2;
        else
            swapNoSecond = 1;
        
        
        var SwappedN2;
        var SwappedN1;
    
    
        //console.log("random no");
        //console.log(randomNo);
        //console.log("swapped bit");
        //console.log(swapNoSecond);
    
        if(swapNoSecond==2)
        {
            
    
            SwappedN2 = binaryFather.toString().substr(0,3)+binaryMother.toString().substr(3,binaryMother.length-3);//binaryMother.length-3,3);
            SwappedN1 = binaryMother.toString().substr(0,3)+binaryFather.toString().substr(3,binaryFather.length-3);//binaryFather.length-3,3);
        }
        else
        {
           // //console.log(binaryFather.toString().substr(0,1));
           // //console.log(binaryMother.toString().substr(1,binaryMother.length-1));
            SwappedN2 = binaryFather.toString().substr(0,2)+binaryMother.toString().substr(2,binaryMother.length-2);//binaryMother.length-4,4);
            SwappedN1 = binaryMother.toString().substr(0,2)+binaryFather.toString().substr(2,binaryFather.length-2);//binaryFather.length-4,4);
        }    
    
        //console.log("swapped N2");
        //console.log(SwappedN2);
    
    
        //console.log("swapped N1");
        //console.log(SwappedN1);
    
        resultArray.push(SwappedN1);
        resultArray.push(SwappedN2);
    
        return resultArray;
    }
    
    
    binSwapping( x1:number, y1:number, x2:number, y2:number ):any {
    
        let firstPointLat = x1
        let firstPointLong = y1;
        let secondPointLat = x2;
        let secondPointLong = y2;
        
        let firstPointLatBinary = this.latlongToBinaryConversion(firstPointLat);
        let firstPointLongBinary = this.latlongToBinaryConversion(firstPointLong);
        let secondPointLatBinary = this.latlongToBinaryConversion(secondPointLat);
        let secondPointLongBinary = this.latlongToBinaryConversion(secondPointLong);

        let firstOffsping = {x:null, y:null};
        let secondOffsping = {x:null, y:null};

        //Getting Final Output One Bit Cross Over Result
        /*var resultLatArrayOneBitSwapped = this.binarySwappingOneBit(firstPointLatBinary,secondPointLatBinary);
        var resultLongArrayOneBitSwapped = this.binarySwappingOneBit(firstPointLongBinary,secondPointLongBinary);    
      
        firstOffsping.x = this.binaryToDecimal(resultLatArrayOneBitSwapped[0]);
        firstOffsping.y = this.binaryToDecimal(resultLongArrayOneBitSwapped[0]);
        secondOffsping.x = this.binaryToDecimal(resultLatArrayOneBitSwapped[1]);
        secondOffsping.y = this.binaryToDecimal(resultLongArrayOneBitSwapped[1]);*/

        //Getting Final Output Three or Four Bit First Random Cross Over Result
        var resultLatArrayFourBitSwapped = this.binarySwappingfourBitFirstThreeBitLast(firstPointLatBinary,secondPointLatBinary);
        var resultLongArrayFourBitSwapped = this.binarySwappingfourBitFirstThreeBitLast(firstPointLongBinary,secondPointLongBinary);     
        
        firstOffsping.x = this.binaryToDecimal(resultLatArrayFourBitSwapped[0]);
        firstOffsping.y = this.binaryToDecimal(resultLongArrayFourBitSwapped[0]);
        secondOffsping.x = this.binaryToDecimal(resultLatArrayFourBitSwapped[1]);
        secondOffsping.y = this.binaryToDecimal(resultLongArrayFourBitSwapped[1]);

        return { firstOffsping, secondOffsping };

    }
    
}
