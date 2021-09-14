import React, { Component } from "react";
import { fetchUserMatches } from "../store/landingPage";
import * as d3 from 'd3'
import { connect } from "react-redux";

import "./styles/Graph.css";


class Graph extends Component {
  constructor() {
    super();
    this.mapKD = this.mapKD.bind(this);
    this.mapGW = this.mapGW.bind(this);
    this.mapGulagWinsToTotal = this.mapGulagWinsToTotal.bind(this);
    this.mapKills = this.mapKills.bind(this);
    this.mapDmg = this.mapDmg.bind(this);
    this.formateData = this.formateData.bind(this)
    this.createSVG = this.createSVG.bind(this);
    this.createLineChart = this.createLineChart.bind(this);
    this.createCircleMeter = this.createCircleMeter.bind(this);
    

  }
  componentDidMount() {
    // this.reloadMain()
    // console.log(111,this.mapKD(this.props.userMatch.data.matches))
    // this.formateData(this.mapKD(this.props.userMatch.data.matches))
    this.createLineChart(`#KDLineChartDiv`,this.formateData(this.mapKD(this.props.userMatch.data.matches)),'', "K/D", 200)
    this.createLineChart(`#KillsLineChartDiv`,this.formateData(this.mapKills(this.props.userMatch.data.matches)),'', "Kills", 200)
    this.createLineChart(`#DmgLineChartDiv`,this.formateData(this.mapDmg(this.props.userMatch.data.matches)),'', "Damage", 300, 615, "#ff7597")
    // this.createLineChart(`#GWLineChartDiv`,this.formateData(this.mapGW(this.props.userMatch.data.matches)),'Gulag Wins', "myTitle")
    this.createCircleMeter(this.mapGulagWinsToTotal(this.props.userMatch.data.matches))
  }


  mapKD(arr) {
   const result = []
    arr.map((el, i) => {
      if(i > 9){
      } else {
        result.push(el.playerStats.kdRatio)
      }
    })
    console.log("KD", result)
    return result
  }

  mapGW(arr){
    const result = []
    arr.map((el, i) => {
      if(i > 9){
      }else{
        if(el.playerStats.gulagKills === 0 && el.playerStats.gulagDeaths === 0) {
          result.push("-")
        } else if (el.playerStats.gulagKills === 1){
          result.push(1)
        } else {
          result.push(0)
        }
      }
    })
    console.log("GW", result)
    return result
  }

  mapGulagWinsToTotal(arr){
    const result = [0,0]
    arr.map((el, i) => {
      if(i > 9){
      }else{
        if(el.playerStats.gulagKills === 0 && el.playerStats.gulagDeaths === 0) {
        } else if (el.playerStats.gulagKills === 1){
          result[0] += 1
          result[1] += 1
        } else {
          result[1] += 1
        }
      }
    })
    console.log("GW/T", typeof result[0])
    return result
  }


  mapKills(arr){
    const result = []
    arr.map((el, i) => {
      if(i > 9){
      } else {
        result.push(el.playerStats.kills)
      }
    })
    console.log("Kills",result)
    return result
  }

  mapDmg(arr){
    const result = []
    arr.map((el, i) => {
      if(i > 9){
      } else {
        result.push(el.playerStats.damageDone)
      }
    })
    console.log("Dmg", result)
    return result
  }
  
  //------------------Line Graphs------------------------------

  formateData(arr){//[1,2,3,4,5,6,7,7,8,9]
    let result = arr.map((el,i)=> ({
      name: i + 1,
      value: el,
    }))
    console.log("formatData", result)
    return result
  }

  createSVG(div, width, height, margin) {
      return d3
        .select(div)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate('+ margin.left + ',' + margin.top + ')')
    }

    createLineChart(div, arr, yLable, title, lablePlace, cWidth = 440, lineColor = "#ff0266") {
    const data = arr
    const margin = {top: 30, right: 30, bottom: 30, left: 40},
    width = cWidth - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;
    
    const svg = this.createSVG(div, width, height, margin)
    
    //axis
    const x = d3.scaleLinear()
      .domain(d3.extent(data, function(d) { return d.name; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    //lables
    svg.append("g")
      .append('text')
        .attr('class', 'x label')
        .attr('text-anchor', 'end')
        .attr("fill", "white")
        .attr('y', -13)
        .attr('x', lablePlace)
        .text(title)

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", lineColor)
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.name) })
        .y(function(d) { return y(d.value) })
        )
  }

  //---------------------Circle Perfentage---------------------------
  createCircleMeter(arr){

    const width = 250,
    height = 250,
    twoPi = 2 * Math.PI,
    progress = 0,
    wins = arr[0],
    total = arr[1],
    formatPercent = d3.format(".0%");


    
    const arc = d3.arc()
        .startAngle(0)
        .innerRadius(78)
        .outerRadius(96);
    
    const svg = d3.select("#GWCircleChartDiv").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    const meter = svg.append("g")
        // .attr("class", "funds-allocated-meter");
    
    meter.append("path")
        .attr("class", "background")
        .attr("d", arc.endAngle(twoPi));
    
    const foreground = meter.append("path")
        .attr("class", "foreground");
    
    const percentComplete = meter.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "percent-complete")
        .attr("dy", "0em");
    
    const description = meter.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "description")
        .attr("dy", "2.0em")
        .text("Gulag Win %");
    
    const i = d3.interpolate(progress, wins / total);
    
    d3.transition().duration(1000).tween("progress", function() {
      return function(t) {
        const progress = i(t);
        foreground.attr("d", arc.endAngle(twoPi * progress));
        percentComplete.text(formatPercent(progress));
      };
    });
  }



  //-----------------------------------------------------------------


  render() {
    return (
      <div id="playerMoreDetailContainer">
        <div id="playerGraphContainer">
          <div className="graphBox1">
            <div className="graphTitle" id="KDLineChartDiv"></div>
          </div>
          <div className="graphBox1">
            <div className="graphTitle" id="KillsLineChartDiv"></div>
          </div>
          <div className="graphBox3">
            <div className="graphTitle" id="GWCircleChartDiv"></div>
          </div>
          <div className="graphBox2">
            <div className="graphTitle" id="DmgLineChartDiv"></div>
          </div>
        </div>
        <div id="playerGWDisplay">
          {this.mapGW(this.props.userMatch.data.matches).map((el, i) => {
            if(el === 1){
              return(
                <div className="GulagIndivW">W</div>
              )
            } else if(el === 0){
              return(
                <div className="GulagIndivL">L</div>
              )
            } else {
              return(
                <div className="GulagIndiv-">{el}</div>
              )
            }
          })}
        </div>
      </div>
    );
  }
}


const mapState = (state) => {
  return {
    userInfo: state.landingPage.userInfo,
    username: state.landingPage.username,
    userMatch: state.landingPage.userMatch
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchUserMatches: (username) => {
      dispatch(fetchUserMatches(username));
    },
  };
};

export default connect(mapState, mapDispatch)(Graph);
