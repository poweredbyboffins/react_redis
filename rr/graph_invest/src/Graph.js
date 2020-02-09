import React, { Component } from 'react';
import * as d3 from 'd3';
//import * as js from './jsondata.json'
//import * as jsondata from './jsondata'
var jsondata=require('/home/andy/rr/consuming-rest/src/jsondata.json');

class Graph extends React.Component {
constructor(props){
      super(props)
      //this.createGraph = this.createGraph(this);
      this.myRef = React.createRef();
   }

//    static propTypes = {...}

    componentDidMount() {
       this.createGraph()
    }
    componentDidUpdate() {
       //this.createGraph(this.myRef)
    }
    componentWillMount() {
       //this.createGraph(this.myRef)
    }
    createGraph() {
        // D3 Code to create the chart
        // using this._rootNode as container

var svg = d3.select(this.refs.svgref),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory10);


var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().distance(400).id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

var js1={"nodes": [ {"id": "Amazon", "group": 1,"size": 5}, {"id": "Cloud", "group": 2,"size":11} ], "links": [ {"source": "Amazon", "target": "Cloud", "value": 5} ] };

//var js2=JSON.stringify(js)
var graph=JSON.parse(JSON.stringify(jsondata));

//d3.json(js2)
//then(function(graph) {
  //if (error) throw error;

var link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

    var node=svg.append("g")
    .append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(graph.nodes)
    .enter().append("g")
    
  var circles = node.append("circle")
      .attr("r", function(d) { return (d.size); })
      .attr("fill", function(d) { return color(d.group); })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));


  var lables = node.append("text")
      .text(function(d) {
        return d.id;
      })
      .attr('x', 6)
      .attr('y', 3);

 var tooltip = node.append("div")
          .text(function(d) {
           return d.size;
           })
           .style("position", "absolute")
           .style("visibility", "hidden")

/* var tips = node.append("circle").on("mouseover", function(){return tooltip.style("visibility", "visible");})
  .on("mousemove", function(){return tooltip.style("top", (event.pageY-800)+"px").style("left",(event.pageX-800)+"px");})
  .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
*/

  node.append("title")
      .text(function(d) { return d.id; });

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
  }
//});


function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

    }
handleHover = () => {
console.log("mouse over");
//  d3.select("circle").on("mouseover", function(){return tooltip.style("visibility", "visible");})
//  .on("mousemove", function(){return tooltip.style("top", (event.pageY-800)+"px").style("left",(event.pageX-800)+"px");})
//  .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
}

handleClick = () => {
console.log("mouse click");
}

/*    shouldComponentUpdate() {
        // Prevents component re-rendering
        return false;
    }

    _setRef(componentNode) {
        this._rootNode = componentNode;
    }
*/

    render() {
return (
<div onClick={this.handleClick}>>
<svg ref="svgref" width="1200" height="600"> <title>D3</title> </svg>
</div>
    )
   }
}

export default Graph;
