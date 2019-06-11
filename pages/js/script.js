// Init parameters
var ast = {
	"width": 1000, "height": 800, "threshold": 0.98, "max_weight": 0, "theme": "Galaxy"
}, util = {};

// Init dynamic components
ast.init = () => {

	// Fire main event
	setTimeout(() => {
		ast.loadData();
	}, 10);
}

// Load dataW
ast.loadData = () => {
	let filepath = "https://raw.githubusercontent.com/ansegura7/NLP/master/data/network/";
	let filename = filepath + "sparse_similarity.csv";

	d3.csv(filename).then(
		function(rawdata) {

			// Load data and apply quality process
			rawdata.forEach((row, i) => {
				Object.keys(row).forEach((word, j) => {
					row[word] = +row[word];
				})
			});

			// Save data and show network
			ast.data = rawdata;
			ast.changeThreshold();
		},
		function(error) {
			// Error log message
			console.log(error);
		}
	);
}

/********** Begin Events Fundtions **********/
ast.changeThreshold = () => {
	let inpNode = d3.select("#inpThreshold");
	ast.threshold = inpNode.node().value;
	d3.select("#inpLabel").text(ast.threshold);

	// Create the network	
	ast.createNetwork();
}

ast.changeTheme = () => {
	let cmbTheme = d3.select("#cmbTheme");
	ast.theme = cmbTheme.node().value;
	
	// Create the network	
	ast.createNetwork();
}
/*********** End Events Fundtions ***********/

// Derive current data and create Networks
ast.createNetwork = () => {

	// Update data
	let vocabulary = ast.data.columns;
	let vocLength = vocabulary.length;
	let nodes = [];
	let links = [];

	for(j = 0; j < vocLength; j++) {
		for(i = 0; i < vocLength; i++) {
			let s = vocabulary[i];
			let t = vocabulary[j];
			let w = ast.data[i][t];

			if (i != j && w >= ast.threshold) {
				links.push({ source: s, target: t, weight: w });
				util.addDictToJsonArray(nodes, s);
				util.addDictToJsonArray(nodes, t);
			}
		}
	}

	// Network variables
	let xTitle = "";
	let yTitle = "";
	let cTitle = "Force-Directed Words Graph";
	let svgNetwork = d3.select("#svgNetwork1");
	ast.doNetworkChart(svgNetwork, nodes, links, cTitle, xTitle, yTitle);
}

