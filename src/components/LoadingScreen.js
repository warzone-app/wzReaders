import React, { Component } from "react";
import * as d3 from 'd3'

import "./styles/LoadingScreen.css";

class LoadingScreen extends Component{
    constructor(){
        super()
        this.createCircleLoading = this.createCircleLoading.bind(this);
    }

    componentDidMount() {
        this.createCircleLoading()
    }

    createCircleLoading(){

        const width = 500,
        height = 500,
        twoPi = 2 * Math.PI,
        progress = 0,
        beginning = 100,
        total = 100,
        formatPercent = d3.format(".0%");
    
    
        
        const arc = d3.arc()
            .startAngle(0)
            .innerRadius(175)
            .outerRadius(220);
        
        const svg = d3.select("#LoadingDiv").append("svg")
            .attr("width", width)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        
        const meter = svg.append("g")
            // .attr("class", "funds-allocated-meter");
        
        meter.append("path")
            .attr("class", "backgroundL")
            .attr("d", arc.endAngle(twoPi));
        
        const foreground = meter.append("path")
            .attr("class", "foregroundL");
        
        const percentComplete = meter.append("text")
            .attr("text-anchor", "middle")
            .attr("class", "percent-completeL")
            .attr("dy", "0em");
        
        const description = meter.append("text")
            .attr("text-anchor", "middle")
            .attr("class", "descriptionL")
            .attr("dy", "1.3em")
            .text("Loading");
        
        const i = d3.interpolate(progress, beginning / total);
        
        d3.transition().duration(7000).tween("progress", function() {
          return function(t) {
            const progress = i(t);
            foreground.attr("d", arc.endAngle(twoPi * progress));
            percentComplete.text(formatPercent(progress));
          };
        });
      }


    render() {
        return(
            <div id="LoadingDiv"></div>
        )
    }
}

export default LoadingScreen