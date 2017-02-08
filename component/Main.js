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
    TabBarIOS,
    NavigatorIOS
} from 'react-native';
//引入组件
var Home = require("./Home");
var Message = require("./Message");
var Find = require("./Find");
var Mine = require("./Mine");
var Main = React.createClass({
    getInitialState:function () {
        return {
            selectedItem : "home"
        }
    },
   render:function () {
       return(
           <TabBarIOS
            tintColor="orange"
           >
               {/*首页*/}
               <TabBarIOS.Item
                   icon={require("./../images/tabbar_home@2x.png")}
                   title="首页"
                   selected={this.state.selectedItem == "home"}
                   onPress={() =>{this.setState({
                       selectedItem:"home"
                   })}}
               >
                <NavigatorIOS
                    tintColor={"orange"}
                    style={{flex:1}}
                    initialRoute={{
                        component:Home,//需要控制的板块
                        title:"首页",
                        leftButtonIcon:require("./../images/navigationbar_friendattention@2x.png"),
                        rightButtonIcon:require("./../images/navigationbar_pop@2x.png")
                    }}
                />
               </TabBarIOS.Item>
               {/*消息*/}
               <TabBarIOS.Item
                   icon={require("./../images/tabbar_message_center@2x.png")}
                   title="消息"
                   selected={this.state.selectedItem == "message"}
                   onPress={() =>{this.setState({
                       selectedItem:"message"
                   })}}
               >
                   <NavigatorIOS
                       style={{flex:1}}
                       initialRoute={{
                           component:Message,//需要控制的板块
                           title:"消息"
                       }}
                   />
               </TabBarIOS.Item>
               {/*发现*/}
               <TabBarIOS.Item
                   icon={require("./../images/tabbar_discover@2x.png")}
                   title="发现"
                   selected={this.state.selectedItem == "find"}
                   onPress={() =>{this.setState({
                       selectedItem:"find"
                   })}}
               >
                   <NavigatorIOS
                       style={{flex:1}}
                       initialRoute={{
                           component:Find,//需要控制的板块
                           title:"发现"
                       }}
                   />
               </TabBarIOS.Item>
               {/*我的*/}
               <TabBarIOS.Item
                   icon={require("./../images/tabbar_profile@2x.png")}
                   title="我的"
                   selected={this.state.selectedItem == "mine"}
                   onPress={() =>{this.setState({
                       selectedItem:"mine"
                   })}}
               >
                   <NavigatorIOS
                       style={{flex:1}}
                       initialRoute={{
                           component:Mine,//需要控制的板块
                           title:"我的"
                       }}
                   />
               </TabBarIOS.Item>
           </TabBarIOS>
       )
   }
});

const styles = StyleSheet.create({

});
//输出类
module.exports = Main;