// Create Network diagram
ast.doNetworkChart = (svg, nodes, links, cTitle, xTitle, yTitle) => {
	svg.empty();
	svg.html("");

	// Network margins
	let margin = {top: 30, right: 0, bottom: 0, left: 0},
		iwidth = ast.width - margin.left - margin.right,
		iheight = ast.height - margin.top - margin.bottom;

	// Chart variables
	let adjlist = [];
	let textColor;

 	// Create scales
	let w = d3.scaleLinear()
			.domain([1, ast.max_weight])
			.range([2, 10]),
		c = d3.scaleLinear()
			.domain([1, 10])
			.range([0.0, 0.8]);
	
	// Select interpolate function of color palette 
	let colorFns;
	if (ast.theme == "Galaxy") {
		textColor = "#fff"
		svg.attr('style', "background-color: #000");
		colorFns = d3.interpolatePurples;
	}
	else if (ast.theme == "Classic") {
		textColor = "#000"
		svg.attr('style', "background-color: #fff");
		colorFns = d3.interpolateBlues;
	}
	
	// Simulation Force system
	let simulation = d3.forceSimulation(nodes);
	simulation
		.force("charge", d3.forceManyBody()
			.strength(-40))
		.force("x", d3.forceX(iwidth/2)
			.strength(0.4))
		.force("y", d3.forceY(30 + iheight/2)
			.strength(0.4))
		.force("collide", d3.forceCollide((d) => d.weight))
		.force("link", d3.forceLink(links)
			.id((d) => d.name)
			.distance((d) => (200 + d.weight)))
		.on("tick", ticked);
	
	// Create adjacency matrix
	links.forEach(function(d) {
		adjlist[d.source.index + "-" + d.target.index] = true;
		adjlist[d.target.index + "-" + d.source.index] = true;
	});
	
	// Drawing links
	let selLinks = svg.selectAll(".link")
		.data(links)
		.enter()
		.append("line")
		.attr("class", "link")
		.attr("stroke", "#aaa")
		.style("stroke-width", "1px")
		.style("opacity", 0.6);
	
	// Drawing nodes
	let xAvg = iwidth/2,
		yAvg = iheight/2;
	let selNodes = svg.selectAll(".node")
		.data(nodes)
		.enter()
		.append("g")
		.attr("class", "node")
		.attr("transform", (n) => "translate(" + xAvg + "," + yAvg + ")")
		.call(d3.drag()
			.on("start", dragstarted)
			.on("drag", dragged)
			.on("end", dragended));
	
	// Add circle to node
	selNodes.append("circle")
		.style("fill", (d) => colorFns(c(w(d.weight))))
		.attr("r", (d) => w(d.weight) )
		.attr("stroke", "#090909")
		.style("stroke-width", 1);
	
	// Add text to position nodes
	selNodes.append("text")
		.attr("dy", ".35em")    
		.style("font-size", "10pt")
		.attr("x", "6")
		.text((d) => { d.name });
	
	// Add tooltip text to node
	selNodes.append("title")
		.text((d) => (d.name  + " (weight: " + d.weight + ")"))
		.style("fill", "#000000")
		.style("font-family", "Calibri")
		.style("font-size", "11pt");
	
	// Focus/Unfocus events
	selNodes.on("mouseover", focus)
		.on("mouseout", unfocus);
	selNodes.on("mouseover", focus)
		.on("mouseout", unfocus);
	
	// Graph object
	let g = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	// Add title
	g.append("text")
		.attr("x", (iwidth / 2))
		.attr("y", (10 - margin.top))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "16pt")
		.text(cTitle)
		.style("fill", textColor);
	
	// Add sub-title
	g.append("text")
		.attr("x", (iwidth - 105))
		.attr("y", (iheight - 25))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "12pt")
		.text(nodes.length + " nodes and " + links.length + " edges")
		.style("fill", textColor);
	
	// Begin Nodes events
	function ticked() {
		selLinks
			.attr("x1", (l) => l.source.x)
			.attr("y1", (l) => l.source.y)
			.attr("x2", (l) => l.target.x)
			.attr("y2", (l) => l.target.y);

		selNodes
			.attr("transform", (n) => "translate(" + n.x + "," + n.y + ")");
	}

	function dragstarted(d) {
		if (!d3.event.active)
			simulation.alphaTarget(0.3).restart();
		d.fx = d.x;
		d.fy = d.y;
	}

	function dragged(d) {
		d.fx = d3.event.x;
		d.fy = d3.event.y;
	}

	function dragended(d) {
		if (!d3.event.active)
			simulation.alphaTarget(0);
		d.fx = null;
		d.fy = null;
	}

	// Node focus event
	function focus(d) {
		var index = d3.select(d3.event.target).datum().index;
		selNodes.style("opacity", function(o) {
			return neigh(index, o.index) ? 1 : 0.1;
		});
		selLinks.style("opacity", function(o) {
			return o.source.index == index || o.target.index == index ? 1 : 0.1;
		});
		d3.select(this).select("circle")
			.transition()
			.duration(500)
			.attr("r", (d) => w(d.weight) * 2);
	}
	
	// Node unfocus event
	function unfocus() {
		selNodes.style("opacity", 1);
		selLinks.style("opacity", 0.6);
		d3.select(this).select("circle")
			.transition()
		.duration(300)
			.attr("r", (d) => w(d.weight));
	}

	function neigh(a, b) {
		return a == b || adjlist[a + "-" + b];
	}
	// End Nodes events
}

/********* Start Utility Functions *********/
util.addDictToJsonArray = (items, nName) => {
	let ix = 0;
	let exists = false;
	let curr_weight = 0;

	for (var item; item = items[ix++];) {
		if (item['name'] == nName) {
			curr_weight = item['weight'] + 1;
			item['weight'] = curr_weight;
			exists = true;
			break;
		}
	}

	if (!exists) {
		curr_weight = 1;
		let node = { 'name': nName, 'group': 'word', 'weight': curr_weight };
		items.push(node);
	}

	if (curr_weight >= ast.max_weight)
		ast.max_weight = curr_weight;
}
/********** End Utility Fundtions **********/