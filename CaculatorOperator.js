import React, { Component } from 'react';

export default class CalculatorOperator extends Component{
    constructor(props){
        super(props);

        this.state = {
            showContent: '0',
        }

        this.numRecords = [];
        this.operRecords = [];
        this.curNum = '';
        this.symbolPlusFlag = true;
    }

    changeToNum(val){
        val = val + '';
        return val.indexOf('.') != -1 ? val = parseFloat(val) : parseInt(val);
    }

    checkResult(result){
        return result == -Infinity || result == Infinity || isNaN(result);
    }

    dealError(){
        this.setState({
            showContent: '错误',
        })

        this.curNum = '错误';
    }

    computeResult(){
        let result = this.changeToNum(this.numRecords.shift());
        if(this.checkResult(result)) { this.dealError(); return ;}

        for(let i =0 ; i< this.numRecords.length; i++){
            let value = this.numRecords[i];
            let operator = this.operRecords.shift();
            value = this.changeToNum(value);

            switch(operator){
                case '+':
                    result = result + value;
                    break;
                case '-':
                    result= result - value;
                    break;
                case '÷':
                    result = result / value;
                    break;
                case '×':
                    result = result * value;
                    break;
            }

            if(this.checkResult(result)) {
                this.dealError();
                break;
            }
        }

        this.setState({
            showContent: result + '',
        })

        this.curNum = result + '';
        this.numRecords = [];
        this.operRecords = [];
    }

    numberDeal(num){
        if(num == 0 && this.curNum == '0') return ;
        if(num == '.' && this.curNum.indexOf('.') != -1) return ;

        this.curNum = this.curNum + num;

        this.setState({
            showContent: this.curNum,
        })
    }

    operatorDeal(operator){
        if(this.curNum) this.numRecords.push(this.curNum);
        this.curNum = '';

        if(this.numRecords.length == 0) this.numRecords.push(0);

        if(operator == '=') {this.computeResult();return;}

        if(this.numRecords.length > this.operRecords.length){
            this.operRecords.push(operator);
        }
    }

    symbolRegDeal(symbol){
        let value = parseInt(this.state.showContent);

        switch(symbol){
            case 'AC':
                this.numRecords = [];
                this.operRecords = [];
                this.curNum = '';
                this.symbolPlusFlag = true;

                value = '0';
                break;
            case '+/-':
                this.symbolPlusFlag = !this.symbolPlusFlag;

                if(this.symbolPlusFlag && value<0 || !this.symbolPlusFlag && value>0){
                    value = -value;
                }else{
                    value = value;
                }

                break;
            case '%':
                value = value/100 + '' ;
                break;
        }

        this.curNum = symbol == 'AC' ? '' : value;
        this.setState({
            showContent: value,
        })
    }

    render(){
        return '';
    }
}
