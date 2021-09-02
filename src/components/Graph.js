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
    this.mapHS = this.mapHS.bind(this);
    this.mapDmg = this.mapDmg.bind(this);
    this.formateData = this.formateData.bind(this)
    this.convertDataToXY = this.convertDataToXY.bind(this);
    this.getAxisRange = this.getAxisRange.bind(this);
    this.setXScale = this.setXScale.bind(this);
    this.setYScale = this.setYScale.bind(this);
    this.createLine = this.createLine.bind(this);
    this.createSVG = this.createSVG.bind(this);
    this.appendXAxis = this.appendXAxis.bind(this);
    this.appendYAxis = this.appendYAxis.bind(this);
    this.appendPath = this.createSVG.bind(this);
    this.appendXLabel = this.appendXLabel.bind(this);
    this.appendYLabel = this.appendYLabel.bind(this);
    this.createLineChart = this.createLineChart.bind(this);
    this.reloadMain = this.reloadMain.bind(this)
    

  }
  componentDidMount() {
    // this.reloadMain()
    // console.log(111,this.mapKD(this.props.userMatch.data.matches))
    // this.formateData(this.mapKD(this.props.userMatch.data.matches))
    this.createLineChart(this.formateData(this.mapKD(this.props.userMatch.data.matches)), 'LCMain')
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

  mapHS(arr){
    const result = []
    arr.map((el, i) => {
      if(i > 9){
      } else {
        result.push(el.playerStats.headshots)
      }
    })
    console.log("HS",result)
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
  
  //------------------------------------------------

  formateData(arr){//[1,2,3,4,5,6,7,7,8,9]
    let result = arr.map((el,i)=> ({
      name: i + 1,
      value: el,
    }))
    console.log("formatData", result)
    return result
  }


  convertDataToXY(data) {
    return data
      .map((obj) => {
        return {x: Number(obj.name), y: obj.value}
      })
      .filter((obj) => obj.x >= 0)
      .sort((a, b) => {
        return a.x - b.x
      })
  }

  getAxisRange(data, axis) {
    return data.map((obj) => obj[axis]).sort((a, b) => a - b)
  }

  setXScale(rangeData, range) {
    return d3
      .scaleLinear()
      .domain([rangeData[0], rangeData[rangeData.length - 1]])
      .range([0, range])
  }

  setYScale(rangeData, range) {
    return d3
      .scaleLinear()
      .domain([rangeData[0], rangeData[rangeData.length - 1]])
      .range([range, 0])
  }

  createLine(xScale, yScale) {
    return d3
      .line()
      .x(function (d) {
        return xScale(d.x)
      })
      .y(function (d) {
        return yScale(d.y)
      })
      .curve(d3.curveMonotoneX)
  }

  createSVG(idValue, width, height) {
    return d3
      .select(`#KDLineChartDiv`)
      .append('svg')
      .attr('width', 400)
      .attr('height', 400)
      .attr('id', idValue)
      .append('g')
      .attr('transform', 'translate(' + 50 + ',' + 50 + ')')
  }

  appendXAxis(svg, xScale, height) {
    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale).ticks(5))
  }

  appendYAxis(svg, yScale, width) {
    svg.append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(0,' + -50 + ')')
    .call(d3.axisLeft(yScale))
  }

  appendPath(svg, line, rangeData) {
    svg
      .append('path')
      .datum(rangeData)
      .attr('class', 'line')
      .attr('stroke', '#8F7AA3' || '#ffab00')
      .attr('d', line)
  }

  appendXLabel(svg, width, height) {
    svg
      .append('text')
      .attr('class', 'x label')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + 40)
      .text('units')
  }

  appendYLabel(svg) {
    svg
      .append('text')
      .attr('class', 'y label')
      .attr('text-anchor', 'end')
      .attr('y', -45)
      .attr('x', -107)
      .attr('dy', '.75em')
      .attr('transform', 'rotate(-90)')
      .text('Responses')
  }

  createLineChart(arr, div, idValue) { //(formated data, class on where div goes, id where div goes)
    const data = arr                           //selectValue = #KDLineChartDiv, #GWLineChartDiv, #HSLineChartDiv, #DmgLineChartDiv

    const toXY = this.convertDataToXY(data)

    const rangeOfX = this.getAxisRange(toXY, 'x')
    const rangeOfY = this.getAxisRange(toXY, 'y')

    const width = 450,
      height = 260

    const xScale = this.setXScale(rangeOfX, width)
    const yScale = this.setYScale(rangeOfY, height)

    const line = this.createLine(xScale, yScale,)

    const svg = this.createSVG(idValue, width, height)

    this.appendXAxis(svg, xScale, height)
    this.appendYAxis(svg, yScale, width)
    this.appendPath(svg, line, toXY)
    this.appendXLabel(svg, width, height)
    this.appendYLabel(svg)
  }

  reloadMain() {
    d3.select('#LCMain').remove()
  }

  //------------------------------------------------
  render() {
    return (
      <div id="playerGraphContainer">
        <div className="graphBox">
          <div className="graphTitle" id="KDLineChartDiv"></div>
          
        </div>
        {/* <div className="graphBox">
          <div className="graphTitle" id="GWLineChartDiv">{this.mapGW(this.props.userMatch.data.matches)}</div>
        </div>
        <div className="graphBox">
          <div className="graphTitle" id="HSLineChartDiv">{this.mapHS(this.props.userMatch.data.matches)}</div>
        </div>
        <div className="graphBox">
          <div className="graphTitle" id="DmgLineChartDiv">{this.mapDmg(this.props.userMatch.data.matches)}</div>
        </div> */}
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
