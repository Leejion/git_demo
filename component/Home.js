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
    ListView,
    Image,
    TouchableOpacity
} from 'react-native';
var HomeDetail = require("./HomeDetail");
var Home = React.createClass({
    getDefaultProps:function () {
        return {
            url_api:"http://api.douban.com/v2/movie/in_theaters",
        }
    },
    /*
    * getInitialState 方法用于定义初始状态，也就是一个对象，这个对象可以通过 this.state 属性读取。
    * 当用户点击组件，导致状态变化，this.setState 方法就修改状态值，
    * 每次修改以后，自动调用 this.render 方法，再次渲染组件。
    *
    * */
    getInitialState:function () {
       return {
           /*
           * ListViewDataSource为ListView组件提供高性能的数据处理和访问。我们需要调用方法从原始输入
           * 数据中抽取数据来创建ListViewDataSource对象，并用其进行数据变更的比较。原始输入数据可以是简单的字符串数组，
           * 也可以是复杂嵌套的对象——分不同区(section)各自包含若干行(row)数据。

            要更新datasource中的数据，请（每次都重新）调用cloneWithRows方法
            （如果用到了section，则对应cloneWithRowsAndSections方法）。数据源中的数据本身是不可修改的，
            所以请勿直接尝试修改。clone方法会自动提取新数据并进行逐行对比（使用rowHasChanged方法中的策略），
            这样ListView就知道哪些行需要重新渲染了。

            在下面这个例子中，一个组件在分块接受数据，这些数据由_onDataArrived方法处理——将新数据拼接（concat）到旧数据尾部，
            同时使用clone方法更新DataSource。我们使用concat方法来修改this._data以创建新数组，注意不能使用push方法拼接数组。
            实现_rowHasChanged方法需要透彻了解行数据的结构，以便提供高效的比对策略。

            constructor(props) {
            super(props);
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.state = {
            ds,
            };
            this._data = [];
            }

            _onDataArrived = (newData) => {
            this._data = this._data.concat(newData);
            this.setState({
            ds: this.state.ds.cloneWithRows(this._data)
            });
            };
            dataSource 该属性，用于为ListView指定当前的数据源
           * */
           dataSource:new ListView.DataSource({rowHasChanged:(r1,r2) => r1 != r2})
       }
    },
    render:function () {
        return (
            // <View style={styles.container}>
            //     <Text style={styles.welcome}>
            //        首页
            //     </Text>
            // </View>
            //数组
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
            />

        );
    },
    renderRow:function (rowData) {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={()=>{this.pushToDetail(rowData)}}
            >
                <View style={styles.bigViewStyle}>
                    <Image
                     source={{uri:rowData.image}}
                     style={styles.iconStyle}
                    />
                    <View style={styles.rightViewStyle}>
                        <Text>
                            {rowData.title}
                        </Text>
                        <Text>
                            {rowData.year}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    },
    pushToDetail:function (data) {
    //    实现跳转
        this.props.navigator.push({
            component:HomeDetail,
            title:data.title,
            passProps:{data}
        });
    },
    componentDidMount:function () {
        this.loadData();
    },
    loadData:function () {
        fetch(this.props.url_api)
            .then((response)=>response.json())
            .then((responseData)=>{
                //console.log(responseData);
                //alert(responseData.subjects[0].title);
            //    请求完成的时候讲数据给状态值
                var myArr = [];
                for (var i = 0;i < responseData.subjects.length;i++){
                    var myObj = {};
                    myObj.title = responseData.subjects[i].title;
                    myObj.image = responseData.subjects[i].images.large;
                    myObj.year = responseData.subjects[i].year;
                    myObj.id = responseData.subjects[i].id;
                    myArr.push(myObj);
                }
            //    设置状态值给数据
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(myArr)
                });
            })
            .catch((error)=>{
                if (error){
                    alert("错误");
                }
            })
    }
});


const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#F5FCFF',
    // },
    // welcome: {
    //     fontSize: 20,
    //     textAlign: 'center',
    //     margin: 10,
    // },
    bigViewStyle:{
        flexDirection:"row",
        padding:10
    },
    iconStyle:{
        width:100,
        height:120,
        marginRight:10
    },
    rightViewStyle:{
        justifyContent:"center"
    }
});

module.exports = Home;

