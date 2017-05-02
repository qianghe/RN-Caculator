/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import LabelButton from './labelButton';
import CalculatorOperator from './CaculatorOperator'

export default class Calculator extends CalculatorOperator {
   constructor(props){
        super(props);
        this.numObj = {
            "line1": ["AC","+/-","%"],
            "line2": [ 7 , 8 , 9 ],
            "line3": [ 4 , 5 , 6 ],
            "line4": [ 1 , 2 , 3 ],
            "line5": [ 0 , "." ],
        }

        this.funcArr = ['÷','×','-','+','='];

        this._onPressButton = this._onPressButton.bind(this);
   }

   _onPressButton(input){
        var numReg = /[0-9.]/;
        var operatorReg = /[÷|×|+|-|=]$/;
        var symbolReg = /AC|\+\/-|%/;

        if(numReg.test(input)){
            this.numberDeal(input);
        }else if(operatorReg.test(input)){
            this.operatorDeal(input);
        }else{
            console.log('hre');
            this.symbolRegDeal(input);
        }
   }

   renderNumPanelRow(lineNum){
       let numPanelItems = [];

       this.numObj[`line${lineNum}`].forEach((value,index)=>{
           let itemStyle = [styles.panelItem , styles.numPanelItem];
           if(lineNum == 5 && index == 0){
               itemStyle  = [styles.panelItemTwo, styles.numPanelItem];
           }
           numPanelItems.push(
               <LabelButton
                   onPressButton = {()=>this._onPressButton(value)}
                   attrs = {{ activeOpacity:1 ,underlayColor:"#c9c9cc" }}
                   itemStyle = {itemStyle}
                   itemTextStyle = {styles.numPanelText}
                   value = {value}
                   key={`numItem.${lineNum}.${index}`}
               />
           )
       })

       return numPanelItems;
   }
   renderNumPanel(){
        let numPanelRows = [];

        Object.keys(this.numObj).forEach((value,index)=>{
            value = value.replace(/line/,'');

            numPanelRows.push(
                <View style={styles.numPanelRow} key={`numPanelRow${index}`}>
                    {this.renderNumPanelRow(value)}
                </View>
            )
        })


        return (
            <View style={styles.numPanel}>
                {numPanelRows}
            </View>
        )
   }

   renderFuncPanel(){
       let funcPanelItems = [];

       this.funcArr.forEach((value,index)=>{
           funcPanelItems.push(
               <LabelButton
                   onPressButton={()=>this._onPressButton(value)}
                   attrs = {{ activeOpacity:1 ,underlayColor:"#f98000" }}
                   itemStyle = {[styles.panelItem , styles.funcPanelItem]}
                   itemTextStyle = {styles.funcPanelText}
                   value = {value}
                   key={`funcItem.${index}`}
               />
           )
       })

       return (
           <View style={styles.funcPanel}>
               {funcPanelItems}
           </View>
       )
   }
   render() {
    return (
      <View style={styles.container}>
            <View style={styles.showPanel}>
                <Text style={styles.showPanelText}>{this.state.showContent}</Text>
            </View>
            <View style={styles.calcPanel}>
                { this.renderNumPanel() }
                { this.renderFuncPanel() }
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#202020',
  },
  showPanel: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  showPanelText: {
      fontSize: 60,
      color: '#fff',
      paddingRight: 5,
      paddingLeft: 5,
  },
  calcPanel: {
    flex: 6,
    flexDirection: 'row',
  },
  panelItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  panelItemTwo: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numPanel: {
    flex: 3,
    flexDirection: 'column',
  },
  numPanelRow: {
      flex: 1,
      flexDirection: 'row',
  },
  numPanelItem: {
      backgroundColor: '#cfd0d4',
      borderBottomWidth: 1,
      borderBottomColor : '#202020',
      borderRightWidth: 1,
      borderRightColor: '#202020',
  },
  numPanelText: {
      fontSize: 40,
      color: '#000',
  },
  funcPanel: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'gray',
 },
 funcPanelItem : {
     borderBottomWidth: 1,
     borderBottomColor : '#202020',
     backgroundColor: '#fa8c13',
 },
 funcPanelText: {
     fontSize: 40,
     color: '#fff',
 },
 darkgray: {
     backgroundColor: '#c8c9cb',
 },
});

AppRegistry.registerComponent('Calculator', () => Calculator);
