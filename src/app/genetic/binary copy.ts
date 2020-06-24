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
    
    private binaryToDecimalParseConvertFullNo(latlongBinary)
    {
        var myStrArray = latlongBinary.toString().split('.');
        var leftBinary = myStrArray[0];
        var rightBinary = myStrArray[1];
        //console.log("Left Binary");
        //console.log(leftBinary);
        //console.log("right Binary");
        //console.log(rightBinary);
        return this.binaryToDecimal(leftBinary).toString()+"."+this.binaryToDecimal(rightBinary).toString();
    }
    
    //this function will return the binary format of Decimal no
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
    
    private latlongParseConvertinBinary(latLongValue)
    {
    
        var myStrArray = latLongValue.toString().split('.');
        var leftDecimal = myStrArray[0];
        var rightDecimal = myStrArray[1];
        //console.log("Left Decimal");
        //console.log(leftDecimal);
        //console.log("right Decimal");
        //console.log(rightDecimal);
        return this.latlongToBinaryConversion(leftDecimal).toString()+"."+this.latlongToBinaryConversion(rightDecimal).toString();
    
    }
    
    private binaryFormatLatLongSwapping(latLongFirstPoint,latLongSecondPoint)
    {
        var strFirstPointArray = new Array();
        strFirstPointArray = latLongFirstPoint.toString().split('.');
        var strSecondPointArray = new Array();
        strSecondPointArray = latLongSecondPoint.toString().split('.');
        var leftFirstPoint = strFirstPointArray[0];
        var rightFirstPoint = strFirstPointArray[1];
        var leftSecondPoint = strSecondPointArray[0];
        var rightSecondPoint = strSecondPointArray[1];
        var resultArrayLeft = new Array();
        var resultArrayRight = new Array();
        var resultArrayFinal = new Array();
    
        
       //console.log("In Function of binaryFormatLatLongSwapping ");
       
        //console.log("lat long first point");
        //console.log(latLongFirstPoint);
        //console.log("lat long Second point");
        //console.log(latLongSecondPoint);
        
        //console.log("str first point array");
        //console.log(strFirstPointArray);
        //console.log("str Second point array");
        //console.log(strSecondPointArray);    
        
        //console.log("left First Point");
        //console.log(leftFirstPoint);
    
        //console.log("right First Point");
        //console.log(rightFirstPoint);
    
        //console.log("left Second Point");
        //console.log(leftSecondPoint);
    
        //console.log("right Second Point");
        //console.log(rightSecondPoint);
    
        
        resultArrayLeft = this.binarySwappingOneBit(leftFirstPoint,leftSecondPoint);
        resultArrayRight = this.binarySwappingfourBitFirstThreeBitLast(rightFirstPoint,rightSecondPoint);
    
        //console.log("After performing binary swapping one bit result array left");
        //console.log(resultArrayLeft);
        //console.log("result array right");
        //console.log(resultArrayRight);
    
        resultArrayFinal.push(resultArrayLeft[0].toString()+"."+resultArrayRight[0].toString());
        resultArrayFinal.push(resultArrayLeft[1].toString()+"."+resultArrayRight[1].toString());   
    
        return resultArrayFinal;
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
    
        var randomNo = Math.floor((Math.random() * 1) + 3);
        var swapNoSecond;
        
        if(randomNo == 4)    
            swapNoSecond = 3;
        else
            swapNoSecond = 4;
        
        
        var SwappedN2;
        var SwappedN1;
    
        if(swapNoSecond==4)
        {
            SwappedN2 = binaryFather.toString().substr(0,4)+binaryMother.toString().substr(4,binaryMother.length-4);//binaryMother.length-3,3);
            SwappedN1 = binaryMother.toString().substr(0,4)+binaryFather.toString().substr(4,binaryMother.length-4);//binaryFather.length-3,3);
        }
        else
        {
            SwappedN2 = binaryFather.toString().substr(0,3)+binaryMother.toString().substr(3,binaryMother.length-3);//binaryMother.length-4,4);
            SwappedN1 = binaryMother.toString().substr(0,3)+binaryFather.toString().substr(3,binaryMother.length-3);//binaryFather.length-4,4);
        }    
    
        //console.log("swapped N2");
        //console.log(SwappedN2);
    
    
        //console.log("swapped N1");
        //console.log(SwappedN1);
    
        resultArray.push(SwappedN1);
        resultArray.push(SwappedN2);
    
        return resultArray;
    }
    
    private binaryToOneBitMutation(binaryValue)
    {
    
        var firstMutationBit = Math.floor((Math.random() * 3) + 1);
        
        
        var ranCharN1 = this.getCharAt(binaryValue.toString(),firstMutationBit-1);//Starting from 1 ,2, 3   
       
        //console.log("random no for First Mutation");
        //console.log(firstMutationBit);    
        //console.log("orignal binary");
        //console.log(binaryValue);
    
        var SwappedN1; 
    
        if(ranCharN1 == '0')
        {
            SwappedN1 = this.setCharAt(binaryValue.toString(),firstMutationBit-1,'1');
            
        }
        else
        {
            SwappedN1 = this.setCharAt(binaryValue.toString(),firstMutationBit-1,'0');        
    
        }
        
        //console.log("After Mutation of One Bit Final value");
        //console.log(SwappedN1);
    
        return SwappedN1;
    }
    
    
    private binaryToTwoBitMutation(binaryValue)
    {
    
        var firstMutationBit = Math.floor((Math.random() * 3) + 1);
        var secondMutationBit = firstMutationBit+2;
        
        var ranCharN1 = this.getCharAt(binaryValue.toString(),firstMutationBit-1);//Starting from 1 ,2, 3
        var ranCharN2 = this.getCharAt(binaryValue.toString(),secondMutationBit-1);
        //console.log("random no for First Mutation");
        //console.log(firstMutationBit);
        //console.log("No for Second Mutation");
        //console.log(secondMutationBit);
        //console.log("orignal binary");
        //console.log(binaryValue);
    
        var SwappedN1; 
    
        if(ranCharN1 == '0')
        {
            SwappedN1 = this.setCharAt(binaryValue.toString(),firstMutationBit-1,'1');
            if(ranCharN2 == '0')
            {
                SwappedN1 = this.setCharAt(SwappedN1.toString(),secondMutationBit-1,'1');
            }
            else
            {
                SwappedN1 = this.setCharAt(SwappedN1.toString(),secondMutationBit-1,'0');
            }
        }
        else
        {
            SwappedN1 = this.setCharAt(binaryValue.toString(),firstMutationBit-1,'0'); 
            if(ranCharN2 == '0')
            {
                SwappedN1 = this.setCharAt(SwappedN1.toString(),secondMutationBit-1,'1');
            }
            else
            {
                SwappedN1 = this.setCharAt(SwappedN1.toString(),secondMutationBit-1,'0');
            }
    
        }
        
        //console.log("After Mutation of Both bits Final value");
        //console.log(SwappedN1);
    
        return SwappedN1;
    }
    
    
    private binaryParseApplyMutation(binaryLat,binaryLong)
    {
        var strFirstPointArray = new Array();
        strFirstPointArray = binaryLat.toString().split('.');
        var strSecondPointArray = new Array();
        strSecondPointArray = binaryLong.toString().split('.');
        var leftLatPoint = strFirstPointArray[0];
        var rightLatPoint = strFirstPointArray[1];
        var leftLongPoint = strSecondPointArray[0];
        var rightLongPoint = strSecondPointArray[1];
        
        var resultArrayFinal = new Array();
    
        
       //console.log("In Function of binaryFormatLatLongSwapping ");
       
        //console.log("lat first point");
        //console.log(binaryLat);
        //console.log("long first point");
        //console.log(binaryLong);
        
        //console.log("str first Lat array");
        //console.log(strFirstPointArray);
        //console.log("str first Long array");
        //console.log(strSecondPointArray); 
    
        var leftLatAfterMutation = this.binaryToOneBitMutation(leftLatPoint); 
        var rightLatAfterMutation = this.binaryToTwoBitMutation(rightLatPoint);
        var leftLongAfterMutation = this.binaryToOneBitMutation(leftLongPoint);
        var rightLongAfterMutation = this.binaryToTwoBitMutation(rightLongPoint);
    
        //console.log("After performing binary Mutation");
        
    
        resultArrayFinal.push(leftLatAfterMutation.toString()+"."+rightLatAfterMutation.toString());
        resultArrayFinal.push(leftLongAfterMutation.toString()+"."+rightLongAfterMutation.toString());
    
        return resultArrayFinal;
    
    }
    
    
    binSwapping( x1:number, y1:number, x2:number, y2:number ):any {
    
        let firstPointLat = x1
        let firstPointLong = y1;
        let secondPointLat = x2;
        let secondPointLong = y2;
        
        let firstPointLatBinary = this.latlongParseConvertinBinary(firstPointLat);
        let firstPointLongBinary = this.latlongParseConvertinBinary(firstPointLong);
        let secondPointLatBinary = this.latlongParseConvertinBinary(secondPointLat);
        let secondPointLongBinary = this.latlongParseConvertinBinary(secondPointLong);
        
        let resultMutationFirstPoint = this.binaryParseApplyMutation(firstPointLatBinary,firstPointLongBinary );
        let resultMutationSecondPoint = this.binaryParseApplyMutation(secondPointLatBinary,secondPointLongBinary);
        
        let firstOffsping = {x:null, y:null};
        firstOffsping.x = parseFloat( this.binaryToDecimalParseConvertFullNo(resultMutationFirstPoint[0]) );
        firstOffsping.y = parseFloat( this.binaryToDecimalParseConvertFullNo(resultMutationFirstPoint[1]) );

        let secondOffsping = {x:null, y:null};
        secondOffsping.x = parseFloat( this.binaryToDecimalParseConvertFullNo(resultMutationSecondPoint[0]) );
        secondOffsping.y = parseFloat( this.binaryToDecimalParseConvertFullNo(resultMutationSecondPoint[1]) );

        return { firstOffsping, secondOffsping };
    
    }
    
}
